import React, { useMemo, useState } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import classes from "./burger-constructor.module.scss";
import ConstructorCart from "../constructor-cart/constructor-cart";
import { useModal } from "../../hooks/useModal";
import { placeOrder } from "../../services/actions";
import { TailSpin } from "react-loader-spinner";
import { clearIngredients } from "../../services/burgerConstructor";
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
import { IIngredient } from "../../types";
import DummyBun from "../../dummy-bun/dummy-bun";

interface IBurgerConstructorState {
  ingredients: IIngredient[];
  bun: IIngredient | null;
}

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { ingredients, bun } = useAppSelector(
    (state) => state.burgerConstructor
  ) as IBurgerConstructorState;
  const { isLoading, error, orderData } = useAppSelector(
    (state) => state.order
  );
  const { isModalOpen, openModal, closeModal } = useModal();
  const [localError, setLocalError] = useState<string | null>(null);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const { user } = useAppSelector((state) => state.auth);

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
          ? "Выберите ингредиенты для заказа"
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

      dispatch(placeOrder({ ingredients: ingredientIds }));
      openModal();

      dispatch(clearIngredients());
    }
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item: IIngredient & { position?: string }) => {
      if (item.type === "bun") {
        dispatch(addIngredient({ ...item, position: "top" }));
      } else {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className={classes.construct} ref={dropRef}>
      {bun || ingredients.length > 0 ? (
        <>
          {bun && (
            <ConstructorCart
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image || ""}
              index={0}
            />
          )}
          <div className={classes.construct__scrollable}>
            {ingredients.map(
              (product, index) =>
                product && (
                  <ConstructorCart
                    key={product.uniqueId}
                    index={index}
                    text={product.name}
                    price={product.price}
                    thumbnail={product.image}
                    onRemove={() =>
                      dispatch(removeIngredient(product.uniqueId || ""))
                    }
                    moveCard={(dragIndex: number, hoverIndex: number) =>
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
              index={0}
            />
          )}
        </>
      ) : (
        <DummyBun />
      )}

      <div className={classes.construct__result}>
        <div className={classes.construct__result__total}>
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

          {isLoading && (
            <div className={classes.construct__user}>
              <p className="text text_type_main-medium mt-5 mb-8">
                {`Размещаем заказ пользователя ${user?.name?.toUpperCase()}`}
                <br />
                {`пожалуйста подождите...`}
              </p>
              <div className="spiner__wrapper spiner__wrapper_modal">
                <TailSpin color="#00BFFF" height={80} width={80} />
              </div>
            </div>
          )}

          {error && <p className="text text_type_main-medium">{error}</p>}
          {orderData && <OrderDetails orderNumber={orderData.order.number} />}
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
