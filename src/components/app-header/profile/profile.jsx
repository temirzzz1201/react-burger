import classes from "./profile.module.scss";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  return (
    <button className={classes.profile__signin}>
      <ProfileIcon type="secondary" />
      <p className="text text_type_main-default text_color_inactive pl-2">
        Личный кабинет
      </p>
    </button>
  );
}

export default Profile;
