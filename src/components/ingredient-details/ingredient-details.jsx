import { productType } from "../../types/productTypes";
import classes from "./ingredient-details.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function IngredientDetails({ product }) {
  if (!product) {
    return <p className="text text_type_main-medium">Продукт не найден</p>;
  }

  return (
    <div className={classes.detail}>
      <div className={classes.detail__img__wrapper}>
        <LazyLoadImage
          className={classes.detail__img}
          src={product?.image_large}
          alt={product?.image_large}
          effect="blur"
        />
        <div className={classes.detail__title}>
          <p className="text text_type_main-medium mt-4 mb-8">
            {product?.name}
          </p>
        </div>
        <div className={classes.detail__info}>
          <div className={classes.detail__info__item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Калории,калл
            </p>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {product.calories}
            </span>
          </div>
          <div className={classes.detail__info__item}>
            <p className="text text_type_main-default text_color_inactive  mb-2">
              Белки, г
            </p>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {product.proteins}
            </span>
          </div>
          <div className={classes.detail__info__item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Жиры, г
            </p>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {product.fat}
            </span>
          </div>
          <div className={classes.detail__info__item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Углеводы, г
            </p>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {product.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  product: productType.isRequired,
};

export default IngredientDetails;
