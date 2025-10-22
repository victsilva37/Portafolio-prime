import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer">
      <p>
        &copy; {currentYear} Víctor Silva. Todos los derechos reservados.
      </p>
    </footer>
  );
}
