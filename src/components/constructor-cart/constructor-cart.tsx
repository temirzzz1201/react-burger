import React, { useRef } from "react";
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";
import classes from "./constructor-cart.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IConstructorCartProps, IDragItem } from "../../types";

const ConstructorCart: React.FC<IConstructorCartProps> = ({
  text,
  price,
  thumbnail,
  isLocked,
  type,
  onRemove,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: "constructor-cart",
    hover(item: unknown, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      if (!moveCard) return;
      const dragIndex = (item as IDragItem).index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      (item as IDragItem).index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor-cart",
    item: { index, type },
    collect: (monitor: DragSourceMonitor) => ({
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
          <DragIcon type="primary" />
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
};

export default ConstructorCart;
