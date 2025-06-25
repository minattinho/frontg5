import "./Footer.css";

// rodapé da aplicação - fica embaixo de todas as páginas
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* créditos dos desenvolvedores */}
        <p>&copy; Gabriel Minatto</p>
        <p>&copy; Luan</p>
      </div>
    </footer>
  );
}

export default Footer;
