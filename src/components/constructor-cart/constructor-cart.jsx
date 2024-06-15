import PropTypes from "prop-types";
import classes from "./constructor-cart.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorCart({ text, price, thumbnail, isLocked, type }) {
  return (
    <div className={classes.cart}>
      {isLocked ? (
        <div className={classes.cart__wrapper}>
          <ConstructorElement
            type={type}
            isLocked={isLocked ? isLocked : false}
            text={text}
            price={price}
            thumbnail={thumbnail}
          />
        </div>
      ) : (
        <div className={classes.cart__wrapper_dragged}>
          <DragIcon type="primary" className={classes.cart__drag} />
          <ConstructorElement text={text} price={price} thumbnail={thumbnail} />
        </div>
      )}
    </div>
  );
}

ConstructorCart.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
  type: PropTypes.oneOf(["top", "bottom"]),
};

export default ConstructorCart;
