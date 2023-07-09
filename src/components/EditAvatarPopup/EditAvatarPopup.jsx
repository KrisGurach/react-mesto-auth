import React, { useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { AppContext } from "../../contexts/AppContext";

export default function EditAvatarPopup({ isOpened, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const { isLoading } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    const avatar = avatarRef.current.value;
    onUpdateAvatar(avatar);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      ariaLabel="Окно редактирования аватара"
      titleButton={isLoading ? "Сохранение..." : "Сохранить"}
      isOpened={isOpened}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        ref={avatarRef}
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_type_avatar"
        pattern="https://.*"
        required=""
      />
      <span className="popup__error popup__error_type_avatar" />
    </PopupWithForm>
  );
}
