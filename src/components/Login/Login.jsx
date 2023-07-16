import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import auth from "../../utils/auth";
import { useEffect } from "react";

export default function Login({ handleEmail, handleLogin, handleHeaderStateChange}) {
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm();

  function handleClick(e) {
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

  useEffect(() => {
    handleHeaderStateChange("signIn");
  }, []);

  return (
    <div className="signIn">
      <p className="signIn__text">Вход</p>
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
      <button className="signIn__button" onClick={handleClick}>Войти</button>
    </div>
  );
}
