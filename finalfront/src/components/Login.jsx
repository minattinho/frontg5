import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// tela de login - onde todo mundo entra na aplicação
function Login() {
  // guarda o email que o usuário digitou
  const [email, setEmail] = useState("");
  // guarda a senha que o usuário digitou
  const [senha, setSenha] = useState("");
  // guarda se deu algum erro no login
  const [erro, setErro] = useState("");
  // controla se tá processando o login ou não
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  // função que roda quando o usuário clica em entrar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      // busca todos os usuários no servidor
      const response = await fetch("http://localhost:3001/usuarios");
      const usuarios = await response.json();

      // procura se tem algum usuário com esse email e senha
      const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuario) {
        // se encontrou, salva no navegador e vai pra página inicial
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        navigate("/inicio");
      } else {
        // se não encontrou, mostra erro
        setErro("Email ou senha incorretos!");
      }
    } catch (error) {
      // se deu erro na conexão com o servidor
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

        {/* formulário de login */}
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

          {/* mostra erro se tiver algum */}
          {erro && <div className="erro-mensagem">{erro}</div>}

          {/* botão de entrar - fica desabilitado enquanto processa */}
          <button type="submit" disabled={carregando} className="btn-login">
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* informações dos usuários de teste */}
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
