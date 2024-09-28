import React from "react";
import "./CartModal.css"; // Import styles

const CartModal = ({ items = [], onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <span className="icon">×</span>
        </button>
        <h2>Корзина</h2>
        {items.length === 0 ? (
          <p>Ваша корзина пуста</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.photo_url} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>Количество: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartModal;
