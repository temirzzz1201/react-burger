import classes from "./profile-navigation.module.scss";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../services/actions";
import { IProfileNavigation } from "../../types";

const ProfileNavigation: React.FC<IProfileNavigation> = ({ isProfilePage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={classes.navigation}>
      <NavLink to="/profile" end>
        {({ isActive }) => (
          <p
            className={`text text_type_main-medium ${
              isActive ? "" : "text_color_inactive"
            }`}>
            Профиль
          </p>
        )}
      </NavLink>

      <NavLink to="/profile/orders-history">
        {({ isActive }) => (
          <p
            className={`text text_type_main-medium ${
              isActive ? "" : "text_color_inactive"
            }`}>
            История заказов
          </p>
        )}
      </NavLink>

      <p
        className="text text_type_main-medium text_color_inactive mb-20"
        onClick={handleLogout}>
        Выход
      </p>
      {isProfilePage ? (
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете <br /> изменить свои персональные данные{" "}
        </p>
      ) : null}
    </div>
  );
};

export default ProfileNavigation;
