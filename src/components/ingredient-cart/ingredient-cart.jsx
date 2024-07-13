import { productType } from "../../types/productTypes.js";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import classes from "./ingredient-cart.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function IngredientCart({ product }) {
  const ingredientCounts = useSelector(
    (state) => state.burgerConstructor.ingredientCounts
  );

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...product },
  });

  const count = ingredientCounts[product._id] || 0;

  return (
    <div className={classes.cart} ref={dragRef}>
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
  );
}

IngredientCart.propTypes = {
  product: productType.isRequired,
};

export default IngredientCart;
