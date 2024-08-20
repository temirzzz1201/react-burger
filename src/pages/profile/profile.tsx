import { useState, useEffect } from "react";
import classes from "./profile.module.scss";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { updateUser } from "../../services/actions";
import { TailSpin } from "react-loader-spinner";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import { useForm } from "../../hooks/useForm";
import { IUser } from "../../types";

const Profile: React.FC = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm<IUser>({
    name: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setValues({ name: user.name, email: user.email, password: "" });
    } else {
      navigate("/login");
    }
  }, [user, navigate, setValues]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: values.name || "",
        email: values.email || "",
        password: values.password || "",
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setValues({ name: user.name, email: user.email, password: "" });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="spiner__wrapper">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text text_type_main-default text_color_error">
        Error: {typeof error === "string" ? error : error.message}
      </p>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className={classes.profile}>
          <ProfileNavigation isProfilePage />
          <form onSubmit={handleSave}>
            <Input
              type={"text"}
              name="name"
              placeholder={"Имя"}
              value={values.name || ""}
              onChange={handleChange}
              icon={"EditIcon"}
              extraClass="mb-6"
            />
            <Input
              type={"email"}
              name="email"
              placeholder={"Логин"}
              value={values.email || ""}
              onChange={handleChange}
              icon={"EditIcon"}
              extraClass="mb-6"
            />
            <PasswordInput
              name="password"
              placeholder={"Пароль"}
              value={values.password || ""}
              onChange={handleChange}
              icon="EditIcon"
            />
            <div className={classes.profile__buttons}>
              {isEditing ? (
                <div>
                  <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={handleCancel}>
                    Отмена
                  </Button>
                  <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                  </Button>
                </div>
              ) : (
                <Button
                  htmlType="button"
                  type="primary"
                  size="medium"
                  onClick={() => setIsEditing(true)}>
                  Редактировать
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
