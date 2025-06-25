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

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) {
      setUsuarioLogado(JSON.parse(usuario));
    }
    setCarregando(false);
  }, []);

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

  // Rota protegida apenas para admin
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

  if (carregando) {
    return <div className="loading-app">Carregando...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
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
          <Route
            path="/inicio"
            element={
              <AdminRoute>
                <Inicio />
              </AdminRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="/cursos"
            element={
              <ProtectedRoute>
                <Cursos />
              </ProtectedRoute>
            }
          />
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
