import "../../assets/styles/style.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMemo } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { TailSpin } from "react-loader-spinner";

const Home: React.FC = () => {
  const {
    data: ingredients,
    isLoading,
    error,
  } = useAppSelector((state) => state.ingredient);

  const buns = useMemo(
    () => ingredients.filter((v) => v.type === "bun"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((v) => v.type === "sauce"),
    [ingredients]
  );
  const main = useMemo(
    () => ingredients.filter((v) => v.type === "main"),
    [ingredients]
  );

  if (isLoading) {
    return (
      <div className="spiner__wrapper">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text text_type_main-medium mt-5">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <AppHeader />
          <main className="main">
            <div className="container">
              <p className="text text_type_main-large mt-10 mb-5">
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
    </>
  );
};

export default Home;
