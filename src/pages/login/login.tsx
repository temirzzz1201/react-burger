import React from "react";
import classes from "./login.module.scss";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useForm } from "../../hooks/useForm";
import { IUser } from "../../types";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm<IUser>({
    email: "",
    password: "",
  });
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (!values.password) {
        console.error("Password is required");
        return;
      }
      const result = await dispatch(
        login({ email: values.email, password: values.password })
      );
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className={classes.login}>
          <p className="text text_type_main-medium mb-6">Вход</p>
          <form className={classes.login__form} onSubmit={handleLogin}>
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              value={values.email || ""}
              onChange={handleChange}
              extraClass="mb-6"
            />
            <PasswordInput
              name="password"
              placeholder="Пароль"
              value={values.password || ""}
              onChange={handleChange}
              extraClass="mb-6"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={isLoading}>
              Войти
            </Button>
          </form>
          {error && (
            <p className={classes.login__error}>
              {typeof error === "string"
                ? error
                : error.message ||
                  "Ошибка входа. Проверьте ваши данные и попробуйте снова."}
            </p>
          )}
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
            <Link className={classes.login__link} to="/register">
              {" "}
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{" "}
            <Link className={classes.login__link} to="/forgot-password">
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
