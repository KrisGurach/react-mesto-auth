import { useContext } from "react";
import { usePopupClose } from "../../hooks/usePopupClose";
import { AppContext } from "../../contexts/AppContext";

export default function ImagePopup({ card, isOpened }) {
  const { onClose } = useContext(AppContext);

  usePopupClose(isOpened, onClose);

  return (
    <section
      className={`popup popup_type_photo ${isOpened && "popup_opened"}`}
      aria-label="Окно увеличенной фотографии"
    >
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_type_photo"
          type="button"
          onClick={onClose}
        />
        <figure className="popup__figure">
          <img
            className="popup__scale-image"
            src={card ? card.link : "#"}
            alt={card ? card.name : "#"}
          />
          <figcaption className="popup__figcaption">
            {card ? card.name : "#"}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
