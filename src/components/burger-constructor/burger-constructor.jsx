import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./burger-constructor.module.scss";
import ConstructorCart from "../constructor-cart/constructor-cart.jsx";
import { useModal } from "../../hooks/useModal";
import { placeOrder } from "../../services/actions";
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
} from "../../services/burgerConstructor";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ingredients, bun } = useSelector((state) => state.burgerConstructor);
  const { isLoading, error, orderData } = useSelector((state) => state.order);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [localError, setLocalError] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const totalPrice = useMemo(() => {
    return ingredients
      .filter(Boolean)
      .reduce((acc, item) => acc + item.price, bun ? bun.price * 2 : 0);
  }, [ingredients, bun]);

  const handleOrderClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!bun) {
      setLocalError(
        !totalPrice
          ? "Выбирите ингредиенты для заказа"
          : "Невозможно оформить заказ без булки"
      );
      openModal();
    } else {
      setLocalError(null);
      const ingredientIds = [
        bun._id,
        ...ingredients.map((item) => item._id),
        bun._id,
      ];
      dispatch(placeOrder(ingredientIds));
      openModal();
    }
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      if (item.type === "bun") {
        dispatch(addIngredient({ ...item, position: "top" }));
      } else {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className={classes.constructor} ref={dropRef}>
      {bun && (
        <ConstructorCart
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )}
      <div className={classes.constructor__scrollable}>
        {ingredients.map(
          (product, index) =>
            product && (
              <ConstructorCart
                key={product.uniqueId}
                index={index}
                text={product.name}
                price={product.price}
                thumbnail={product.image}
                onRemove={() => dispatch(removeIngredient(product.uniqueId))}
                moveCard={(dragIndex, hoverIndex) =>
                  dispatch(moveIngredient({ dragIndex, hoverIndex }))
                }
              />
            )
        )}
      </div>
      {bun && (
        <ConstructorCart
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )}
      <div className={classes.constructor__result}>
        <div className={classes.constructor__result__total}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOrderClick}
          htmlType="button"
          type="primary"
          size="large"
          disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Оформить заказ"}
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal} classModal="modal__constructor">
          {localError && (
            <p className="text text_type_main-medium">{localError}</p>
          )}
          {error && <p className="text text_type_main-medium">{error}</p>}
          {orderData && <OrderDetails orderNumber={orderData.order.number} />}
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
