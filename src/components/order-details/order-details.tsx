import classes from "./order-details.module.scss";
import Done from "../../assets/images/done.svg";
import { IOrderDetailsProps } from "../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";

const OrderDetails: React.FC<IOrderDetailsProps> = ({
  orderNumber,
  dataTestId,
}) => {
  return (
    <div className={classes.detail} data-test={dataTestId}>
      <p className="text text_type_digits-large mb-8 mt-2">{orderNumber}</p>
      <p className="text text_type_main-default mb-15">идентификатор заказа</p>
      <div className="mb-15">
        <LazyLoadImage src={Done} alt="done" effect="blur" />
      </div>
      <p className="text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
