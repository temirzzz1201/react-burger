import classes from "./login.module.scss";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/actions";
import { useForm } from "../../hooks/useForm";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: "", password: "" });
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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
      <Header />
      <div className="container">
        <div className={classes.login}>
          <p className="text text_type_main-medium mb-6">Вход</p>
          <form className={classes.login__form} onSubmit={handleLogin}>
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              value={values.email}
              onChange={handleChange}
              extraClass="mb-6"
            />
            <PasswordInput
              name="password"
              placeholder="Пароль"
              value={values.password}
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
              {error.message ||
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
}

export default Login;
