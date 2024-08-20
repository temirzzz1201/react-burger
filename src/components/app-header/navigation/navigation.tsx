import { NavLink } from "react-router-dom";
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
        ].join(" ")}>
        <NavLink
          to="/"
          className={[
            classes.nav__navigation__block,
            classes.nav__navigation__block_indent,
          ].join(" ")}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <p
                className={`text text_type_main-default pl-2 ${
                  isActive ? "" : "text_color_inactive"
                }`}>
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink
          to="/feed"
          className={[
            classes.nav__navigation__block,
            classes.nav__navigation__block_indent,
          ].join(" ")}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <p
                className={`text text_type_main-default pl-2 ${
                  isActive ? "" : "text_color_inactive"
                }`}>
                Лента заказов
              </p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
