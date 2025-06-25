import { useState, useEffect } from "react";
import "./Inicio.css";

// página inicial do admin - dashboard com estatísticas do sistema
function Inicio() {
  // guarda as estatísticas - número de usuários e cursos
  const [estatisticas, setEstatisticas] = useState({
    usuarios: 0,
    cursos: 0,
  });
  // controla se tá carregando as estatísticas ou não
  const [carregando, setCarregando] = useState(true);

  // roda quando a página carrega, pra buscar as estatísticas
  useEffect(() => {
    carregarEstatisticas();
  }, []);

  // função que busca as estatísticas do servidor
  const carregarEstatisticas = async () => {
    try {
      // busca usuários e cursos ao mesmo tempo
      const [usuariosRes, cursosRes] = await Promise.all([
        fetch("http://localhost:3001/usuarios"),
        fetch("http://localhost:3001/servicos"),
      ]);

      const usuarios = await usuariosRes.json();
      const cursos = await cursosRes.json();

      // salva o número de usuários e cursos
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

  // se tá carregando, mostra uma tela de loading
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
        {/* informações sobre o sistema */}
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

        {/* dashboard com os cards de estatísticas */}
        <div className="dashboard">
          {/* card com número de usuários */}
          <div className="card">
            <h3>Usuários Cadastrados</h3>
            <div className="numero">{estatisticas.usuarios}</div>
            <p>Total de usuários no sistema</p>
          </div>

          {/* card com número de cursos */}
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
