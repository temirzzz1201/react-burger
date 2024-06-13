import classes from "./navigation.module.scss";
import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Navigation() {
  return (
    <nav className={classes.nav}>
      <div
        className={[
          classes.nav__navigation,
          classes.nav__navigation_indent,
        ].join(" ")}
      >
        <button
          className={[
            classes.nav__navigation__block,
            classes.nav__navigation__block_indent,
          ].join(" ")}
        >
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </button>
        <button
          className={[
            classes.nav__navigation__block,
            classes.nav__navigation__block_active,
          ].join(" ")}
        >
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">
            Лента заказов
          </p>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
