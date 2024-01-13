/* eslint-disable no-extra-boolean-cast */
import { FormEvent, useEffect, useState } from "react";
import { useProfile } from "../../../../hooks/useProfile";
import { Loading } from "../../../components/Loading";
import { useImgs } from "../../../../hooks/useImgs";
import { useAuth } from "../../../../hooks/useAuth";

function Admin() {

  const { getAllProfiles, profile, updateUsersProfile, profileAll_name, setProfileAll_name, admin, setAdmin, setSpecialist, specialist, deleteProfile } = useProfile();
  const { getAvatar } = useImgs();
  const { user } = useAuth();
  const [isLoading, setisLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const URLAvatar =
    "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Avatar/";

  const fetchData = async () => {
    setisLoading(true);
    await getAvatar();
    await getAllProfiles();
    setisLoading(false);
  };

  useEffect(() => {

    fetchData();
  }, []);

  if (isLoading || !user) {
    return <Loading />;
  }

  const openModal = (userId: number) => {
    setSelectedUserId(userId);


    const selectedProfile = profile.find((profile) => profile.id === userId);

    if (selectedProfile) {
      setProfileAll_name(selectedProfile.all_name)
      setAdmin(selectedProfile.admin)
      setSpecialist(selectedProfile.specialist)
    }

    setIsModalOpen(true);
  };

  const updateProfile = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    await updateUsersProfile(selectedUserId!, e);

    closeModal();

    fetchData();

  }

  const delete_Profile = async () => {

    await deleteProfile(selectedUserId!);

    closeModal();

    fetchData();

  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                              href="#"
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
                  Edit User
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={(e) => updateProfile(e)} className="p-4 md:p-5">

                {profile
                  .filter((profile) => profile.id === selectedUserId) // Assuming you want to filter profiles with an 'id'
                  .map((selectedProfile) => (
                    <div className="grid gap-4 mb-4 grid-cols-2" key={selectedProfile.id}>
                      <div className="col-span-2">

                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Id: {selectedProfile.id}

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
                          value={profileAll_name}
                          onChange={(e) => setProfileAll_name(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder={!!selectedProfile.all_name ? selectedProfile.all_name : "User Name"}
                        />
                      </div>

                      <div className="flex items-center mb-4">
                        <input
                          id={`admin-${selectedProfile.id}`}
                          type="checkbox"
                          checked={admin}
                          onChange={(e) => setAdmin(e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor={`admin-${selectedProfile.id}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Admin: {selectedProfile.admin.toString()}</label>
                      </div>

                      <div className="flex items-center mb-4">
                        <input
                          id={`specialist-${selectedProfile.id}`}
                          type="checkbox"
                          checked={specialist}
                          onChange={(e) => setSpecialist(e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor={`specialist-${selectedProfile.id}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Specialist: {selectedProfile.specialist.toString()}</label>
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
                    onClick={() => delete_Profile()}
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
