import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function UpdatePassword() {

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Se o utilizador não estiver logado, redirecione-o para a página de login
  useEffect(() => {
      if (!loading && !user) {
          navigate('/signin'); // Substitua pela rota da sua página de login
      }
  }, [loading, user, navigate]);

  // Renderize o conteúdo da sua página apenas se o utulizador estiver logado
  if (loading || !user) {
      return <p>Carregando...</p>;
  }

  return (
    <>
      <div className="container mx-auto ">
        <div className="content mx-auto">
          <h1>Update Profile page</h1>
          
          <button>Estou aqui</button>

        </div>
      </div>
      
    </>
  )
}

export default UpdatePassword;