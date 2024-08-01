import classes from "./forgot-password.module.scss";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { resetPassword } from "../../services/actions";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "../../hooks/useForm";
import { IForgotPasswordProps, IUser } from "../../types";
import { useState } from "react";

const ForgotPassword: React.FC<IForgotPasswordProps> = ({
  onResetPasswordClick,
}) => {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm<IUser>({ email: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.email) {
      setError("Email обязательное поле");
      return;
    }

    try {
      const resultAction = await dispatch(resetPassword(values.email));
      if (resetPassword.fulfilled.match(resultAction)) {
        onResetPasswordClick();
      }
    } catch (err) {
      setError("Произошла ошибка. Пожалуйста, попробуйте снова.");
    }
  };

  const isLoading = useAppSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return (
      <div className="spiner__wrapper">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className={classes.forgot}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <form className={classes.forgot__form} onSubmit={handleSubmit}>
            <Input
              type={"email"}
              name="email"
              placeholder={"Укажите e-mail"}
              value={values.email || ""}
              onChange={handleChange}
              extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </form>
          {error && <p className={classes.forgot__error}>{error}</p>}
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link className={classes.forgot__link} to="/login">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
