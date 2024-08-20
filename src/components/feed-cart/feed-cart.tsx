import classes from "./feed-cart.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { TCreated } from "../../types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IIngredient } from "../../types";
import formatDate from "../../utils/dateHelper";
import { IIngredientImages } from "../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { statusTranslations, Status } from "../../utils/statusTranslations";

const FeedCart = ({ created, order }: TCreated) => {
  const [isMore, setIsMore] = useState(true);

  const status: Status = (order?.status as Status) || "Unknown";

  const { label, className } = statusTranslations[status] || {
    label: status,
    className: "",
  };

  const { data } = useAppSelector((state) => state.ingredient);

  const ingredientImages: IIngredientImages = data.reduce(
    (acc, ingredient: IIngredient) => {
      acc[ingredient._id] = ingredient.image_mobile ?? "";
      return acc;
    },
    {} as IIngredientImages
  );

  const {
    createdAt = "Unknown date",
    ingredients = [],
    name = "Unknown",
    number = 0,
    updatedAt = "Unknown",
    _id = "",
  } = order || {};

  const feedClassName = created
    ? `${classes.feed} ${classes.feed_long}`
    : classes.feed;

  const totalPrice = ingredients.reduce((total, ingredientId) => {
    const ingredient = data.find((item) => item._id === ingredientId);
    return ingredient ? total + (ingredient.price || 0) : total;
  }, 0);

  return (
    <div className={feedClassName}>
      <div className={classes.feed__header}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(createdAt)}
        </p>
      </div>
      {created && created ? (
        <p className={"text text_type_main-medium mb-2 truncate_long"}>
          {name}
        </p>
      ) : (
        <p className="text text_type_main-medium mb-6 truncate_short">{name}</p>
      )}

      {created && (
        <p className={`text text_type_main-default mb-6 ${className}`}>
          {label}
        </p>
      )}
      <div className={classes.feed__main}>
        <div className={classes.feed__images__block}>
          {ingredients.slice(0, 5).map((ingredientId, index) => (
            <div
              key={index}
              className={[classes.feed__box, classes.feed__box_indent].join(
                " "
              )}>
              <LazyLoadImage
                src={ingredientImages[ingredientId]}
                alt={`ingredient-${index}`}
                effect="blur"
              />
            </div>
          ))}
          {ingredients.length > 5 && isMore && (
            <div
              className={[classes.feed__box, classes.feed__box_indent].join(
                " "
              )}>
              <LazyLoadImage
                src={ingredientImages[ingredients[5]]}
                alt="last-ingredient"
                effect="blur"
              />
              <p className={classes.feed__box_more}>
                +{ingredients.length - 5}
              </p>
            </div>
          )}
        </div>
        {isMore && (
          <div className={classes.feed__price__block}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCart;
