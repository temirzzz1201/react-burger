import { Link } from "react-router-dom";
import classes from "./app-header.module.scss";
import Navigation from "./navigation/navigation";
import Profile from "./profile/profile";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.header__container}>
        <Navigation />
        <Link to="/">
          <Logo />
        </Link>
        <Profile />
      </div>
    </header>
  );
}

export default Header;
