import { useNavigate, Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import auth from "../../utils/auth";

export default function Login({ handleEmail, handleLogin, handleHeaderStateChange }) {
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

  handleHeaderStateChange('signIn');

  return (
    <div className="signIn">
      <p className="signIn__text">Вход</p>
      <input
        type="text"
        name="email"
        placeholder="Email"
        className="popup__input popup__input_type_name"
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
        className="popup__input popup__input_type_profession"
        minLength={2}
        maxLength={400}
        required=""
        value={values.password || ""}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Войти</button>

      <Link to="/sign-up" className="signup__link">Зарегистрироваться</Link>
    </div>
  );
}
