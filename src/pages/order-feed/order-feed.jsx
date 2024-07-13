import classes from "./order-feed.module.scss";
import Header from "../../components/app-header/app-header";

function OrderFeed() {
  return (
    <>
      <Header />
      <div className="container">
        <div className={classes.feed}>
          <p className="text text_type_main-medium mt-5">
            Страница в разработке
          </p>
        </div>
      </div>
    </>
  );
}

export default OrderFeed;
