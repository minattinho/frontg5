import { useState, useEffect } from "react";
import "./Forum.css";

// página do fórum - onde os usuários fazem perguntas e veem as dos outros
function Forum() {
  // lista de todas as perguntas
  const [perguntas, setPerguntas] = useState([]);
  // guarda o texto da nova pergunta que o usuário tá digitando
  const [novaPergunta, setNovaPergunta] = useState("");
  // controla se tá carregando as perguntas ou não
  const [carregando, setCarregando] = useState(true);
  // guarda se deu algum erro
  const [erro, setErro] = useState("");

  // roda quando a página carrega, pra buscar as perguntas
  useEffect(() => {
    carregarPerguntas();
  }, []);

  // função que busca todas as perguntas do servidor
  const carregarPerguntas = async () => {
    try {
      setCarregando(true);
      const resp = await fetch("http://localhost:3001/perguntas");
      const data = await resp.json();
      setPerguntas(data);
    } catch (error) {
      setErro("Erro ao carregar perguntas");
    } finally {
      setCarregando(false);
    }
  };

  // função que envia uma nova pergunta
  const handleEnviar = async (e) => {
    e.preventDefault();
    // se não tem texto, não faz nada
    if (!novaPergunta.trim()) return;
    try {
      const resp = await fetch("http://localhost:3001/perguntas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: novaPergunta }),
      });
      if (resp.ok) {
        // limpa o campo e recarrega as perguntas
        setNovaPergunta("");
        carregarPerguntas();
      }
    } catch (error) {
      setErro("Erro ao enviar pergunta");
    }
  };

  return (
    <div className="forum-container">
      <h1>Fórum da Comunidade</h1>

      {/* formulário pra fazer uma nova pergunta */}
      <form className="forum-form" onSubmit={handleEnviar}>
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={novaPergunta}
          onChange={(e) => setNovaPergunta(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      {/* mostra erro se tiver algum */}
      {erro && <div className="erro-mensagem">{erro}</div>}

      {/* lista de todas as perguntas */}
      <div className="forum-lista">
        {carregando ? (
          // se tá carregando, mostra loading
          <div className="loading">Carregando perguntas...</div>
        ) : perguntas.length === 0 ? (
          // se não tem perguntas, mostra mensagem
          <div className="sem-perguntas">
            Nenhuma pergunta ainda. Seja o primeiro a perguntar!
          </div>
        ) : (
          // mostra todas as perguntas
          perguntas.map((p, i) => (
            <div key={p.id || i} className="forum-pergunta">
              <span>{p.texto}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;
