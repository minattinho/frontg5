import { useState, useEffect } from "react";
import "./Inicio.css";

function Inicio() {
  const [estatisticas, setEstatisticas] = useState({
    usuarios: 0,
    cursos: 0,
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      const [usuariosRes, cursosRes] = await Promise.all([
        fetch("http://localhost:3001/usuarios"),
        fetch("http://localhost:3001/servicos"),
      ]);

      const usuarios = await usuariosRes.json();
      const cursos = await cursosRes.json();

      setEstatisticas({
        usuarios: usuarios.length,
        cursos: cursos.length,
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <div className="inicio-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="inicio-container">
      <div className="inicio-content">
        <div className="info-sistema">
          <h2>G5 Educação</h2>
          <p>
            Seja bem-vindo ao G5, maior plataforma de cursos online do Brasil.

          </p>
          <p>
            Este é seu painel de Administrador, aqui você pode gerenciar todos
            os cursos e usuários do sistema.
          </p>
        </div>
        <br />
        <div className="dashboard">
          <div className="card">
            <h3>Usuários Cadastrados</h3>
            <div className="numero">{estatisticas.usuarios}</div>
            <p>Total de usuários no sistema</p>
          </div>

          <div className="card">
            <h3>Cursos Disponíveis</h3>
            <div className="numero">{estatisticas.cursos}</div>
            <p>Total de cursos cadastrados</p>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Inicio;
