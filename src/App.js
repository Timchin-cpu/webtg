import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Search from "./components/Search/Search";
import ProductModal from "./components/ProductModal/ProductModal";
import CartModal from "./components/CartModal/CartModal";
import useCart from "./useCart";
import "./App.css";
import fly from "./fly.png";
import myLog from "./myLog.png";
import sendRequest from "./sendRequest.png";
import dn from "./dn1.png";
import hyosung from "./hyosung2.png";
import ncr from "./ncr1.png";
import grg from "./Grg.png";
import oki from "./Oki.png";
import wincor from "./Wincor.png";
import cart from "./cart.png";
import cartgl from "./cartgl.png";

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    Promise.all([axios.get("/api/categories"), axios.get("/api/products")])
      .then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      })
      .catch((error) => console.error("Ошибка при получении данных:", error));
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
  );

  const categoriesWithFilteredProducts = categories.filter((category) =>
    filteredProducts.some((product) => product.category === category.name)
  );

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(false);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };
  const resetCart = () => {
    clearCart(); // Очистка корзины
    console.log(cartItems);
  };
  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Сбрасываем категорию, если она уже выбрана
    } else {
      setSelectedCategory(categoryName); // Устанавливаем выбранную категорию
    }
  };

  return (
    <div className="main">
      <div className="header-name">
        <div className="tg-link-button">
          <img src={fly} alt="tglink" className="tglink"></img>
          <a href="https://t.me/Bansys_sale" className="tg-button">
            @Bansys_sale
          </a>
        </div>
      </div>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="about-buttons-question">
        <div className="why" onClick={() => navigate("/why-bansys")}>
          Почему BANSYS?
        </div>
        <div className="how" onClick={() => navigate("/how-to-buy")}>
          Поделись с другом
        </div>
        <div className="garante" onClick={() => navigate("/guarantee")}>
          Гарантия
        </div>
        <div className="loyal" onClick={() => navigate("/loyalty-program")}>
          Склад и производство
        </div>
      </div>
      <div className="log-help">
        <img
          src={myLog}
          className="my-log"
          alt=""
          loading="eager"
          onClick={() => navigate("/profile")}
        ></img>
        <img
          src={sendRequest}
          alt=""
          onClick={() => navigate("/send-request")}
        ></img>
      </div>
      <div className="company">
        <div className="companya">
          <img src={dn} alt="dn"></img>
          <button
            className="more-detailed"
            onClick={() => handleCategoryClick("Банкоматы Diebold")}
          >
            Подробнее
          </button>
        </div>
        <div className="companya">
          <img src={grg} alt="grg"></img>
          <button
            className="more-detailed"
            onClick={() => handleCategoryClick("Банкоматы GRG")}
          >
            Подробнее
          </button>
        </div>
        <div className="companya">
          <img src={hyosung} alt="hyosung"></img>
          <button
            className="more-detailed"
            onClick={() => handleCategoryClick("Банкоматы Nautilus Huosyng")}
          >
            Подробнее
          </button>
        </div>
        <div className="companya">
          <img src={ncr} alt="ncr"></img>
          <button
            className="more-detailed"
            onClick={() => handleCategoryClick("Банкоматы NCR")}
          >
            Подробнее
          </button>
        </div>
        <div className="companya">
          <img src={oki} alt="oki"></img>
          <button
            className="more-detailed"
            onClick={() => handleCategoryClick("oki")}
          >
            Подробнее
          </button>
        </div>
        <div className="companya">
          <img src={wincor} alt="wincor"></img>
          <button
            className="more-detailed"
            onClick={() => handleCategoryClick("Банкоматы Wincor Nixdorf")}
          >
            Подробнее
          </button>
        </div>
      </div>
      <div className="header-cart">
        <h1 className="catalog">Каталог</h1>
        <img
          src={cartgl}
          alt="cartgl"
          onClick={openCartModal}
          className="cartgl"
        ></img>
      </div>

      <div className="category">
        {categoriesWithFilteredProducts.length > 0 ? (
          categoriesWithFilteredProducts.map((category) => (
            <div key={category.id}>
              <p className="category-text">{category.name}</p>
              <div className="products">
                {filteredProducts
                  .filter((product) => product.category === category.name)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="product-item"
                      onClick={() => openProductModal(product)}
                    >
                      <img
                        src={product.photo_url}
                        alt={product.name}
                        className="img-product"
                      />
                      <p className="product-name">{product.name}</p>
                      <div className="ordertext-cart">
                        <p>Под заказ</p>
                        <img src={cart} alt="cart" className="img-cart" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>Нет категорий с подходящими товарами...</p>
        )}
      </div>
      {isProductModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProductModal}
          onAdd={addToCart}
          onRemove={removeFromCart}
          addedItems={cartItems}
        />
      )}
      {isCartModalOpen && (
        <CartModal
          items={cartItems}
          onClose={closeCartModal}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onResetCart={resetCart} // Убедитесь, что эта строка присутствует
        />
      )}
    </div>
  );
}

export default App;
