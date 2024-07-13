import PropTypes from "prop-types";
import classes from "./forgot-password.module.scss";
import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../../components/app-header/app-header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions";
import { TailSpin } from "react-loader-spinner";

function ForgotPassword({ onResetPasswordClick }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(resetPassword(email));
    if (resetPassword.fulfilled.match(resultAction)) {
      onResetPasswordClick();
    }
  };

  const { isLoading, error } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="spiner__wrapper">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text text_type_main-medium mt-5">Error: {error}</p>
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
              placeholder={"Укажите e-mail"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </form>
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
}

ForgotPassword.propTypes = {
  onResetPasswordClick: PropTypes.func,
};

export default ForgotPassword;
