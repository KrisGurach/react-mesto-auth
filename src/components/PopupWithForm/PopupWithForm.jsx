import { useContext } from "react";
import { usePopupClose } from "../../hooks/usePopupClose";
import { AppContext } from "../../contexts/AppContext";

export default function PopupWithForm({
  name,
  title,
  ariaLabel,
  titleButton,
  children,
  isOpened,
  onSubmit,
}) {
  const { onClose } = useContext(AppContext);
  usePopupClose(isOpened, onClose);

  return (
    <div
      className={`popup popup_type_${name} ${isOpened && "popup_opened"}`}
      aria-label={ariaLabel}
    >
      <div className="popup__container popup__container_min-size">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <form
          className="popup__form"
          name={`form-of-${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            value={titleButton}
            className="popup__save-button"
          >
            {titleButton}
          </button>
        </form>
      </div>
    </div>
  );
}
