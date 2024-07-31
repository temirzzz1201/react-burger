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

const ForgotPassword: React.FC<IForgotPasswordProps> = ({
  onResetPasswordClick,
}) => {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm<IUser>({ email: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.email) {
      console.error("Email обязательное поле");
      return;
    }

    const resultAction = await dispatch(resetPassword(values.email));
    if (resetPassword.fulfilled.match(resultAction)) {
      onResetPasswordClick();
    }
  };

  const { isLoading } = useAppSelector((state) => state.auth);

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
