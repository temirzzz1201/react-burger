import { productType } from "../../types/productTypes";
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import classes from "./ingridient-cart.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { openModal, closeModal } from "../../services/ingredientDetails";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function IngridientCart({ product }) {
  const dispatch = useDispatch();
  const ingredientCounts = useSelector(
    (state) => state.burgerConstructor.ingredientCounts
  );
  const modalProduct = useSelector((state) => state.ingridientsModal.data);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...product },
  });

  const count = ingredientCounts[product._id] || 0;

  const handleOpenModal = () => {
    if (!modalProduct || modalProduct._id !== product._id) {
      dispatch(openModal(product));
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <div className={classes.cart} onClick={handleOpenModal} ref={dragRef}>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
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

      {modalProduct && modalProduct._id === product._id && (
        <Modal
          onClose={handleCloseModal}
          title="Детали ингредиента"
          classModal="modal__ingridient">
          <IngredientDetails product={modalProduct} />
        </Modal>
      )}
    </>
  );
}

IngridientCart.propTypes = {
  product: productType.isRequired,
};

export default IngridientCart;
