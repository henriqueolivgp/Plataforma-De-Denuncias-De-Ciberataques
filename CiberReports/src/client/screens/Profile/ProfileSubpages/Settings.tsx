import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function  Settings ()  {

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

    return (
        <div>
            <p>Settings Page</p>
        </div>
    )
}

export default Settings;