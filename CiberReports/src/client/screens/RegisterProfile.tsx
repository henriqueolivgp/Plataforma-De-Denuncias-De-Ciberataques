import { Link } from "react-router-dom";

function RegisterProfile() {

    return (
        <>
            <img
                src="/Image 283.jpg"
                alt="imagem de fundo"
                className=" absolute top-0 z-[-1] object-cover"
            />
            <div className="container mx-auto ">

                <h1 className=" text-center font-bold text-4xl mb-0">Regist your profile</h1>

                <p className=" text-center  font-bold">Welcome, prepare your profile to continue if you don't want to, you can skip</p>

                <div className="content mx-auto flex flex-1 items-center">

                    <div>
                        <form >

                            <div className="grid gap-6 mb-6 md:grid-cols-2">

                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >First Name: </label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First_Name..."
                                        onChange={(e) => (e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Contact: </label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-456-7890"
                                        onChange={(e) => (e.target.value)} />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Banner</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        onChange={(e) => {
                                            (e); // 👈 this will trigger when user selects the file.
                                        }} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Avatar</label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                        onChange={(e) => {
                                            (e);
                                        }} />

                                </div>

                            </div>

                            <div className="flex justify-between">

                                <Link to="/" ><button type="submit" className=" mt-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Skip</button></Link>

                                <button type="submit" className=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                            </div>
                        </form>
                    </div>


                </div>
            </div>

        </>
    )
}

export default RegisterProfile;