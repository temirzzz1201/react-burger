import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useMatch,
  PathMatch,
} from "react-router-dom";
import Cookies from "js-cookie";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useEffect, useState } from "react";
import ErrorPage from "../pages/404/404";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Ingredients from "../pages/ingredients/ingredients";
import Login from "../pages/login/login";
import Profile from "../pages/profile/profile";
import Register from "../pages/register/register";
import ResetPassword from "../pages/reset-password/reset-password";
import OrderFeed from "../pages/order-feed/order-feed";
import ProtectedRoute from "./protected-route/protected-route";
import Home from "../pages/home/home";
import OrdersHistory from "../pages/orders-history/orders-history";
import { fetchUserDetails } from "../services/actions";
import Modal from "./modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { fetchIngredients } from "../services/actions";
import { setFromForgotPassword } from "../services/passwordRecovery";
import { IIngredient } from "../types";

const App = () => {
  const dispatch = useAppDispatch();
  let location = useLocation();
  let navigate = useNavigate();
  let state = location.state;

  const match: PathMatch<"id"> | null = useMatch("/ingredients/:id");
  const id = match?.params.id;

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch]);

  const { data: ingredients } = useAppSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const initialIngredient: IIngredient | null = null;

  const [ingredient, setIngredient] = useState<IIngredient | null>(
    initialIngredient
  );

  useEffect(() => {
    if (id && ingredients.length > 0) {
      const foundIngredient = ingredients.find(
        (item: IIngredient) => item._id === id
      );

      setIngredient(foundIngredient || null);
    }
  }, [id, ingredients]);

  const handleCloseModal = () => {
    navigate(state?.backgroundLocation || "/", { replace: true });
  };

  return (
    <>
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
          path="profile/orders-history"
          element={<ProtectedRoute component={<OrdersHistory />} />}
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
        <Route path="order-feed" element={<OrderFeed />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {state?.backgroundLocation && ingredient && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title="Детали ингредиента"
                classModal="modal__ingredient"
                onClose={handleCloseModal}>
                <IngredientDetails product={ingredient} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
