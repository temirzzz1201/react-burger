import PropTypes from "prop-types";
import classes from "./burger-cart.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCart({ product }) {
  return (
    <div className={classes.cart}>
      {product?.quantity && (
        <Counter count={product?.quantity} size="default" extraClass="m-1" />
      )}
      <img
        className={classes.cart__img}
        src={product?.image}
        alt={product?.name}
      />
      <div className={classes.cart__price}>
        <p className="text text_type_digits-default">{product?.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={classes.cart__description}>
        <p className="text text_type_main-default">{product?.name}</p>
      </div>
    </div>
  );
}

BurgerCart.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

export default BurgerCart;
