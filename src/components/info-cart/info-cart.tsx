import classes from "./info-cart.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { InfoCartProps } from "../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";

const InfoCart: React.FC<InfoCartProps> = ({ ingredient, count }) => {
  return (
    <div className={classes.info}>
      <div className={[classes.info__box, classes.info__box_indent].join(" ")}>
        <LazyLoadImage
          src={ingredient.image}
          alt={ingredient.name}
          effect="blur"
        />
      </div>
      <p
        className={[
          classes.info__title,
          "text text_type_main-default mr-4",
        ].join(" ")}>
        {ingredient.name}
      </p>
      <div className={classes.info__count}>
        <p className="text text_type_digits-default">
          {count} x {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default InfoCart;
