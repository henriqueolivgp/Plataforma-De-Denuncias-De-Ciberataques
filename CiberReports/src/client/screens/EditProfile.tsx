import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from "react";
import { SupaBaseClient } from '../../Services/supabase/SupaBaseClient'
import { toast } from "react-toastify";

function EditProfile() {

    const emailRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);
    const first_nameRef = useRef<HTMLInputElement>(null);
    const last_nameRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // Se o usuário não estiver logado, redirecione-o para a página de login
    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin'); // Substitua pela rota da sua página de login
        }
    }, [loading, user, navigate]);

    // Renderize o conteúdo da sua página apenas se o usuário estiver logado
    if (loading || !user) {
        return <p>Carregando...</p>;
    }

    const InsertProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data, error } = await SupaBaseClient
                .from('profiles')
                .insert({
                    id: id,
                    user_id: user.id,
                    email: emailRef.current?.value,
                    banner: bannerRef.current?.value,
                    first_name: first_nameRef.current?.value,
                    last_name: last_nameRef.current?.value,
                    avatar: avatarRef.current?.value,

                })
                .eq('id', id);

            if (error) {
                toast.error('Erro ao atualizar perfil');
                console.log(user)
                console.log(error);
            } else {
                toast.success('Perfil atualizado com sucesso');
                console.log(data);
            }
        } catch (error) {
            console.error('Erro ao conectar ao Supabase:', error);
        }
    }; 
    return (

        <form onSubmit={InsertProfile}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First_Name..." ref={first_nameRef}  />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last_Name" ref={last_nameRef}  />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Banner</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" ref={bannerRef}  />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" ref={emailRef}  />
                </div>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Avatar</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" ref={avatarRef} />
            </div>

            <button type="submit" className=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

    )
}

export default EditProfile;