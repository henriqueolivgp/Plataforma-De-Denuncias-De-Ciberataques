import { Banner } from "flowbite-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Se o usuário não estiver logado, redirecione-o para a página de login
  useEffect(() => {
      if (!loading && !user) {
          navigate('/signin'); // Substitua pela rota da sua página de login
      }
  }, [loading, user, navigate]);

  // Renderize o conteúdo da sua página apenas se o usuário estiver logado
  if (loading || !user) {
      return <p>Carregando...</p>;
  }

  return (
    <>
      <Banner />
      <div className="container mx-auto ">
        <div className="content mx-auto">
          <section className="banner bg-violet-100 h-48 w-full">
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

          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex items-center">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRcU4HWqFMT19Qzp3oD07Qsx9SC5WVXoVvlZ4mAP4IEcN08sg5C"
                alt="User image"
              />
              <div className="ml-4">
                <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                  Nome utilizador
                </h5>
              </div>
            </div>
            <div className="px-4"></div>
            <div className="flex flex-wrap justify-around items-center p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span>Total de Denúncias</span>
                <br />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  237
                </h5>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                <span>Mensagens</span>
                <br />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  23
                </h5>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                <span>Telefonemas</span>
                <br />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  0
                </h5>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                <span>Vírus</span>
                <br />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  45
                </h5>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                <span>Invasões</span>
                <br />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  0
                </h5>
              </div>
            </div>
          </div>

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
