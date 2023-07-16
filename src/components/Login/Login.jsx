import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import auth from "../../utils/auth";
import { useEffect } from "react";

export default function Login({
  handleEmail,
  handleLogin,
}) {
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }

    auth
      .signIn(values.email, values.password)
      .then((data) => {
        if (data.token) {
          handleEmail(values.email);
          setValues({ email: "", password: "" });
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch(console.error);
  }

  return (
    <div className="signIn">
      <p className="signIn__text">Вход</p>
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
        <button className="signIn__button">
          Войти
        </button>
      </form>
    </div>
  );
}
