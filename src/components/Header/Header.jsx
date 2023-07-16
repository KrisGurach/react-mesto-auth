import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logotype.svg";

export default function Header({ email }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const buttonClassName = `header__button ${
    pathname === "/" && "header__button_grey"
  }`;

  let message = "";
  let handleClick;

  switch (pathname) {
    case "/sign-in":
      message = "Регистрация";
      handleClick = toSignUp;
      break;

    case "/sign-up":
      message = "Войти";
      handleClick = toSignIn;
      break;

    case "/":
      message = "Выйти";
      handleClick = signOut;
      break;

    default:
      message = "";
  }

  function signOut() {
    localStorage.removeItem("token");
    toSignIn();
  }

  function toSignIn() {
    navigate("/sign-in", { replace: true });
  }

  function toSignUp() {
    navigate("/sign-up", { replace: true });
  }

  return (
    <header className="header">
      <img src={logo} className="logo" alt="логотип Место" />
      <div className="header__container">
        {pathname === "/" && <p className="header__email">{email}</p>}
        <button className={buttonClassName} onClick={handleClick}>
          {message}
        </button>
      </div>
    </header>
  );
}
