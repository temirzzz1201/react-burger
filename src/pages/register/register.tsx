import classes from "./register.module.scss";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { register } from "../../services/actions";
import { useForm } from "../../hooks/useForm";
import { IUser } from "../../types";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
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
              name="name"
              placeholder="Имя"
              value={values.name || ""}
              onChange={handleChange}
              extraClass="mb-6"
            />
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
              Зарегистрироваться
            </Button>
          </form>
          {error && (
            <p className={classes.login__error}>
              {typeof error === "string"
                ? error
                : error.message ||
                  "Ошибка регистрации. Проверьте ваши данные и попробуйте снова."}
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
};

export default Register;
