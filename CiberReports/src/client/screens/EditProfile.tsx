import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useImgs } from "../../hooks/useImgs";

function EditProfile() {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { updateAvatar, updateBanner } = useImgs();
    const { updateProfile, all_name, setAll_name } = useProfile();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(false)
        };

        fetchData();
    }, []);

    if (loading || !user) {
        return <p>Carregando...</p>;
    }

    return (

        <div>
            <form onSubmit={updateProfile}>
                <div className="flex flex-col gap-6 mb-6 ">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >First Name: </label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First_Name..."
                            value={all_name}
                            onChange={(e) => setAll_name(e.target.value)} />
                    </div>
                    {/* <div className="mb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" />
                    </div> */}
                    <div className="flex gap-6 sm:flex-row flex-col">
                        <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Banner</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file_input"
                                onChange={(e) => {
                                    updateBanner(e); // 👈 this will trigger when user selects the file.
                                }} />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Update Avatar</label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file_input"
                                type="file"
                                onChange={(e) => {
                                    updateAvatar(e);
                                }} />

                        </div>
                    </div>
                </div>

                <button type="submit" className=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>

    )
}

export default EditProfile;