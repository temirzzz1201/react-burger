import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect } from "react";
import ErrorPage from "../pages/404/404";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Ingredients from "../pages/ingredients/ingredients";
import Login from "../pages/login/login";
import Profile from "../pages/profile/profile";
import Register from "../pages/register/register";
import ResetPassword from "../pages/reset-password/reset-password";
import Feed from "../pages/feed/feed";
import ProtectedRoute from "./protected-route/protected-route";
import Home from "../pages/home/home";
import Orders from "../pages/orders/orders";
import OrderInfo from "../pages/order-info/order-info";
import { fetchUserDetails } from "../services/actions";
import Modal from "./modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { fetchIngredients } from "../services/actions";
import { setFromForgotPassword } from "../services/passwordRecovery";
import Header from "./app-header/app-header";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(state?.backgroundLocation || "/", { replace: true });
  };

  return (
    <>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
        <Route index element={<Home />} />
        <Route path="ingredients/:id" element={<Ingredients />} />
        <Route path="home" element={<Home />} />
        <Route
          path="login"
          element={<ProtectedRoute onlyUnAuth={true} component={<Login />} />}
        />
        <Route
          path="register"
          element={
            <ProtectedRoute onlyUnAuth={true} component={<Register />} />
          }
        />
        <Route
          path="profile"
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path="profile/orders"
          element={<ProtectedRoute component={<Orders />} />}
        />
        <Route
          path="reset-password"
          element={
            <ProtectedRoute onlyUnAuth={true} component={<ResetPassword />} />
          }
        />
        <Route
          path="forgot-password"
          element={
            <ProtectedRoute
              onlyUnAuth={true}
              component={
                <ForgotPassword
                  onResetPasswordClick={() => {
                    dispatch(setFromForgotPassword(true));
                    navigate("/reset-password");
                  }}
                />
              }
            />
          }
        />
        <Route path="feed" element={<Feed />} />
        <Route
          path="feed/:number"
          element={<ProtectedRoute component={<OrderInfo />} />}
        />
        <Route
          path="profile/orders/:number"
          element={<ProtectedRoute component={<OrderInfo />} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title="Детали ингредиента"
                classModal="modal__ingredient"
                onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal
                title=""
                classModal="modal__order"
                onClose={handleCloseModal}>
                <OrderInfo isModal />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal
                title=""
                classModal="modal__feed"
                onClose={handleCloseModal}>
                <OrderInfo isModal />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
