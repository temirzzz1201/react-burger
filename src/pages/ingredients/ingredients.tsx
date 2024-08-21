import classes from "./ingredients.module.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const Ingredients: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredients = useAppSelector((state) => state.ingredient.data);

  const ingredient =
    ingredients.length > 0
      ? ingredients.find((item) => item._id === id)
      : undefined;

  console.log("ingredient ", ingredient);

  const isLoading = useAppSelector((state) => state.ingredient.isLoading);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <div className="container">
        <div className={classes.ingredients}>
          {ingredient && <IngredientDetails />}
        </div>
      </div>
    </>
  );
};

export default Ingredients;
