import PropTypes from "prop-types";
import { productType } from "../../types/productTypes";
import classes from "./burger-constructor.module.scss";
import ConstructorCart from "../constructor-cart/constructor-cart.jsx";
import { useModal } from "../../castom-hooks/useModal";
import dragcart5 from "../../assets/images/dragcart5.png";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

function BurgerConstructor({ allProducts }) {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={classes.constructor}>
      <ConstructorCart
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={20}
        thumbnail={dragcart5}
      />
      <div className={classes.constructor__scrollable}>
        {allProducts &&
          allProducts.map((product) => {
            return (
              <ConstructorCart
                key={product?._id}
                text={product?.name}
                price={product?.price}
                thumbnail={product?.image}
              />
            );
          })}
      </div>
      <ConstructorCart
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={20}
        thumbnail={dragcart5}
      />
      <div className={classes.constructor__result}>
        <div className={classes.constructor__result__total}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={openModal}
          htmlType="button"
          type="primary"
          size="large">
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal} classModal="modal__constructor">
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

BurgerConstructor.propTypes = {
  allProducts: PropTypes.arrayOf(productType).isRequired,
};

export default BurgerConstructor;
