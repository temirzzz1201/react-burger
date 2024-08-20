import classes from "./orders.module.scss";
import Header from "../../components/app-header/app-header";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { connectLiveOrder, disconnectLiveOrder } from "../../services/actions";
import { Link, useLocation } from "react-router-dom";
import FeedCart from "../../components/feed-cart/feed-cart";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orders } = useAppSelector((store) => store.ordersWebsocket);

  const wsOrderUrlWithToken = () => {
    const fullToken = Cookies.get("accessToken") || "";
    const token = fullToken.replace(/^Bearer\s/, "");
    return `wss://norma.nomoreparties.space/orders?token=${token}`;
  };

  useEffect(() => {
    dispatch(connectLiveOrder(wsOrderUrlWithToken()));

    return () => {
      dispatch(disconnectLiveOrder());
    };
  }, [dispatch]);

  if (!orders || !orders.orders) {
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
        <div className={classes.orders}>
          <ProfileNavigation />
          <div className={classes.orders__carts}>
            {orders.orders.length > 0 ? (
              orders.orders.map((item) => (
                <Link
                  className="mb-4"
                  key={item._id}
                  to={`/profile/orders/${item.number}`}
                  state={{ backgroundLocation: location }}>
                  <FeedCart created={true} order={item} />
                </Link>
              ))
            ) : (
              <p>Заказов пока нет!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
