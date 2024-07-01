import "../assets/styles/style.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../services/actions";
import AppHeader from "./app-header/app-header.jsx";
import BurgerIngredients from "./burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "./burger-constructor/burger-constructor.jsx";
import { TailSpin } from "react-loader-spinner";

function App() {
  const dispatch = useDispatch();
  const {
    data: ingredients,
    isLoading,
    error,
  } = useSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const buns = useMemo(() => {
    return ingredients.filter((v) => v.type === "bun");
  }, [ingredients]);

  const sauces = useMemo(() => {
    return ingredients.filter((v) => v.type === "sauce");
  }, [ingredients]);

  const main = useMemo(() => {
    return ingredients.filter((v) => v.type === "main");
  }, [ingredients]);

  if (isLoading) {
    return (
      <div className="spiner__wrapper">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <AppHeader />
        <main className="main">
          <div className="container">
            <p className="text text_type_main-large mt-10 mb-5 pl-5 pr-5">
              Соберите бургер
            </p>
            <div className="main__content">
              <BurgerIngredients buns={buns} sauces={sauces} main={main} />
              <BurgerConstructor />
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
