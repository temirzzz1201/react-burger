import classes from "./feed.module.scss";
import FeedCart from "../../components/feed-cart/feed-cart";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { connectFeedTable, disconnectFeedTable } from "../../services/actions";
import { TailSpin } from "react-loader-spinner";

const Feed: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { feedOrders } = useAppSelector((store) => store.feedWebsocket);

  const wsFeedUrlWithToken = (): string => {
    return `wss://norma.nomoreparties.space/orders/all`;
  };

  useEffect(() => {
    dispatch(connectFeedTable(wsFeedUrlWithToken()));

    return () => {
      dispatch(disconnectFeedTable());
    };
  }, [dispatch]);

  if (!feedOrders || !feedOrders.orders) {
    return (
      <div className="spiner__wrapper">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  const splitIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const doneOrders = splitIntoChunks(
    feedOrders.orders.filter((order) => order.status === "done"),
    10
  );

  const inWorkOrders = splitIntoChunks(
    feedOrders.orders.filter((order) => order.status === "pending"),
    10
  );

  return (
    <>
      <div className="container">
        <div className={classes.feed}>
          <p className="text text_type_main-large mb-5">Лента заказов</p>
        </div>
        <div className={classes.feed__wrapper}>
          <div className={classes.feed__carts}>
            {feedOrders.orders.length > 0 ? (
              feedOrders.orders.map((item) => (
                <Link
                  className="mb-4"
                  key={item.number}
                  to={`/feed/${item.number}`}
                  state={{ backgroundLocation: location }}>
                  <FeedCart order={item} />
                </Link>
              ))
            ) : (
              <p>Заказов пока нет!</p>
            )}
          </div>
          <div className={classes.feed__stats}>
            <div className={classes.feed__stats__stats}>
              <div className={classes.feed__stats__done}>
                <p className="text text_type_main-medium mb-6">Готовы:</p>
                <div className={classes.feed__stats__scrollable}>
                  {doneOrders.map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      className={[
                        classes.feed__stats__items,
                        classes.feed__stats__items_green,
                        "mb-5",
                      ].join(" ")}>
                      {column.map((order) => (
                        <p
                          key={order._id}
                          className="text text_type_digits-default mb-2">
                          {order.number}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.feed__stats__inwork}>
                <p className="text text_type_main-medium mb-6">В работе:</p>
                <div className={classes.feed__stats__scrollable}>
                  {inWorkOrders.map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      className={[classes.feed__stats__items, "mb-5"].join(
                        " "
                      )}>
                      {column.map((order) => (
                        <p
                          key={order._id}
                          className="text text_type_digits-default mb-2">
                          {order.number}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={classes.feed__stats__total}>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p className="text text_type_digits-large">{feedOrders.total}</p>
            </div>
            <div className={classes.feed__stats__total}>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p className="text text_type_digits-large">
                {feedOrders.totalToday}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
