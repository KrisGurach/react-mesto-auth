import { useNavigate } from "react-router-dom";
import logo from "../../images/logotype.svg";
import { useEffect } from "react";

export default function Header({ email, currentPage }) {
  const navigate = useNavigate();

  const buttonClassName = `header__button ${
    currentPage === "main" && "header__button_grey"
  }`;

  let message = "";
  let handleClick;

  switch (currentPage) {
    case "signIn":
      message = "Регистрация";
      handleClick = toSignUp;
      break;

    case "signUp":
      message = "Войти";
      handleClick = toSignIn;
      break;

    case "main":
      message = "Выйти";
      handleClick = signOut;
      break;

    default:
      message = currentPage;
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
        {currentPage === "main" && <p className="header__email">{email}</p>}
        <button className={buttonClassName} onClick={handleClick}>
          {message}
        </button>
      </div>
    </header>
  );
}
