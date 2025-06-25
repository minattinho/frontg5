import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "{}"
  );
  const isAdmin = usuarioLogado.tipo === "admin";

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>G5 Educação</h2>
        </div>

        <div className="navbar-menu">
          {isAdmin && (
            <button onClick={() => navigate("/inicio")} className="nav-link">
              Início
            </button>
          )}
          {isAdmin && (
            <button onClick={() => navigate("/usuarios")} className="nav-link">
              Usuários
            </button>
          )}
          <button onClick={() => navigate("/cursos")} className="nav-link">
            Cursos
          </button>
          {!isAdmin && (
            <button onClick={() => navigate("/forum")} className="nav-link">
              Fórum
            </button>
          )}
        </div>

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
