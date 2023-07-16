import { useLocation } from "react-router";

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <footer className="footer">
      {pathname === "/" && (
        <p className="footer__text">© 2023 Mesto Russia</p>
      )}
    </footer>
  );
}
