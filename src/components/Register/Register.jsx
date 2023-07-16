import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import auth from "../../utils/auth";
import { useEffect } from "react";

export default function Register({handleHeaderStateChange}) {
  const navigate = useNavigate();
  const { values, handleChange } = useForm();

  function handleClick(e) {
    e.preventDefault();
    auth.signUp(values)
      .then(() => navigate('/sign-in', {replace: true}))
      .catch(console.error);
  }

  useEffect(() => {
    handleHeaderStateChange("signUp");
  }, []);

  return (
    <div className="signIn">
      <p className="signIn__text">Регистрация</p>
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
        type="text"
        name="password"
        placeholder="Пароль"
        className="signIn__input signIn__input_type_password"
        minLength={2}
        maxLength={400}
        required=""
        value={values.password || ""}
        onChange={handleChange}
      />
      <button className="signIn__button" onClick={handleClick}>Зарегистрироваться</button>

      <Link to="/sign-in" className="signIn__link">Уже зарегистрированы? Войти</Link>
    </div>
  );
}
