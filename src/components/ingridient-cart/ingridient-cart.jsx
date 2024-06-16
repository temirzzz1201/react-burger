import { productType } from "../../types/productTypes";
import classes from "./ingridient-cart.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import { useModal } from "../../castom-hooks/useModal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function IngridientCart({ product }) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const productIdsWithCounter = [
    "643d69a5c3f7b9001cfa093c",
    "643d69a5c3f7b9001cfa0944",
  ];

  return (
    <>
      <div className={classes.cart} onClick={openModal}>
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
          onClose={closeModal}
          title="Детали ингредиента"
          classModal="modal__ingridient">
          <IngredientDetails product={product} />
        </Modal>
      )}
    </>
  );
}

IngridientCart.propTypes = {
  product: productType.isRequired,
};

export default IngridientCart;
