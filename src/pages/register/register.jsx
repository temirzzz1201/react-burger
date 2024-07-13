import classes from "./register.module.scss";
import { useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/actions";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(register({ name, email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className={classes.register}>
          <p className="text text_type_main-medium mb-6">Регистрация</p>
          <form className={classes.register__form} onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              extraClass="mb-6"
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              extraClass="mb-6"
            />
            <PasswordInput
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              extraClass="mb-6"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={loading}>
              Зарегистрироваться
            </Button>
          </form>
          {error && (
            <p className="text text_type_main-default text_color_error">
              {error}
            </p>
          )}
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
            <Link className={classes.register__link} to="/login">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
