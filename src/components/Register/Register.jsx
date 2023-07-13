import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import auth from "../../utils/auth";

export default function Register() {
  const navigate = useNavigate();
  const { values, handleChange } = useForm();

  function handleClick(e) {
    e.preventDefault();
    auth.signUp(values)
      .then(() => navigate('/sign-in', {replace: true}))
      .catch(console.error);
  }

  return (
    <div className="signUp">
      <p className="signUp__text">Регистрация</p>
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
      <button onClick={handleClick}>Зарегистрироваться</button>
    </div>
  );
}
