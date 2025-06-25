import { useState, useEffect } from "react";
import "./Cursos.css";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    preco: "",
    status: "ativo",
  });

  // Pega o usuário logado do localStorage
  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "{}"
  );
  const isAdmin = usuarioLogado.tipo === "admin";

  useEffect(() => {
    carregarCursos();
  }, []);

  const carregarCursos = async () => {
    try {
      setCarregando(true);
      const response = await fetch("http://localhost:3001/servicos");
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      setErro("Erro ao carregar cursos");
      console.error("Erro:", error);
    } finally {
      setCarregando(false);
    }
  };

  const limparForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      categoria: "",
      preco: "",
      status: "ativo",
    });
    setEditando(null);
    setMostrarForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dadosParaEnviar = {
        ...formData,
        preco: parseFloat(formData.preco),
      };

      if (editando) {
        // Atualizar
        const response = await fetch(
          `http://localhost:3001/servicos/${editando.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosParaEnviar),
          }
        );

        if (response.ok) {
          await carregarCursos();
          limparForm();
        }
      } else {
        // Criar
        const response = await fetch("http://localhost:3001/servicos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnviar),
        });

        if (response.ok) {
          await carregarCursos();
          limparForm();
        }
      }
    } catch (error) {
      setErro("Erro ao salvar curso");
      console.error("Erro:", error);
    }
  };

  const handleEditar = (curso) => {
    setFormData({
      nome: curso.nome,
      descricao: curso.descricao,
      categoria: curso.categoria,
      preco: curso.preco.toString(),
      status: curso.status,
    });
    setEditando(curso);
    setMostrarForm(true);
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      try {
        const response = await fetch(`http://localhost:3001/servicos/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await carregarCursos();
        }
      } catch (error) {
        setErro("Erro ao excluir curso");
        console.error("Erro:", error);
      }
    }
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);
  };

  if (carregando) {
    return (
      <div className="cursos-container">
        <div className="loading">Carregando cursos...</div>
      </div>
    );
  }

  return (
    <div className="cursos-container">
      <div className="cursos-content">
        <div className="cursos-header">
          <h1>Gerenciar Cursos</h1>
          {isAdmin && (
            <button
              onClick={() => setMostrarForm(true)}
              className="btn-adicionar"
            >
              Adicionar Curso
            </button>
          )}
        </div>

        {erro && <div className="erro-mensagem">{erro}</div>}

        {mostrarForm && isAdmin && (
          <div className="form-overlay">
            <div className="form-card">
              <h2>{editando ? "Editar" : "Adicionar"} Curso</h2>

              <form onSubmit={handleSubmit} className="curso-form">
                <div className="form-group">
                  <label>Nome do Curso:</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    required
                    placeholder="Ex: Curso de React"
                  />
                </div>

                <div className="form-group">
                  <label>Descrição:</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) =>
                      setFormData({ ...formData, descricao: e.target.value })
                    }
                    required
                    placeholder="Descreva o curso..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Categoria:</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
                    }
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Programação">Programação</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Negócios">Negócios</option>
                    <option value="Idiomas">Idiomas</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preço (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.preco}
                    onChange={(e) =>
                      setFormData({ ...formData, preco: e.target.value })
                    }
                    required
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>

                <div className="form-buttons">
                  <button type="submit" className="btn-salvar">
                    {editando ? "Atualizar" : "Salvar"}
                  </button>
                  <button
                    type="button"
                    onClick={limparForm}
                    className="btn-cancelar"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="cursos-grid">
          {cursos.map((curso) => (
            <div key={curso.id} className="curso-card">
              <div className="curso-header">
                <h3>{curso.nome}</h3>
                <span className={`status ${curso.status}`}>{curso.status}</span>
              </div>

              <div className="curso-info">
                <p className="descricao">{curso.descricao}</p>
                <div className="categoria">
                  <strong>Categoria:</strong> {curso.categoria}
                </div>
                <div className="preco">
                  <strong>Preço:</strong> {formatarPreco(curso.preco)}
                </div>
              </div>

              {isAdmin && (
                <div className="curso-acoes">
                  <button
                    onClick={() => handleEditar(curso)}
                    className="btn-editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(curso.id)}
                    className="btn-excluir"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {cursos.length === 0 && !carregando && (
          <div className="sem-cursos">
            <p>Nenhum curso cadastrado ainda.</p>
            {isAdmin && (
              <button
                onClick={() => setMostrarForm(true)}
                className="btn-adicionar"
              >
                Adicionar Primeiro Curso
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cursos;
