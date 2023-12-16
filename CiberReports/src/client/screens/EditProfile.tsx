import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useEffect, FormEvent, useState } from "react";
import { SupaBaseClient } from '../../Services/supabase/SupaBaseClient'
import { ReafreshPage } from "../functions/ReafreshPage";
import { useImgs } from "../../hooks/useImgs";



interface profile {
    id: number;
    first_name: boolean;
    last_name: string;
}

function EditProfile() {
    const [profiles, setProfiles] = useState<profile[]>([]);
    const [all_name, setAll_name] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const reafreshPage = ReafreshPage();
    const { uploadImage } = useImgs();

    //https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Imgs/311b2884-a18d-4c68-8d9e-f4344e4cb5f4/539e2041-65cc-4cd3-9d14-ee61dd3ce9bc


    const GetAllProfile = async () => {
        const { data } = await SupaBaseClient
            .from('profiles')
            .select('*')
            .order('inserted_at', { ascending: false });
        setProfiles(data || []);
    };


      // Se o usuário não estiver logado, redirecione-o para a página de login
  useEffect(() => {
    const fetchData = async () => {

      await GetAllProfile();
    };

    fetchData();
  }, [user, navigate]);


    // Renderize o conteúdo da sua página apenas se o usuário estiver logado
    if (loading || !user) {
        return <p>Carregando...</p>;
    }


    const InsertProfile = async (e: FormEvent) => {
        e.preventDefault();

        const newProfile = {
            user_id: user.id,
            all_name,

        };
        setLoading(true);
        const result = await SupaBaseClient.from('profiles').insert(newProfile).select().single();
        setProfiles([result.data, ...profiles]);
        setLoading(false);
        setAll_name('');
    };

    return (

        <div>
            <form onSubmit={InsertProfile}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >First Name: </label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First_Name..." value={all_name}
                            onChange={(e) => setAll_name(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Banner</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            onChange={(e) => {
                                uploadImage(e); // 👈 this will trigger when user selects the file.
                            }} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Avatar</label>
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            type="file"
                            onChange={(e) => {
                                uploadImage(e);
                            }} />

                    </div>

                </div>


                <button type="submit" onClick={reafreshPage.handleReload} className=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>

    )
}

export default EditProfile;