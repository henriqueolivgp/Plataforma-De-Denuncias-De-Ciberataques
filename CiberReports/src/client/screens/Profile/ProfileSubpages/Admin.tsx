/* eslint-disable no-extra-boolean-cast */
import { useEffect, useState } from "react";
import { useProfile } from "../../../../hooks/useProfile";
import { Loading } from "../../../components/Loading";
import { useImgs } from "../../../../hooks/useImgs";
import { useAuth } from "../../../../hooks/useAuth";

function Admin() {

  const { getAllProfiles, profile } = useProfile();
  const { getAvatar } = useImgs();
  const { user } = useAuth();
  const [isLoading, setisLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  const URLAvatar =
    "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Avatar/";

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await getAvatar();
      await getAllProfiles();
      setisLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  // Renderize o conteúdo da sua página apenas se o usuário estiver logado
  if (!user) {
    return <p>Carregando...</p>;
  }

  const openModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(selectedUserId)

  return (
    <>
      <div className="container mx-auto ">
        <div className="content mx-auto">
          <div>
            <p>Admin page</p>
          </div>

          <div className="flex flex-wrap -mx-3 mb-5">
            <div className="w-full max-w-full px-3 mb-6  mx-auto">
              <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-dashed border-stone-200 bg-white m-5">
                {/* <!-- card body  --> */}
                <div className="flex-auto block py-8 px-9">
                  <div>
                    <div className="mb-9 text-center">
                      <h1 className="mb-2 text-[1.75rem] text-center font-semibold text-dark">
                        Users
                      </h1>
                      <span className="text-[1.15rem]  font-medium text-muted">
                        {" "}
                        Meet our talented team, a dynamic group of experts
                        driven by passion and innovation.{" "}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center -mx-3 mb-5">
                      {profile.map((profile) => (
                        <div
                          className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-3 mb-6"
                          key={profile.id}
                        >
                          <div className="relative flex-shrink-0 mb-4">
                            <img
                              className="w-24 h-24 mb-3 ml-4 rounded-full shadow-2xl"
                              src={
                                profile.image_avatar_path
                                  ? URLAvatar + profile.image_avatar_path
                                  : "/user.png"
                              }
                              alt="avatar image"
                            />
                          </div>
                          <div className="text-center">
                            <a
                              onClick={() => openModal(profile.id)}
                              href="javascript:void(0)"
                              className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out"
                            >
                              {!!profile.all_name
                                ? profile.all_name
                                : "User Name"}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          data-modal-target="crud-modal"
          onClick={() => openModal(profile[0].id)}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Toggle modal
        </button>

        <div
          id="crud-modal"
          aria-hidden={!isModalOpen}
          className={`${isModalOpen ? "fixed" : "hidden"
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
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5">
                {profile
                  .filter((profile) => profile.id === selectedUserId) // Assuming you want to filter profiles with an 'id'
                  .map((profile) => (
                    <div className="grid gap-4 mb-4 grid-cols-2" >
                      <div className="col-span-2">
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
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder={!!profile.all_name ? profile.all_name : "User Name"}
                          required
                        />
                      </div>


                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Admins
                        </label>
                        <select
                          id="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option defaultValue="">Deafaul</option>
                          <option value="TV">True</option>
                          <option value="TV">False</option>
                        </select>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Specialist
                        </label>
                        <select
                          id="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option defaultValue="">Deafaul</option>
                          <option value="TV">True</option>
                          <option value="TV">False</option>
                        </select>
                      </div>
                    </div>
                  ))}
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
      </div>
    </>
  );
}

export default Admin;
