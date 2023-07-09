import logo from "../../images/logotype.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="логотип Место" />
    </header>
  );
}
