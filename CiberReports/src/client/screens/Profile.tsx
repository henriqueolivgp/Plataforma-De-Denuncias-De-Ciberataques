import { Banner } from "flowbite-react";

function Profile() {
  
  return (
    <>
      <Banner />
      <div className="container mx-auto ">
        <div className="content mx-auto">
          <section className="banner bg-violet-100 h-48 relative z-10">
            <div className="Text-Button flex flex-col relative z-10 xl:flex-row">
              <div className="w-full absolute overflow-hidden h-48 xl:relative">
                <img
                  className="w-screen xxl:blur-none xl:blur-none lg:blur-sm md:blur-sm sm:blur-sm xs:blur-sm h-full object-cover"
                  src="https://t4.ftcdn.net/jpg/05/52/98/77/360_F_552987749_4Y5SJa4KRL2UIzVrk5vznfbQtDeJZtqe.jpg"
                  alt="banner"
                />
              </div>
            </div>
          </section>

          <div
            id="dropdown"
            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  style={{
                    backgroundImage:
                      "url('https://static-00.iconduck.com/assets.00/profile-icon-512x512-w0uaq4yr.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "left center",
                    paddingLeft: "30px",
                  }}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  style={{
                    backgroundImage:
                      "url('https://cdn-icons-png.flaticon.com/512/795/795653.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "left center",
                    paddingLeft: "30px",
                  }}
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  style={{
                    backgroundImage:
                      "url('https://cdn-icons-png.flaticon.com/512/90/90417.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "left center",
                    paddingLeft: "30px",
                  }}
                >
                  Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  style={{
                    backgroundImage:
                      "url('https://icons.veryicon.com/png/o/miscellaneous/jinfeng-information-technology/chat-118.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "left center",
                    paddingLeft: "30px",
                  }}
                >
                  Chat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  style={{
                    backgroundImage:
                      "url('https://cdn.icon-icons.com/icons2/2761/PNG/512/settings_icon_176440.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "left center",
                    paddingLeft: "30px",
                  }}
                >
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Profile;
