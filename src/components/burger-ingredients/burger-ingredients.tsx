import React, { useState, useRef, useEffect, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./burger-ingredients.module.scss";
import IngridientCart from "../ingredient-cart/ingredient-cart";
import { Link, useLocation } from "react-router-dom";
import { IBurgerIngredientsProps } from "../../types";

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({
  buns,
  sauces,
  main,
}) => {
  const [current, setCurrent] = useState<"buns" | "sauces" | "fillings">(
    "buns"
  );
  const sectionsRef = useRef<{
    buns: HTMLDivElement | null;
    sauces: HTMLDivElement | null;
    fillings: HTMLDivElement | null;
  }>({
    buns: null,
    sauces: null,
    fillings: null,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();

  const handleScroll = useCallback(() => {
    const { buns, sauces, fillings } = sectionsRef.current;
    const containerTop = containerRef.current!.getBoundingClientRect().top;

    const bunsTop = Math.abs(buns!.getBoundingClientRect().top - containerTop);
    const saucesTop = Math.abs(
      sauces!.getBoundingClientRect().top - containerTop
    );
    const fillingsTop = Math.abs(
      fillings!.getBoundingClientRect().top - containerTop
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
    const container = containerRef.current!;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (section: "buns" | "sauces" | "fillings") => {
    sectionsRef.current[section]!.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={classes.burger}>
      <div className={classes.burger__menu}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={() => scrollToSection("buns")}>
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={() => scrollToSection("sauces")}>
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={current === "fillings"}
          onClick={() => scrollToSection("fillings")}>
          Начинки
        </Tab>
      </div>
      <div ref={containerRef} className={classes.burger__container}>
        <section
          ref={(el) => (sectionsRef.current.buns = el as HTMLDivElement)}>
          <p className="text text_type_main-medium mb-6">Булки</p>
          <div className={classes.burger__cart__wrapper}>
            {buns &&
              buns.map((bun) => (
                <Link
                  key={bun._id}
                  to={`/ingredients/${bun._id}`}
                  state={{ backgroundLocation: location }}>
                  <IngridientCart product={bun} />
                </Link>
              ))}
          </div>
        </section>
        <section
          ref={(el) => (sectionsRef.current.sauces = el as HTMLDivElement)}>
          <p className="text text_type_main-medium mb-6">Соусы</p>
          <div className={classes.burger__cart__wrapper}>
            {sauces &&
              sauces.map((sauce) => (
                <Link
                  key={sauce._id}
                  to={`/ingredients/${sauce._id}`}
                  state={{ backgroundLocation: location }}>
                  <IngridientCart product={sauce} />
                </Link>
              ))}
          </div>
        </section>
        <section
          ref={(el) => (sectionsRef.current.fillings = el as HTMLDivElement)}>
          <p className="text text_type_main-medium mb-6">Начинки</p>
          <div className={classes.burger__cart__wrapper}>
            {main &&
              main.map((filling) => (
                <Link
                  key={filling._id}
                  to={`/ingredients/${filling._id}`}
                  state={{ backgroundLocation: location }}>
                  <IngridientCart product={filling} />
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BurgerIngredients;
