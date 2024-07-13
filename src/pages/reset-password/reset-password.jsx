import classes from "./reset-password.module.scss";
import { useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../../services/actions";
import { useForm } from "../../hooks/useForm";

function ResetPassword() {
  const { values, handleChange } = useForm({
    code: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fromForgotPassword = useSelector(
    (state) => state.passwordRecovery.fromForgotPassword
  );

  useEffect(() => {
    if (!fromForgotPassword) {
      navigate("/forgot-password");
    }
  }, [fromForgotPassword, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      setNewPassword({ password: values.password, token: values.code })
    );
    if (setNewPassword.fulfilled.match(resultAction)) {
      navigate("/login");
      localStorage.removeItem("fromForgotPassword");
    }
  };

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
              value={values.password}
              onChange={handleChange}
              extraClass="mb-6"
            />
            <Input
              name="code"
              type={"text"}
              placeholder={"Введите код из письма"}
              value={values.code}
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
}

export default ResetPassword;
