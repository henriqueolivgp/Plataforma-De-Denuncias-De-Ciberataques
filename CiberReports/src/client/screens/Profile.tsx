import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { SupaBaseClient } from "../../Services/supabase/SupaBaseClient";
// Imagens
import { useImgs } from "../../hooks/useImgs";
import { Loading } from "../components/Loading";

function Profile() {
  const CDNURL = "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Imgs/";
  const { bannerImages, avatarImages, getImages } = useImgs();
  const { user, signOut } = useAuth();
  const [profiles, setProfiles] = useState<profile[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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


  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const GetAllProfile = async () => {
    const { data } = await SupaBaseClient
      .from('profiles')
      .select('*')
      .order('inserted_at', { ascending: false });
    setProfiles(data || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true)
      await GetAllProfile();
      await getImages();
      setisLoading(false)
    };

    fetchData();
  }, [user, navigate, getImages]);

  if (isLoading) {
    return <Loading />
  }

  // Renderize o conteúdo da sua página apenas se o usuário estiver logado
  if (!user) {
    return <p>Carregando...</p>;
  }

  interface profile {
    id: number;
    all_name: string;
  }

  // Funcao responsavel por fazer o logOut
  const handleLogOut = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  let DateJoined: string | undefined;

  if (user.email_confirmed_at) {
    const dateObject = new Date(user.email_confirmed_at);
    DateJoined = format(dateObject, 'dd-MM-yyyy');
  }

  let LastLogin: string | undefined;

  if (user.last_sign_in_at) {
    const dateObject = new Date(user.last_sign_in_at);
    LastLogin = format(dateObject, 'dd-MM-yyyy');
  }



  return (
    <>
      <div className="container mx-auto flex">
        <div className="flex flex-col content mx-auto ">
          <section className="banner bg-violet-100 h-48 w-full">
            <div className="Text-Button flex flex-col relative z-10 xl:flex-row">
              <div className="w-full absolute overflow-hidden h-48 xl:relative flex items-center content-center">
                {bannerImages && bannerImages.map((image) => {
                  const imageURL = `${CDNURL}${user.id}/${image.name}`;
                  console.log(imageURL);

                  return (
                    <div key={imageURL}>
                      <img className="w-screen h-full object-cover" src={imageURL} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex items-center">
              {avatarImages && avatarImages.map((image) => {
                const imageURL = `${CDNURL}${user.id}/${image.name}`;
                console.log(imageURL);

                return (
                  <div key={imageURL}>
                    <img className="w-24 h-24 mb-3 ml-4 rounded-full shadow-lg" src={imageURL} />
                  </div>
                );
              })}

              <div className="ml-4">
                <div className="ml-4">
                  {profiles.map((profile) => (
                    <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white" key={profile.id}>
                      {profile.all_name}
                    </h5>
                  ))
                  }
                </div>

                <p className=" text-sm">Date Joined :{DateJoined}</p>
                <p className=" text-sm">Las Login: {LastLogin}</p>
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

          <div ref={menuRef}>
            <button data-drawer-target="default-sidebar" onClick={handleClick} aria-expanded={isOpen} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <div className={`flex flex-1 ${isOpen ? "" : "hidden"}`}>
              <aside id="default-sidebar" className="w-64 h-auto transition-transform sm:-translate-x-full lg:translate-x-0 " aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                  <ul className="space-y-2 font-medium">
                    <li>
                      <Link to='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
                          <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                        </svg>
                        <span className="ms-3">Status</span>
                      </Link>
                    </li>
                    <li>
                      <Link to='/profile/edit-profile' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ms-3">Edit Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link to='/profile/repports' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                          <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                      </Link>
                    </li>
                    <li>
                      <Link to='/profile/chat' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                          <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor" />
                          <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Chat</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                      </a>
                    </li>
                    <li>
                      <Link to='#' onClick={handleLogOut} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">SignOut</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </aside>

              <div className="flex-1">
                <div className="content-box p-4 w-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>

    </>
  );
}

export default Profile;
