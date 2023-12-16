import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useEffect, FormEvent, useState, useCallback } from "react";
import { SupaBaseClient } from '../../Services/supabase/SupaBaseClient'
import { toast } from "react-toastify";

interface profile {
    id: number;
    first_name: boolean;
    last_name: string;
}

interface Img {
    name: string;
}

function EditProfile() {
    const [profiles, setProfiles] = useState<profile[]>([]);
    const [all_name, setAll_name] = useState<string>('');
    //imagens
    const [bannerImages, setBannerImages] = useState<Img[]>([]);
    const [avatarImages, setAvatarImages] = useState<Img[]>([]);
    const [images, setImages] = useState<Img[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    //https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Imgs/311b2884-a18d-4c68-8d9e-f4344e4cb5f4/539e2041-65cc-4cd3-9d14-ee61dd3ce9bc

    const CDNURL = "https://tswdlagzqgorbbabshyx.supabase.co/storage/v1/object/public/Imgs/"

    const GetAllProfile = async () => {
        const { data } = await SupaBaseClient
            .from('profiles')
            .select('*')
            .order('inserted_at', { ascending: false });
        setProfiles(data || []);
    };


    const getImages = useCallback(async () => {
        const { data, error } = await SupaBaseClient
            .storage
            .from('Imgs')
            .list(user?.id + "/", {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" }
            });

        if (data !== null) {
            // Separe as imagens em banner e avatar com base no nome do arquivo
            const bannerImages = data.filter(image => image.name.startsWith("banner"));
            const avatarImages = data.filter(image => image.name.startsWith("avatar"));

            setImages(data);
            setBannerImages(bannerImages);
            setAvatarImages(avatarImages);
            console.log(avatarImages)
        } else {
            toast.error("Error loading images");
            console.log(error);
        }
    }, [user]);

      // Se o usuário não estiver logado, redirecione-o para a página de login
  useEffect(() => {
    const fetchData = async () => {

      await GetAllProfile();
      await getImages();
    };

    fetchData();
  }, [getImages, user, navigate]);


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

    async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
    
        if (file && user) {
            try {
                // Defina um nome para o arquivo com base na condição (por exemplo, a ordem)
                const fileName = images.length === 0 ? "banner" : "banner";
    
                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Imgs')
                    .upload(`${user.id}/${fileName}`, file);
    
                if (data) {
                    getImages();
                    // Se for a primeira imagem, faça algo específico (por exemplo, definir como banner)
                    if (images.length === 0) {
                        console.log('Imagem enviada como banner.');
                    }
                } else {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }
            try {
                // Defina um nome para o arquivo com base na condição (por exemplo, a ordem)
                const fileName = images.length === 0 ? "avatar" : "avatar";
    
                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Imgs')
                    .upload(`${user.id}/${fileName}`, file);
    
                if (data) {
                    getImages();
                    // Se for a primeira imagem, faça algo específico (por exemplo, definir como banner)
                    if (images.length === 0) {
                        console.log('Imagem enviada como banner.');
                    }
                } else {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    
    

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


                <button type="submit" className=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <div>
                <h2>Banner Images:</h2>
                {bannerImages.map((image) => {
                    const imageURL = `${CDNURL}${user.id}/${image.name}`;
                    console.log(imageURL);

                    return (
                        <div key={imageURL}>
                            <img className="w-24 h-24 mb-3 ml-4 rounded-full shadow-lg" src={imageURL} />
                        </div>
                    );
                })}
                <h2>Avatar Images:</h2>
                {avatarImages.map((image) => {
                    const imageURL = `${CDNURL}${user.id}/${image.name}`;
                    console.log(imageURL);

                    return (
                        <div key={imageURL}>
                            <img className="w-24 h-24 mb-3 ml-4 rounded-full shadow-lg" src={imageURL} />
                        </div>
                    );
                })}

            </div>
        </div>

    )
}

export default EditProfile;