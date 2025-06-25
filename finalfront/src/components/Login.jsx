import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const response = await fetch("http://localhost:3001/usuarios");
      const usuarios = await response.json();

      const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuario) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        navigate("/inicio");
      } else {
        setErro("Email ou senha incorretos!");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor. Tente novamente.");
      console.error("Erro no login:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>G5 Educação</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>

          {erro && <div className="erro-mensagem">{erro}</div>}

          <button type="submit" disabled={carregando} className="btn-login">
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-info">
          <p>
            <strong>Usuários para teste:</strong>
          </p>
          <p>Admin: admin@admin.com / admin123</p>
          <p>Usuário: Gabriel@email.com / gabriel123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
