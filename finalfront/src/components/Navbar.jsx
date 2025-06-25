import { useNavigate } from "react-router-dom";
import "./Navbar.css";

// barra de navegação - o menu que fica no topo da página
function Navbar() {
  const navigate = useNavigate();
  // pega as informações do usuário logado do navegador
  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "{}"
  );
  // verifica se é admin ou não
  const isAdmin = usuarioLogado.tipo === "admin";

  // função que faz o logout - remove os dados do usuário e volta pro login
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* logo/nome da aplicação */}
        <div className="navbar-brand">
          <h2>G5 Educação</h2>
        </div>

        {/* menu de navegação */}
        <div className="navbar-menu">
          {/* botão início só aparece pra admin */}
          {isAdmin && (
            <button onClick={() => navigate("/inicio")} className="nav-link">
              Início
            </button>
          )}
          {/* botão usuários só aparece pra admin */}
          {isAdmin && (
            <button onClick={() => navigate("/usuarios")} className="nav-link">
              Usuários
            </button>
          )}
          {/* botão cursos pra todo mundo */}
          <button onClick={() => navigate("/cursos")} className="nav-link">
            Cursos
          </button>
          {/* botão fórum só pra usuários normais (não admin) */}
          {!isAdmin && (
            <button onClick={() => navigate("/forum")} className="nav-link">
              Fórum
            </button>
          )}
        </div>

        {/* área do usuário - mostra o nome e botão de sair */}
        <div className="navbar-user">
          <span className="user-name">Olá, {usuarioLogado.nome}</span>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
