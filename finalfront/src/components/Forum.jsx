import { useState, useEffect } from "react";
import "./Forum.css";

function Forum() {
  const [perguntas, setPerguntas] = useState([]);
  const [novaPergunta, setNovaPergunta] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarPerguntas();
  }, []);

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

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!novaPergunta.trim()) return;
    try {
      const resp = await fetch("http://localhost:3001/perguntas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: novaPergunta }),
      });
      if (resp.ok) {
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
      <form className="forum-form" onSubmit={handleEnviar}>
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={novaPergunta}
          onChange={(e) => setNovaPergunta(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      {erro && <div className="erro-mensagem">{erro}</div>}
      <div className="forum-lista">
        {carregando ? (
          <div className="loading">Carregando perguntas...</div>
        ) : perguntas.length === 0 ? (
          <div className="sem-perguntas">
            Nenhuma pergunta ainda. Seja o primeiro a perguntar!
          </div>
        ) : (
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
