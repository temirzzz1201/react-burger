import { ReactPortal, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./modal.module.scss";
import { IModalProps } from "../../types";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal: React.FC<IModalProps> = ({
  onClose,
  children,
  title,
  classModal,
}): ReactPortal => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={[classes.modal, classModal].join(" ")}>
        <div className={classes.modal__navigation}>
          <p className="text text_type_main-large">{title}</p>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
