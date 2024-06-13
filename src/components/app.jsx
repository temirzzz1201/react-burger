import "../assets/styles/style.scss";
import { useEffect, useState } from "react";
import Header from "./header/header.jsx";
import TabMenu from "./tab-menu/tab-menu.jsx";
import Dragbox from "./dragbox/dragbox.jsx";
import { data } from "../utils/data.js";

function App() {
  const [buns, setBun] = useState([]);
  const [sauces, setSauce] = useState([]);
  const [main, setMain] = useState([]);
  const [allProducts, setAllProducts] = useState(data);

  useEffect(() => {
    const bunsArray = data.filter((v) => v.type === "bun");
    const sauceArray = data.filter((v) => v.type === "sauce");
    const mainArray = data.filter((v) => v.type === "main");

    setBun(bunsArray);
    setSauce(sauceArray);
    setMain(mainArray);
    setAllProducts(data);
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container">
          <p className="text text_type_main-large mt-10 mb-5 pl-5 pr-5">
            Соберите бургер
          </p>
          <div className="main__content">
            <TabMenu buns={buns} sauces={sauces} main={main} />
            <Dragbox allProducts={allProducts} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
