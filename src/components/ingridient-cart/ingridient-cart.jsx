import PropTypes from "prop-types";
import classes from "./ingridient-cart.module.scss";
import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function IngridientCart({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productIdsWithCounter = [
    "643d69a5c3f7b9001cfa093c",
    "643d69a5c3f7b9001cfa0944",
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={classes.cart} onClick={handleOpenModal}>
        {productIdsWithCounter.includes(product._id) && (
          <Counter count={1} size="default" extraClass="m-1" />
        )}
        <LazyLoadImage
          className={classes.cart__img}
          src={product?.image}
          alt={product?.name}
          effect="blur"
        />
        <div className={classes.cart__price}>
          <p className="text text_type_digits-default">{product?.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={classes.cart__description}>
          <p className="text text_type_main-default">{product?.name}</p>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          title="Детали ингредиента"
          classModal="modal__ingridient">
          <IngredientDetails product={product} />
        </Modal>
      )}
    </>
  );
}

IngridientCart.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

export default IngridientCart;
