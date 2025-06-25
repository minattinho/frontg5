import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Users from "./components/Users";
import Cursos from "./components/Cursos";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Forum from "./components/Forum";
import "./App.css";

// componente principal da aplicação - é tipo o chefe de tudo aqui
function App() {
  // guarda se tem alguém logado e quem é essa pessoa
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  // controla se tá carregando ainda ou não
  const [carregando, setCarregando] = useState(true);

  // roda quando a página carrega, pra ver se tem alguém logado salvo no navegador
  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) {
      setUsuarioLogado(JSON.parse(usuario));
    }
    setCarregando(false);
  }, []);

  // componente que protege as rotas - só deixa entrar quem tá logado
  const ProtectedRoute = ({ children }) => {
    if (carregando) {
      return <div className="loading-app">Carregando...</div>;
    }
    if (!usuarioLogado) {
      return <Navigate to="/" replace />;
    }
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  };

  // rota protegida só pra admin - os chefões da aplicação
  const AdminRoute = ({ children }) => {
    if (carregando) {
      return <div className="loading-app">Carregando...</div>;
    }
    if (!usuarioLogado || usuarioLogado.tipo !== "admin") {
      return <Navigate to="/cursos" replace />;
    }
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  };

  // se ainda tá carregando, mostra uma tela de loading
  if (carregando) {
    return <div className="loading-app">Carregando...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* rota principal - redireciona baseado no tipo de usuário */}
          <Route
            path="/"
            element={
              usuarioLogado ? (
                usuarioLogado.tipo === "admin" ? (
                  <Navigate to="/inicio" replace />
                ) : (
                  <Navigate to="/cursos" replace />
                )
              ) : (
                <Login />
              )
            }
          />
          {/* página inicial só pra admin */}
          <Route
            path="/inicio"
            element={
              <AdminRoute>
                <Inicio />
              </AdminRoute>
            }
          />
          {/* gerenciamento de usuários só pra admin */}
          <Route
            path="/usuarios"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          {/* página de cursos pra todo mundo logado */}
          <Route
            path="/cursos"
            element={
              <ProtectedRoute>
                <Cursos />
              </ProtectedRoute>
            }
          />
          {/* fórum pra todo mundo logado */}
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
