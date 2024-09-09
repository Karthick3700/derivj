import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlansList } from "@/redux/features/ui/uiSlice";
import { CONST } from "@/utils";
import { service } from "@/services";
import { ACTIVE_PLANS, PLAN } from "@/services/api-url.service";
import PlanModal from "@/components/planModal";
import Loading from "@/components/loader";
import { setActivePlan } from "@/redux/features/account/accountSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state?.local?.plans);

  const isKycVerified = useSelector(
    (state) => state?.profile?.profileData?.isKycVerified
  );
  let hasPlansFetched = useRef(isKycVerified);

  const activePlan = useSelector((state) => state?.profile?.activePlan) || {};

  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await service.get(PLAN);
      if (response.statusCode === CONST.status.SUCCESS) {
        dispatch(updatePlansList(response?.doc));
        setLoading(false);
      }
    } catch (error) {
      console.log("Error in fetchingplans::", error);
      setLoading(false);
    }
  }, [dispatch]);

  const fetchActivePlans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await service.get(ACTIVE_PLANS);
      if (response.statusCode === CONST.status.SUCCESS) {
        dispatch(setActivePlan(response?.doc));
        setLoading(false);
      }
    } catch (error) {
      console.log("Error in fetchingplans::", error);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (hasPlansFetched.current) {
      fetchPlans();
      fetchActivePlans();
      hasPlansFetched.current = false;
    }
  }, [isKycVerified, fetchPlans, fetchActivePlans]);

  const handleBuyClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };
  return (
    <Fragment>
      <div className="flex">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col w-full justify-center py-8 gap-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 w-full px-6">
          {isKycVerified ? (
            <Fragment>
              {Object.entries(activePlan).map(([key, value], index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 justify-center bg-white dark:bg-gray-800 rounded-xl p-6 w-full h-auto shadow-lg transition-transform duration-400 hover:scale-105 border dark:border-white border-transparent"
                >
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-deca">
                    {key}
                  </h2>
                  <p className="text-3xl font-bold text-gradient inline-flex items-center gap-2">
                    {value}
                  </p>
                </div>
              ))}
            </Fragment>
          ) : (
            <div className="flex items-center justify-center w-full h-40 bg-white mt-2 rounded-md">
              <span className="text-slate-700 font-bold">
                No active plans...
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 mx-auto">
          <p>You need to withdraw click the button</p>
          <button
            className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800 w-max dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white disabled:cursor-not-allowed"
            type="submit"
          >
            Withdraw
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex border-b-2 py-4 border-gray-300">
            <h3 className="text-lg font-bold text-gray-500 dark:text-gray-300">
              Plans
            </h3>
          </div>

          {loading ? (
            <div className="my-10">
              <Loading width="w-8" height="h-8" />
            </div>
          ) : (
            <Fragment>
              {isKycVerified ? (
                <div className="container mx-auto px-4 py-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plans?.map((data, index) => (
                      <div
                        key={index}
                        className="md:w-9/12 w-full md:mx-auto bg-white dark:bg-gray-800 rounded-lg p-6  md:p-8 shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)] dark:shadow-lg transition-transform duration-500 hover:scale-105 border dark:border-white border-slate-400 flex flex-col gap-4 md:gap-8 relative overflow-hidden"
                      >
                        <h2 className="md:text-2xl text-lg font-bold mb-4 text-gray-900 dark:text-gray-200 font-deca uppercase">
                          {data?.name}
                        </h2>
                        <div className="flex items-center mb-4">
                          <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-gray-200">
                            ${data?.price}
                          </span>
                          <span className="text-lg md:text-3xl font-bold text-gray-900 dark:text-gray-200">
                            /
                          </span>
                          <span className="text-lg md:text-2xl text-gray-700 ml-2 dark:text-gray-400">
                            ₹{data?.inrPrice}
                          </span>
                        </div>
                        <ul className="list-none text-base md:text-xl flex flex-col gap-2 md:gap-3 text-gray-700 dark:text-gray-400">
                          <li>Duration : {data?.validity} Month</li>
                          <li>Daily Returns {data?.return}%</li>
                        </ul>
                        <button
                          className="w-max mt-2 mx-auto uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800  dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white"
                          type="submit"
                          onClick={() => handleBuyClick(data)}
                        >
                          buy plan
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-40 bg-white mt-2 rounded-md">
                  <span className="text-slate-700 font-bold">
                    Your KYC Verification is pending...
                  </span>
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
      <PlanModal
        showModal={showModal}
        onClose={closeModal}
        plan={selectedPlan}
      />
    </Fragment>
  );
};

export default Dashboard;
