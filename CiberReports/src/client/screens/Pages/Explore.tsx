import { useEffect, useState } from "react";
import { useReports } from "../../../hooks/useReports";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../../hooks/useAuth";
import { useImgs } from "../../../hooks/useImgs";

function Explore() {

  const { getAllReports, reports } = useReports();
  const { getRportImage, } = useImgs();
  const { user } = useAuth();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await getRportImage();
      await getAllReports();
      setisLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !user) {
    return <Loading />;
  }


  const URLAvatar =
    "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/ReportsImage/";

  console.log(reports)

  return (
    <div className="container mx-auto ">
      <div className="content mx-auto">
        <div className="text-justify">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Explore <span className="text-bluelite">reports</span>
          </h1>

          <div className="text-md font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px justify-center">
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                >
                  All
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  aria-current="page"
                >
                  Trending
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                >
                  Recent
                </a>
              </li>
              <li>
                <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap -mx-4">
            {reports.map((reports) => {
              console.log(reports.image_report_path)
              return (

                <div className="w-full md:w-1/4 px-4 mb-4" key={reports.id} >
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >

                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={
                          reports.image_report_path
                            ? URLAvatar + reports.image_report_path
                            : "/defaultImage.jpg"
                        }
                        alt="ReportImage"
                      />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="truncate mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {reports.title}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal truncate text-gray-700 dark:text-gray-400">
                        {reports.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-bluelite rounded-lg hover:bg-bluelite focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Read more
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-bluelite  border border-bluelite focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              View more
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Explore;
