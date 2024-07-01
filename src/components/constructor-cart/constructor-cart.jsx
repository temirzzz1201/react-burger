import PropTypes from "prop-types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import classes from "./constructor-cart.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorCart({
  text,
  price,
  thumbnail,
  isLocked,
  type,
  onRemove,
  index,
  moveCard,
}) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "constructor-cart",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (!moveCard) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor-cart",
    item: { index, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${classes.cart} ${isDragging ? classes.dragging : ""}`}>
      {isLocked ? (
        <div className={classes.cart__wrapper}>
          <ConstructorElement
            type={type}
            isLocked={isLocked ? isLocked : false}
            text={text}
            price={price}
            thumbnail={thumbnail}
          />
        </div>
      ) : (
        <div className={classes.cart__wrapper_dragged}>
          <DragIcon type="primary" className={classes.cart__drag} />
          <ConstructorElement
            text={text}
            price={price}
            thumbnail={thumbnail}
            handleClose={onRemove}
          />
        </div>
      )}
    </div>
  );
}

ConstructorCart.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
  type: PropTypes.oneOf(["top", "bottom"]),
  onRemove: PropTypes.func,
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

export default ConstructorCart;
