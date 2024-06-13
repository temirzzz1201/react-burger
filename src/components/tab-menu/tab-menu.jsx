import PropTypes from "prop-types";
import { productType } from "../../types/productTypes";
import { useState, useRef, useEffect, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./tab-menu.module.scss";
import BurgerCart from "../burger-cart/burger-cart";

const TabMenu = ({ buns, sauces, main }) => {
  const [current, setCurrent] = useState("buns");
  const sectionsRef = useRef({
    buns: null,
    sauces: null,
    fillings: null,
  });
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const { buns, sauces, fillings } = sectionsRef.current;
    const containerTop = containerRef.current.getBoundingClientRect().top;

    const bunsTop = Math.abs(buns.getBoundingClientRect().top - containerTop);
    const saucesTop = Math.abs(
      sauces.getBoundingClientRect().top - containerTop
    );
    const fillingsTop = Math.abs(
      fillings.getBoundingClientRect().top - containerTop
    );

    if (fillingsTop < saucesTop && fillingsTop < bunsTop) {
      setCurrent("fillings");
    } else if (saucesTop < bunsTop) {
      setCurrent("sauces");
    } else {
      setCurrent("buns");
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (section) => {
    sectionsRef.current[section].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={classes.tab}>
      <div className={classes.tab__menu}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={() => scrollToSection("buns")}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={() => scrollToSection("sauces")}
        >
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={current === "fillings"}
          onClick={() => scrollToSection("fillings")}
        >
          Начинки
        </Tab>
      </div>
      <div ref={containerRef} className={classes.tab__container}>
        <section ref={(el) => (sectionsRef.current.buns = el)}>
          <p className="text text_type_main-medium mb-6">Булки</p>
          <div className={classes.tab__cart__wrapper}>
            {buns &&
              buns.map((bun) => {
                return <BurgerCart key={bun?._id} product={bun} />;
              })}
          </div>
        </section>
        <section ref={(el) => (sectionsRef.current.sauces = el)}>
          <p className="text text_type_main-medium mb-6">Соусы</p>
          <div className={classes.tab__cart__wrapper}>
            {sauces &&
              sauces.map((sauce) => {
                return <BurgerCart key={sauce?._id} product={sauce} />;
              })}
          </div>
        </section>
        <section ref={(el) => (sectionsRef.current.fillings = el)}>
          <p className="text text_type_main-medium mb-6">Начинки</p>
          <div className={classes.tab__cart__wrapper}>
            {main &&
              main.map((filling) => {
                return <BurgerCart key={filling?._id} product={filling} />;
              })}
          </div>
        </section>
      </div>
    </div>
  );
};

TabMenu.propTypes = {
  buns: PropTypes.arrayOf(productType).isRequired,
  sauces: PropTypes.arrayOf(productType).isRequired,
  main: PropTypes.arrayOf(productType).isRequired,
};

export default TabMenu;
