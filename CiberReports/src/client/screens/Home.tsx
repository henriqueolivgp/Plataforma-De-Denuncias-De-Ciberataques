import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { signOut, session } = useAuth();

  const handleLogOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <img
        src="/World.jpg"
        alt="imagem de fundo"
        className=" absolute top-0 z-[-1] object-cover"
      />
      <div className=" bg-black opacity-70">
        <div className="container mx-auto ">
          <div className="content mr-auto mt-20">
            {!session && (
              <div className="max-w-lg p-6 bg-transparent">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold text-blue-700 tracking-tight dark:text-white text-justify">
                  Denuncie, Proteja, Previna: Juntos Contra Ciberataques!
                  </h5>
                </a>
                <p className="mb-3 font-normal text-white text-justify">
                  A nossa equipa está empenhada em ajudar o utilizador a
                  resolver todos os problemas decorrentes de mensagens, emails,
                  chamadas telefónicas e até mesmo tentativas de ataques
                  cibernéticos e vírus no seu dispositivo.
                </p>
                <a
                  href="/explore"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Explorar
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-700 bg-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Criar conta
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            )}
            {session && (
              <div className="max-w-lg p-6 bg-transparent">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold text-blue-700 tracking-tight dark:text-white text-justify">
                    Denuncie aqui os seus problemas de Cibersegurança
                  </h5>
                </a>
                <p className="mb-3 font-normal text-white text-justify">
                  A nossa equipa está empenhada em ajudar o utilizador a
                  resolver todos os problemas decorrentes de mensagens, emails,
                  chamadas telefónicas e até mesmo tentativas de ataques
                  cibernéticos e vírus no seu dispositivo.
                </p>
                <a
                  href="/explore"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Explorar
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  onClick={handleLogOut}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-700 bg-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>


    </>
  );
}

export default Home;
