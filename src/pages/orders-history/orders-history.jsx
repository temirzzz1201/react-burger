import classes from "./orders-history.module.scss";
import Header from "../../components/app-header/app-header";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";

function OrdersHistory() {
  return (
    <>
      <Header />
      <div className="container">
        <div className={classes.history}>
          <ProfileNavigation />
          <p className="text text_type_main-medium mt-5">
            Страница в разработке
          </p>
        </div>
      </div>
    </>
  );
}

export default OrdersHistory;
