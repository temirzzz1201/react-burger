import classes from "./ingredient-details.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IIngredientProps } from "../../types/index.js";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

const IngredientDetails: React.FC<IIngredientProps> = () => {
  const { id } = useParams<{ id: string }>();

  const ingredients = useAppSelector((state) => state.ingredient.data);

  const ingredient =
    ingredients.length > 0
      ? ingredients.find((item) => item._id === id)
      : undefined;

  const isLoading = useAppSelector((state) => state.ingredient.isLoading);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={classes.detail}>
      <div className={classes.detail__img__wrapper}>
        <LazyLoadImage
          className={classes.detail__img}
          src={ingredient?.image_large}
          alt={ingredient?.image_large}
          effect="blur"
        />
        <div className={classes.detail__title}>
          <p className="text text_type_main-medium mt-4 mb-8">
            {ingredient?.name}
          </p>
        </div>
        <div className={classes.detail__info}>
          <div className={classes.detail__info__item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Калории,калл
            </p>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {ingredient?.calories}
            </span>
          </div>
          <div className={classes.detail__info__item}>
            <p className="text text_type_main-default text_color_inactive  mb-2">
              Белки, г
            </p>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {ingredient?.proteins}
            </span>
          </div>
          <div className={classes.detail__info__item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Жиры, г
            </p>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {ingredient?.fat}
            </span>
          </div>
          <div className={classes.detail__info__item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Углеводы, г
            </p>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {ingredient?.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
