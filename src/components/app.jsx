import "../assets/styles/style.scss";
import { url } from "../utils/constants";
import { useEffect, useState } from "react";
import AppHeader from "./app-header/app-header.jsx";
import BurgerIngredients from "./burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "./burger-constructor/burger-constructor.jsx";
import axios from "axios";

function App() {
  const [buns, setBuns] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [main, setMain] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios(url);
        const response = request.data.success ? request.data.data : [];

        const bunsArray = response?.filter((v) => v.type === "bun");
        const sauceArray = response?.filter((v) => v.type === "sauce");
        const mainArray = response?.filter((v) => v.type === "main");

        const filteredDragCardArray = response?.filter(
          (v) => v._id !== "643d69a5c3f7b9001cfa093c"
        );

        setBuns(bunsArray);
        setSauces(sauceArray);
        setMain(mainArray);
        setAllProducts(filteredDragCardArray);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <AppHeader />
      <main className="main">
        <div className="container">
          <p className="text text_type_main-large mt-10 mb-5 pl-5 pr-5">
            Соберите бургер
          </p>
          <div className="main__content">
            <BurgerIngredients buns={buns} sauces={sauces} main={main} />
            <BurgerConstructor allProducts={allProducts} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
