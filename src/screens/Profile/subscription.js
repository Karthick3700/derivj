import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchSubscription } from "@/redux/features/account/accountBuilder";
import Loading from "@/components/loader";

const Subscription = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { subscription, isLoading } = useSelector((state) => state?.profile);

  const [skip, setSkip] = useState(parseInt(router.query.skip) || 0);
  const [limit, setLimit] = useState(parseInt(router.query.limit) || 10);

  const currentPage = Math.floor(skip / limit) + 1;

  useEffect(() => {
    dispatch(fetchSubscription({ skip, limit }));
  }, [dispatch, skip, limit]);

  const handleNextPage = () => {
    const newSkip = skip + limit;
    setSkip(newSkip);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, skip: newSkip, limit },
    });
  };

  const handlePreviousPage = () => {
    const newSkip = Math.max(0, skip - limit);
    setSkip(newSkip);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, skip: newSkip, limit },
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 w-full h-full">
      <div className="flex items-start">
        <h1 className="text-xl font-bold">Your Subscription</h1>
      </div>

      <Fragment>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loading width="w-8" height="h-8" />
          </div>
        ) : (
          <Fragment>
            {subscription === null || subscription.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h3>No subscription found.</h3>
              </div>
            ) : (
              <Fragment>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Plan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Daily Return
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Start Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          End Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Remaining Days
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {subscription.map((plan) => (
                        <tr key={plan._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {plan?.planId?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {plan?.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {plan?.dailyReturn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {new Date(plan?.startAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {new Date(plan?.expireAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {plan?.remainingDays}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {plan?.status === 10 ? "Active" : "In-Active"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Fragment>
            )}
          </Fragment>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={skip === 0 || isLoading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={subscription?.length < limit || isLoading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </Fragment>
    </div>
  );
};

export default Subscription;
