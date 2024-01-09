import { useEffect, useState } from "react";
import { useReports } from "../../../hooks/useReports";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../../hooks/useAuth";
import { useImgs } from "../../../hooks/useImgs";
import ExploreSidebar from '../../components/ExploreCompunents/ExploreSidebar'


function Explore() {

  const { getAllReports } = useReports();
  const { getRportImage, } = useImgs();

  const { getAllReports, reports } = useReports();
  const { getRportImage } = useImgs();
  const { user } = useAuth();
  const [isLoading, setisLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  return (

    <>
      <div className="container mx-auto flex">
        <div className="flex flex-col content mx-auto ">
          <div className="w-full dark:bg-gray-800 dark:border-gray-700">
            <ExploreSidebar />
          </div>
        </div>
      </div>
  </>


  const URLAvatar =
    "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/ReportsImage/";

  console.log(reports);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
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
            <div
              className={`flex flex-col md:flex-row md:flex-wrap -mx-4 `}
              aria-hidden={!modalIsOpen}
            >
              {reports.map((reports) => {
                console.log(reports.image_report_path);
                return (
                  <div className="w-full md:w-1/4 px-4 mb-4" key={reports.id}>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                          onClick={openModal}
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
                );
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
      </div>

      <div
        id="crud-modal"
        aria-hidden={!modalIsOpen}
        className={`${
          modalIsOpen ? "fixed" : "hidden"
        } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md max-h-full">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Id:
                  </label>

                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    All Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    value="hbbyhb"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Is Admin:{" "}
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Is Specialist:{" "}
                  </label>
                </div>

              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
}

export default Explore;
