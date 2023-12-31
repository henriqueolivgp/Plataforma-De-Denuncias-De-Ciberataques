import { Link, useNavigate } from "react-router-dom";
import ImgBack from "../components/ImgBack";
import { useImgs } from "../../hooks/useImgs";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { FormEvent, useEffect, useState } from "react";


function RegisterProfile() {

    const { user } = useAuth();
    const { uploadBanner, uploadAvatar } = useImgs();
    const { insertProfile, all_name, setAll_name } = useProfile();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const insertForm = async (e:FormEvent<HTMLFormElement>) =>{
        await insertProfile(e)
        navigate('/');
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setLoading(false)
        };

        fetchData();
    }, [user]);

    console.log(all_name)

    if (loading || !user) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <ImgBack />
            <div className="container mx-auto flex items-center justify-center">
                <div className="h-auto ax-w-sm p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="text-center text-black font-bold text-4xl mb-0">
                        Register your profile
                    </h1>
                    <p className="text-center font-bold">
                        Welcome, prepare your profile to continue if you don't want to, you
                        can skip
                    </p>
                    <div className="content mx-auto flex flex-1 items-center top-10">
                        <form onSubmit={insertForm}>
                            <div className="grid gap-6 mb-6 ">
                                <div>
                                    <div>
                                        <label
                                            htmlFor="first_name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            First Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="all_name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={all_name}
                                            placeholder="FirstName and LastName..."
                                            onChange={(e) => setAll_name(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col-2 space-x-4">
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="banner_input"
                                        >
                                            Upload Banner
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="banner_input"
                                            onChange={(e) => {
                                                uploadBanner(e);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="avatar_input"
                                        >
                                            Upload Avatar
                                        </label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="avatar_input"
                                            type="file"
                                            onChange={(e) => {
                                                uploadAvatar(e);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <Link to="/">
                                    <button
                                        type="button"
                                        className="mt-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        Skip
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterProfile;