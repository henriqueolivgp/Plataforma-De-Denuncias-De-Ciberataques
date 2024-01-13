import { useEffect, useRef, useState } from "react";
import { useReports } from "../../../hooks/useReports";
import { useImgs } from "../../../hooks/useImgs";
import { Loading } from "../Loading";
import FiltersComponent from "./FiltersComponent";

function ExploreSidebar() {

    const { getAllReports, reports } = useReports();
    const { getRportImage, } = useImgs();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
    const [isLoading, setisLoading] = useState(true);
    const [filterType, setFilterType] = useState("All");

    const fetchData = async () => {
        setisLoading(true)
        await getRportImage();
        await getAllReports();
        setisLoading(false)
    };

    const ReportImage =
        "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/ReportsImage/";

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        <Loading />
    }

    // Filtrar relatórios com base no estado do filtro
    const filteredReports = reports.filter(
        (report) => filterType === "All" || report.topic === filterType
    );

    const openModal = (reportId: number) => {

        setSelectedReportId(reportId);

        const selectedReport = reports.find((report) => report.id === reportId);

        if (selectedReport) {

        }

        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Node;

        // Verifica se o clique foi fora do menu
        if (menuRef.current && !menuRef.current.contains(target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    return (
        <>
            <div >
                <div className="flex flex-1 ">
                    <div className="flex-1">
                        <div className="content-box p-4 w-auto">
                            <div className="text-justify">
                                <h1 className="text-3xl font-bold mb-4 text-center">
                                    Explore <span className="text-bluelite">reports</span>
                                </h1>

                                <FiltersComponent setFilterType={setFilterType} filterType="All" />

                                <div className="flex flex-wrap">
                                    {filteredReports.map((report) => {
                                        return (

                                            <div className="w-1/4 px-4 mb-4 flex-grow" key={report.id} >
                                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >


                                                    <img
                                                        className="rounded-t-lg"
                                                        src={
                                                            report.image_report_path
                                                                ? ReportImage + report.image_report_path
                                                                : "/defaultImage.jpg"
                                                        }
                                                        alt="ReportImage"
                                                    />

                                                    <div className="p-5">

                                                        <h5 className="truncate mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                            {report.title}
                                                        </h5>

                                                        <p className="mb-3 font-normal truncate text-gray-700 dark:text-gray-400">
                                                            {report.description}
                                                        </p>
                                                        <a
                                                            href="#"
                                                            onClick={() => openModal(report.id)}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="crud-modal"
                aria-hidden={!modalIsOpen}
                className={`${modalIsOpen ? "fixed" : "hidden"
                    } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md max-h-full">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                View Report
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
                            {reports.filter((reports) => reports.id === selectedReportId) // Assuming you want to filter profiles with an 'id'
                                .map((selectedReport) => {
                                    return (
                                        <div className="p-4 md:p-5 space-y-4">
                                            {/* Display Report Details */}


                                            <img
                                                className="rounded-t-lg"
                                                src={
                                                    selectedReport.image_report_path
                                                        ? ReportImage + selectedReport.image_report_path
                                                        : "/defaultImage.jpg"
                                                }
                                                alt="ReportImage"
                                            />


                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                <span className="font-semibold text-gray-900 dark:text-white">Titulo:</span> {selectedReport.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                                Date: {selectedReport.data.toString()}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                                Topic: {selectedReport.topic}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                                Description: {selectedReport.description}
                                            </p>
                                        </div>
                                    )
                                })}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExploreSidebar;