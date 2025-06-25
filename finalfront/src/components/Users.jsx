import { useState, useEffect } from "react";
import "./Users.css";

function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "usuario",
    status: "ativo",
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      const response = await fetch("http://localhost:3001/usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      setErro("Erro ao carregar usuários");
      console.error("Erro:", error);
    } finally {
      setCarregando(false);
    }
  };

  const limparForm = () => {
    setFormData({
      nome: "",
      email: "",
      senha: "",
      tipo: "usuario",
      status: "ativo",
    });
    setEditando(null);
    setMostrarForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        // Atualizar
        const response = await fetch(
          `http://localhost:3001/usuarios/${editando.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          await carregarUsuarios();
          limparForm();
        }
      } else {
        // Criar
        const response = await fetch("http://localhost:3001/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await carregarUsuarios();
          limparForm();
        }
      }
    } catch (error) {
      setErro("Erro ao salvar usuário");
      console.error("Erro:", error);
    }
  };

  const handleEditar = (usuario) => {
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      tipo: usuario.tipo,
      status: usuario.status,
    });
    setEditando(usuario);
    setMostrarForm(true);
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const response = await fetch(`http://localhost:3001/usuarios/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await carregarUsuarios();
        }
      } catch (error) {
        setErro("Erro ao excluir usuário");
        console.error("Erro:", error);
      }
    }
  };

  if (carregando) {
    return (
      <div className="users-container">
        <div className="loading">Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-content">
        <div className="users-header">
          <h1>Gerenciar Usuários</h1>
          <button
            onClick={() => setMostrarForm(true)}
            className="btn-adicionar"
          >
            Adicionar Usuário
          </button>
        </div>

        {erro && <div className="erro-mensagem">{erro}</div>}

        {mostrarForm && (
          <div className="form-overlay">
            <div className="form-card">
              <h2>{editando ? "Editar" : "Adicionar"} Usuário</h2>

              <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                  <label>Nome:</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Senha:</label>
                  <input
                    type="password"
                    value={formData.senha}
                    onChange={(e) =>
                      setFormData({ ...formData, senha: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Tipo:</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) =>
                      setFormData({ ...formData, tipo: e.target.value })
                    }
                  >
                    <option value="usuario">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>
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

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`tipo ${usuario.tipo}`}>
                      {usuario.tipo}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${usuario.status}`}>
                      {usuario.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditar(usuario)}
                      className="btn-editar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir(usuario.id)}
                      className="btn-excluir"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
