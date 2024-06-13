import PropTypes from "prop-types";
import { productType } from "../../types/productTypes";
import classes from "./dragbox.module.scss";
import DragCart from "../drag-cart/drag-cart";
import dragcart5 from "../../assets/images/dragcart5.png";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Dragbox({ allProducts }) {
  return (
    <div className={classes.dragbox}>
      <DragCart
        type="top"
        isLocked={true}
        text="Краторная булка N-200i"
        price={20}
        thumbnail={dragcart5}
      />
      <div className={classes.dragbox__scrollable}>
        {allProducts &&
          allProducts.map((product) => {
            return (
              <DragCart
                key={product?._id}
                text={product?.name}
                price={product?.price}
                thumbnail={product?.image}
              />
            );
          })}
      </div>
      <DragCart
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i"
        price={20}
        thumbnail={dragcart5}
      />

      <div className={classes.dragbox__result}>
        <div className={classes.dragbox__result__total}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

Dragbox.propTypes = {
  allProducts: PropTypes.arrayOf(productType).isRequired,
};

export default Dragbox;
