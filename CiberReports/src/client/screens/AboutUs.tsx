import HenryDev from "../assets/HenryDev.png";
import PedroF from "../assets/PedroF.png";

function AboutUs() {

  return (
    <>
      <div className="container mx-auto ">
        <div className="content w-full ">
          <div className="mt-12 flex justify-center">
            <img className="w-96" src="#" alt="logo" />
          </div>
          <div className="mt-12">
            <h1 className="text-2xl font-bold">About Us:</h1>
          </div>
          <div className=" bg-gray-200 p-8 rounded-lg text-justify">
            <a href="#" className="text-lg">
              We are Pedro Ferreira and Henrique Oliveira, a dynamic web
              development team from ESTG, IPVC in Portugal. We both share
              enthusiasm for web development. This is our third collaborative
              project, each one enhancing our skills and deepening our love for
              web development. We, as students at ESTG, believe in the power of
              teamwork. Together, in Portugal, we are committed to pushing the
              boundaries of digital experiences, going beyond websites to create
              impactful online solutions.
            </a>
          </div>
          <div>
            <h1 className="text-2xl font-bold flex justify-center mt-16">
              Developers:
            </h1>
          </div>
          <div className="flex justify-center mt-12 mb-12 rounded space-x-5">
            <div className="w-60 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-end px-4 pt-4"></div>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full "
                  src={HenryDev}
                  alt="Henry image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Henrique Oliveira
                </h5>
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                  Desenvolvedor & CEO
                </span>
                <button
                  type="button"
                  className="rounded-lg mt-4 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-3 h-3 text-white mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                  mail
                </button>
              </div>
            </div>
            <div className="w-60 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-end px-4 pt-4"></div>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full "
                  src={PedroF}
                  alt="Pedro image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Pedro Ferreira
                </h5>
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                  Desenvolvedor & CEO
                </span>
                <button
                  type="button"
                  className="rounded-lg mt-4 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-3 h-3 text-white mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                  mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default AboutUs;
