import React from "react";
import Card from "../Card/Card.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  handleHeaderStateChange
}) {
  const currentUser = React.useContext(CurrentUserContext);

  handleHeaderStateChange('main');

  return (
    <main>
      <section className="profile" aria-label="Личные данные">
        <button
          className="profile__button-edit-avatar"
          type="button"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Фото пользователя"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <p className="profile__info-profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__edit-button"
          type="button"
          onClick={onEditProfile}
        />
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements" aria-label="Фотокарточки">
        <div className="gallery">
          {cards.map((data) => {
            return (
              <Card
                key={data._id}
                card={data}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
