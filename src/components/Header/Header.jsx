import { useNavigate } from "react-router-dom";
import logo from "../../images/logotype.svg";

export default function Header({email}) {
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("token");
    navigate("/sign-in", {replace: true});
  }

  return (
    <header className="header">
      <img src={logo} className="logo" alt="логотип Место" />
      <div className="header__container">
        <p className="header__email">{email}</p>
        <button className="header__out" onClick={handleClick}>Выйти</button>
      </div>
    </header>
  );
}
