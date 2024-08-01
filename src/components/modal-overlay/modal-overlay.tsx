import classes from "./modal-overlay.module.scss";
import { IModalProps } from "../../types";

const ModalOverlay: React.FC<IModalProps> = ({ onClose, children }) => {
  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
