export default function Footer({headerState}) {
  return (
    <footer className="footer">
      {headerState === "main" && <p className="footer__text">© 2023 Mesto Russia</p>}
    </footer>
  );
}
