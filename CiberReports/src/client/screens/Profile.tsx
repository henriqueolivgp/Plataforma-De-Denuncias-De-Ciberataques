import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { SupaBaseClient } from "../../Services/supabase/SupaBaseClient";
// Imagens
import { useImgs } from "../../hooks/useImgs";
// loading
import { Loading } from "../components/Loading";
import { ProfileLi } from "../components/ProfileComponents/ProfileLi";

function Profile() {
  const URLBanner = "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Banner/";
  const URLAvatar = "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Avatar/";
  const { bannerImage, getBanner, avatarImage, getAvatar } = useImgs();
  const { user, signOut } = useAuth();
  const [profiles, setProfiles] = useState<profile[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();



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
      await getBanner();
      await getAvatar();
      setisLoading(false)
    };

    fetchData();
  }, [user, navigate, getBanner, getAvatar]);

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

  // Após a verificação de bannerImage !== null, adicione um console.log para verificar o conteúdo de bannerImage
  if (avatarImage !== null) {
    console.log('tem imagem' + avatarImage);

  } else {
    console.log('nao tem imagem');
  }


  return (
    <>
      <div className="container mx-auto flex">
        <div className="flex flex-col content mx-auto ">
          <section className="banner bg-violet-100 h-48 w-full">
            <div className="Text-Button flex flex-col relative z-10 xl:flex-row">
              <div className="w-full absolute overflow-hidden h-48 xl:relative flex items-center content-center">
                {bannerImage.length <= 0 ? (
                  <>
                    <img
                      className="w-screen h-full object-cover"
                      src="https://t4.ftcdn.net/jpg/05/52/98/77/360_F_552987749_4Y5SJa4KRL2UIzVrk5vznfbQtDeJZtqe.jpg"
                      alt="banner" /><span className="absolute text-white text-5xl font-bold flex items-center justify-center w-full h-full">
                      User Banner
                    </span>
                  </>
                ) : (
                  bannerImage.map((image) => {
                    const imageURL = `${URLBanner}${user.id}/${image.name}`;
                    return (
                      <div key={imageURL}>
                        <img className="w-screen h-full object-cover" src={imageURL} alt={`User Banner ${image.name}`} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          <div className="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex items-center">
            {avatarImage.length <= 0 ? (
                  <>
                    <img
                      className="w-24 h-24 mb-3 ml-4 rounded-full shadow-2xl"
                      src="/user.png"  // Corrigido aqui
                      alt="User Avatar"  // Adicionado um atributo alt
                    />
                  </>
                ) : (
                  avatarImage.map((image) => {
                    const imageURL = `${URLAvatar}${user.id}/${image.name}`;
                    return (
                      <div key={imageURL}>
                      <img
                        className="w-24 h-24 mb-3 ml-4 rounded-full shadow-2xl"
                        src={imageURL}  // Corrigido aqui
                        alt="User Avatar"  // Adicionado um atributo alt
                      />
                    </div>
                    );
                  })
                )}
              <div className="ml-4">
                <div className="">
                  {profiles.map((profile) => (
                    <h5 className=" text-3xl font-medium text-gray-900 dark:text-white" key={profile.id}>
                      {profile.all_name}
                    </h5>
                  ))
                  }
                </div>
                <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                  Nome utilizador
                </h5>
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
            <button data-drawer-target="default-sidebar" onClick={handleClick} aria-expanded={isOpen} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="sm:block lg:hidden inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <div className="flex flex-1 ">
              <aside id="default-sidebar" className={` ${isOpen ? " " : "hidden"} xl:block lg:block llg:hidden w-64 h-auto transition-transform sm:-translate-x-0 lg:translate-x-0  `} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                  <ul className="space-y-2 font-medium">
                    <ProfileLi to="/profile" name="Profile" activeTo={location.pathname} activeLocal={location.pathname} svg={'profile'} />
                    <ProfileLi to="/profile/edit-profile" name="Edit-Profile" activeTo={location.pathname} activeLocal={location.pathname} svg={'editprofile'} />
                    <ProfileLi to="/profile/reports" name="Repports" activeTo={location.pathname} activeLocal={location.pathname} svg={'reports'} />
                    <ProfileLi to="/profile/chat" name="Chat" activeTo={location.pathname} activeLocal={location.pathname} svg={'chat'} />
                    <ProfileLi to="/profile/settings" name="Settings" activeTo={location.pathname} activeLocal={location.pathname} svg={'settings'} />
                    <ProfileLi to="#" name="logout" activeTo={location.pathname} activeLocal={location.pathname} svg={'logout'} onClick={handleLogOut} />
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

