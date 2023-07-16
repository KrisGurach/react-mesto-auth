import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import auth from "../../utils/auth";
import { useState } from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function Register({
  isOpened,
  handleLoginPopupOpened,
}) {
  const { values, handleChange } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .signUp(values)
      .then(() => setIsSuccess(true))
      .catch(console.error)
      .finally(() => {
        handleLoginPopupOpened();
      });
  }

  return (
    <div className="signIn">
      <p className="signIn__text">Регистрация</p>
      <form className="popup__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="signIn__input signIn__input_type_email"
          minLength={2}
          maxLength={40}
          required=""
          value={values.email || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="signIn__input signIn__input_type_password"
          minLength={2}
          maxLength={400}
          required=""
          value={values.password || ""}
          onChange={handleChange}
        />
        <button className="signIn__button">Зарегистрироваться</button>
      </form>

      <Link to="/sign-in" className="signIn__link">
        Уже зарегистрированы? Войти
      </Link>

      <InfoTooltip isOpened={isOpened} isSuccess={isSuccess} />
    </div>
  );
}
