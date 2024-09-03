import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useRef } from "react";
import { fetchSubscription } from "@/redux/features/account/accountBuilder";
import Loading from "@/components/loader";

const Subscription = () => {
  const dispatch = useDispatch();
  const isPlanFetched = useRef(false);
  const { subscription, isLoading, error } = useSelector(
    (state) => state?.profile
  );

  useEffect(() => {
    if (!isPlanFetched.current) {
      dispatch(fetchSubscription({ skip: 0, limit: 10 }));
      isPlanFetched.current = true;
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-6 p-4 w-full h-full">
      <div className="flex items-start">
        <h1 className="text-xl font-bold">Subscription</h1>
      </div>

      <Fragment>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loading width="w-8" height="h-8" />
          </div>
        ) : (
          <Fragment>
            {" "}
            {subscription === null ? (
              <Fragment>
                <div className="flex items-center justify-center w-full h-full">
                  <h3>No subscription found.</h3>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {subscription?.map((plan) => (
                  <div
                    key={plan._id}
                    className="flex flex-col gap-4 p-4 rounded-lg shadow-md border dark:border-gray-700 bg-white dark:bg-gray-800 transform transition duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                      Plan:{" "}
                      <span className="font-normal text-gray-900 dark:text-gray-100">
                        {plan?.planId?.name}
                      </span>
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      Price:{" "}
                      <span className="text-gray-900 dark:text-gray-100">
                        ${plan?.price}
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Daily Return:{" "}
                      <span className="text-gray-900 dark:text-gray-100">
                        {plan?.dailyReturn} %
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Start Date:{" "}
                      <span className="text-gray-900 dark:text-gray-100">
                        {new Date(plan.startAt).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Expiry Date:{" "}
                      <span className="text-gray-900 dark:text-gray-100">
                        {new Date(plan.expireAt).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Remaining Days:{" "}
                      <span className="text-gray-900 dark:text-gray-100">
                        {plan.remainingDays}
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Status:{" "}
                      <span
                        className={`text-sm font-medium ${
                          plan.status === 10
                            ? "text-green-500 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {plan.status === 10 ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default Subscription;
