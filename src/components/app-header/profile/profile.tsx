import classes from "./profile.module.scss";
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Audio } from "react-loader-spinner";

function Profile() {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const userName = isLoading ? (
    <Audio color="#8585AD" height={20} width={80} />
  ) : user && user.name ? (
    user.name
  ) : (
    "Личный кабинет"
  );

  return (
    <NavLink to="/profile" className={classes.profile__signin}>
      {({ isActive }) => (
        <>
          <ProfileIcon type={isActive ? "primary" : "secondary"} />
          <div
            className={`text text_type_main-default pl-2 ${
              isActive ? "" : "text_color_inactive"
            }`}>
            {userName}
          </div>
        </>
      )}
    </NavLink>
  );
}

export default Profile;
