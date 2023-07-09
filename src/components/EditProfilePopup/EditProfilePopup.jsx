import React, { useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import { AppContext } from "../../contexts/AppContext";

export default function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm(currentUser);
  const { isLoading } = useContext(AppContext);

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edition"
      title="Редактировать профиль"
      ariaLabel="Окно редактирования информации о себе"
      titleButton={isLoading ? "Сохранение..." : "Сохранить"}
      isOpened={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Введите имя"
        className="popup__input popup__input_type_name"
        minLength={2}
        maxLength={40}
        required=""
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_type_name" />
      <input
        type="text"
        name="about"
        placeholder="Введите профессию"
        className="popup__input popup__input_type_profession"
        minLength={2}
        maxLength={400}
        required=""
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_type_profession" />
    </PopupWithForm>
  );
}
