import { useForm } from "../../hooks/useForm";

export default function Register() {
  function handleClick() {
    
  }

  const { values, handleChange } = useForm();

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
