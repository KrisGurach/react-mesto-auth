import successfulLogo from "../../images/successful-login.svg";
import failedLogo from "../../images/failed-login.svg";
import { usePopupClose } from "../../hooks/usePopupClose";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function InfoTooltip({ isOpened, isSuccess }) {
  const { onClose } = useContext(AppContext);
  const navigate = useNavigate();
  usePopupClose(isOpened, handleClose);

  const logo = isSuccess ? successfulLogo : failedLogo;
  const message = isSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  function handleClose() {
    onClose();
    if (isSuccess) {
      navigate("/sign-in", { replace: true });
    }
  }

  return (
    <div
      className={`popup popup_type_login ${isOpened && "popup_opened"}`}
      // aria-label={ariaLabel}
    >
      <div className="popup__container popup__container_min-size">
        <button
          className="popup__close-button"
          type="button"
          onClick={handleClose}
        />
        <div className="popup__wrapper">
          <img src={logo} alt="" className="popup__icon"></img>
          <p className="popup__login-message">{message}</p>
        </div>
      </div>
    </div>
  );
}
