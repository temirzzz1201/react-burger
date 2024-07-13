import classes from "./profile.module.scss";
import { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/actions";
import { TailSpin } from "react-loader-spinner";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";

function Profile() {
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, password }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    setPassword("");
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
    return <div>Error: {error}</div>;
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
              placeholder={"Имя"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={"EditIcon"}
              extraClass="mb-6"
            />
            <Input
              type={"email"}
              placeholder={"Логин"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={"EditIcon"}
              extraClass="mb-6"
            />
            <PasswordInput
              placeholder={"Пароль"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="EditIcon"
            />
            <div className={classes.profile__buttons}>
              {isEditing && (
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
              )}
              {!isEditing && (
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
}

export default Profile;
