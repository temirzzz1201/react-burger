import PropTypes from "prop-types";
import classes from "./modal-overlay.module.scss";

function ModalOverlay({ onClose, children }) {
  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default ModalOverlay;
