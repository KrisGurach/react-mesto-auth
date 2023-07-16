export default function Footer({ currentPage }) {
  return (
    <footer className="footer">
      {currentPage === "main" && (
        <p className="footer__text">© 2023 Mesto Russia</p>
      )}
    </footer>
  );
}
