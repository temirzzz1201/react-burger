import classes from "./reset-password.module.scss";
import { useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setNewPassword } from "../../services/actions";
import { useForm } from "../../hooks/useForm";
import { TailSpin } from "react-loader-spinner";
import { IUser } from "../../types";

const ResetPassword: React.FC = () => {
  const { values, handleChange } = useForm<IUser>({
    code: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fromForgotPassword = useAppSelector(
    (state) => state.passwordRecovery.fromForgotPassword
  );

  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!fromForgotPassword) {
      navigate("/forgot-password");
    }
  }, [fromForgotPassword, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = values.password ?? "";
    const token = values.code ?? "";
    const resultAction = await dispatch(setNewPassword({ password, token }));

    if (setNewPassword.fulfilled.match(resultAction)) {
      navigate("/login");
      localStorage.removeItem("fromForgotPassword");
    }
  };

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
        <div className={classes.reset}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <form className={classes.reset__form} onSubmit={handleSubmit}>
            <PasswordInput
              name="password"
              placeholder={"Введите новый пароль"}
              value={values.password || ""}
              onChange={handleChange}
              extraClass="mb-6"
            />
            <Input
              name="code"
              type={"text"}
              placeholder={"Введите код из письма"}
              value={values.code || ""}
              onChange={handleChange}
              extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </form>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link className={classes.reset__link} to="/login">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
