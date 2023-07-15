import api from '../utils/api.js';
import auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { AppContext } from '../contexts/AppContext.js';
import Header from '../components/Header/Header.jsx';
import Main from '../components/Main/Main.jsx';
import Footer from '../components/Footer/Footer.jsx';
import ImagePopup from './ImagePopup/ImagePopup.jsx';
import PopupWithForm from '../components/PopupWithForm/PopupWithForm.jsx';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.jsx';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import ProtectedRouteElement from './ProtectedRoute/ProtectedRoute.js';

function App() {
  const navigate = useNavigate();

  //стейты для получения информации с сервера
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');

  //стейты для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setIsSelectedCardOpen] = useState({});
  const [isImagePopup, setIsImagePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [headerState, setHeaderState] = useState("");

  useEffect(() => {
    api
      .getWebInfo()
      .then((info) => setCurrentUser(info))
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((webCards) => setCards(webCards))
      .catch(console.error);
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSelectedCardOpen({});
    setIsImagePopupOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick({ link, name }) {
    setIsSelectedCardOpen({ link, name });
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    function makeRequest() {
      return api
        .toggleLikeCard(card._id, !isLiked)
        .then((newCard) =>
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          )
        );
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete(id) {
    function makeRequest() {
      return api
        .removeCard(id)
        .then(() =>
          setCards((state) => state.filter((card) => card._id !== id))
        );
    }

    handleSubmit(makeRequest);
  }

  function handleUpdateUser(userNewInfo) {
    function makeRequest() {
      return api
        .updateProfileData(userNewInfo)
        .then((userData) => setCurrentUser(userData));
    }

    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(avatar) {
    function makeRequest() {
      return api
        .sendAvatar(avatar)
        .then((userData) => setCurrentUser(userData));
    }

    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit({ place, link }) {
    function makeRequest() {
      return api
        .sendNewCard({ place, link })
        .then((newCard) => setCards([newCard, ...cards]));
    }

    handleSubmit(makeRequest);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.checkToken(token).then((res) => {
        if (res) {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      });
    }
  };

  function handleHeaderStateChange(state) {
    setHeaderState(state);
  }

  function handleEmail(email) {
    setEmail(email);
  }

  return (
    <AppContext.Provider value={{ isLoading, onClose: closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="container">
          <Header email={email} headerState={headerState} />

          <Routes>
            <Route
              path="/sign-in"
              element={
                <Login
                  handleEmail={handleEmail}
                  handleLogin={handleLogin}
                  handleHeaderStateChange={handleHeaderStateChange}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register handleHeaderStateChange={handleHeaderStateChange} />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                  handleHeaderStateChange={handleHeaderStateChange}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <ImagePopup />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpened={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpened={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="remove-photo"
            title="Вы уверены?"
            ariaLabel="Окно подтверждения удаления фото"
            titleButton="Да"
          ></PopupWithForm>

          <ImagePopup card={selectedCard} isOpened={isImagePopup} />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
