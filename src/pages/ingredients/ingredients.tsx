import classes from "./ingredients.module.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Header from "../../components/app-header/app-header";
import { IIngredient } from "../../types";

const Ingredients: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredient = useAppSelector((state) =>
    state.ingredient.data.find((item) => item._id === id)
  ) as IIngredient | undefined;

  return (
    <>
      <Header />
      <div className="container">
        <div className={classes.ingredients}>
          {ingredient && <IngredientDetails product={ingredient} />}
        </div>
      </div>
    </>
  );
};

export default Ingredients;
