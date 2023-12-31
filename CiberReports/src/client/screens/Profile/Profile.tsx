import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { format } from "date-fns";
// Imagens
import { useImgs } from "../../../hooks/useImgs";
// loading
import { Loading } from "../../components/Loading";
import Sidebar from "../../components/ProfileComponents/Sidebar";

import userVerified from '../../assets/UserVerified.png'
import { useProfile } from "../../../hooks/useProfile";

function Profile() {
  const URLBanner = "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Banner/";
  const URLAvatar = "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Avatar/";
  const { bannerImage, getBanner, avatarImage, getAvatar } = useImgs();
  const { user } = useAuth();
  const { myProfile, getMyProfile } = useProfile();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true)
      await getBanner();
      await getAvatar();
      await getMyProfile();
      setisLoading(false)
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />
  }

  // Renderize o conteúdo da sua página apenas se o usuário estiver logado
  if (!user) {
    return <p>Carregando...</p>;
  }

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
              {avatarImage.length == 0 ? (
                <div className="relative">
                  <img
                    className="w-24 h-24 mb-3 ml-4 rounded-full shadow-2xl"
                    src="/user.png"
                    alt="User Avatar"
                  />
                  <span className="absolute bottom-3 left-5 w-6 h-6 border-white dark:border-gray-800 rounded-full">
                    <img src={userVerified} alt="userVerified" />
                  </span>
                </div>
              ) : (
                avatarImage.map((image) => {
                  const imageURL = `${URLAvatar}${user.id}/${image.name}`;
                  return (
                    <div key={imageURL} className="relative">
                      <img
                        className="w-24 h-24 mb-3 ml-4 rounded-full shadow-2xl"
                        src={imageURL}
                        alt="User Avatar"
                      />
                      <span className="absolute bottom-3 left-5 w-6 h-6 border-white dark:border-gray-800 rounded-full">
                        <img src={userVerified} alt="userVerified" />
                      </span>
                    </div>
                  );
                })
              )
              }
              <div className="ml-4">
                <div className="">
                    {myProfile.map((myProfile) => {
                      return (
                        <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white" key={myProfile.id}>
                          {!!myProfile.all_name ? myProfile.all_name : "User Name"}
                        </h5>
                      );
                    })
                  }
                  <p className=" text-sm">Date Joined :{DateJoined}</p>
                  <p className=" text-sm">Las Login: {LastLogin}</p>
                </div>
              </div>
              <div className="px-4"></div>
              <div className="flex flex-1 p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span>Total de Denúncias</span>
                  <br />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    237
                  </h5>
                </div>
              </div>
            </div>
            
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

