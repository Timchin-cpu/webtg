import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import App from "./App";
import "./Main.css";
import bansys from "./bansys.png";
import toBuy from "./tobuy.png";
import WhyBansysPage from "./components/WhyBansysPage/WhyBansysPage";
import HowToBuyPage from "./components/HowToBuyPage/HowToBuyPage";
import GuaranteePage from "./components/GuaranteePage/GuaranteePage";
import LoyaltyProgramPage from "./components/LoyaltyProgramPage/LoyaltyProgramPage";
import SendRequestPage from "./components/SendRequestModal/SendRequestModal";
import ProfilePage from "./components/ProfileModal/ProfileModal";

function Main() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(setIsAuthenticated);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShopButtonClick = () => {
    if (isAuthenticated) {
      navigate("/app");
    } else {
      openModal();
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="menu-container">
            <div className="header"></div>
            <div>
              <div className="content">
                <img src={bansys} alt="bans" />
                <p className="subtitle">Bansys - Банкоматы - Терминалы</p>
              </div>
            </div>
            <div className="footer">
              <img
                src={toBuy}
                alt="toBuy"
                className="shop-button"
                onClick={handleShopButtonClick}
              />
            </div>
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Требуется авторизация</h2>
                  <p>Пожалуйста, войдите в систему для продолжения.</p>
                  <button onClick={closeModal}>Закрыть</button>
                </div>
              </div>
            )}
          </div>
        }
      />
      <Route path="/app" element={<App />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/send-request" element={<SendRequestPage />} />
      <Route path="/why-bansys" element={<WhyBansysPage />} />
      <Route path="/how-to-buy" element={<HowToBuyPage />} />
      <Route path="/guarantee" element={<GuaranteePage />} />
      <Route path="/loyalty-program" element={<LoyaltyProgramPage />} />
    </Routes>
  );
}

export default Main;
