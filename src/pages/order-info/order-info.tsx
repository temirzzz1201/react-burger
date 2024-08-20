import classes from "./order-info.module.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchOrderDetails } from "../../services/actions";
import Header from "../../components/app-header/app-header";
import InfoCart from "../../components/info-cart/info-cart";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient, OrderInfoProps, IWsOrder } from "../../types";
import { statusTranslations, Status } from "../../utils/statusTranslations";

const OrderInfo: React.FC<OrderInfoProps> = ({ isModal }) => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();

  const { order, loading, error } = useAppSelector(
    (state) => state.orderDetails
  );
  const ingredients = useAppSelector((state) => state.ingredient.data);

  const [foundOrder, setFoundOrder] = useState<IWsOrder | null>(null);

  const status: Status = (order?.status as Status) || "Unknown";

  const { label, className } = statusTranslations[status] || {
    label: status,
    className: "",
  };

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderDetails(number));
    }
  }, [dispatch, number]);

  useEffect(() => {
    if (order && order._id) {
      setFoundOrder(order);
    }
  }, [order]);

  if (loading) {
    return <p className="text text_type_main-default mb-3 mt-3">Загрузка...</p>;
  }

  if (error) {
    return <p className="text text_type_main-default mb-3 mt-3">{error}</p>;
  }

  if (!foundOrder) {
    return (
      <p className="text text_type_main-default mb-3 mt-3">Заказ не найден</p>
    );
  }

  const ingredientCounts: Record<string, number> = {};

  foundOrder.ingredients.forEach((id: string) => {
    if (ingredientCounts[id]) {
      ingredientCounts[id]++;
    } else {
      ingredientCounts[id] = 1;
    }
  });

  const orderIngredients = Object.keys(ingredientCounts)
    .map((id) => {
      const ingredient = ingredients.find((ing) => ing._id === id);
      if (ingredient) {
        return { ...ingredient, count: ingredientCounts[id] };
      }
      return null;
    })
    .filter(
      (ingredient): ingredient is IIngredient & { count: number } =>
        ingredient !== null
    );

  const totalPrice = orderIngredients.reduce(
    (sum, ingredient) => sum + ingredient.price * ingredient.count,
    0
  );

  return (
    <>
      {!isModal && <Header />}
      <div className="container">
        <div className={`${classes.info} ${isModal ? classes.info_modal : ""}`}>
          <p
            className={[
              classes.info__order,
              "text text_type_digits-default mb-10",
              isModal ? classes.info__order_modal : "",
            ].join(" ")}>
            #{foundOrder.number}
          </p>
          <p className="text text_type_main-medium truncate_short mb-3">
            {foundOrder.name}
          </p>
          <p className={`text text_type_main-default mb-6 ${className}`}>
            {label}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <div className={classes.info__cart__wrapper}>
            {orderIngredients.map((ingredient) => (
              <div className="mb-4" key={ingredient._id}>
                <InfoCart ingredient={ingredient} count={ingredient.count} />
              </div>
            ))}
          </div>
          <div className={classes.info__count__wrapper}>
            <p className="text text_type_main-default text_color_inactive">
              {new Date(foundOrder.createdAt).toLocaleString()}
            </p>
            <div className={classes.info__count}>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
