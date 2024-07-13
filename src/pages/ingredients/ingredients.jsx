import classes from "./ingredients.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Header from "../../components/app-header/app-header";

function Ingredients() {
  const { id } = useParams();
  const ingredient = useSelector((state) =>
    state.ingredient.data.find((item) => item._id === id)
  );

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
}

export default Ingredients;
