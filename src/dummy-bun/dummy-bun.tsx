import classes from "./dummy-bun.module.scss";

const DummyBun = () => {
  return (
    <>
      <div className={classes.bun}>
        <p>Перетащите булку</p>
      </div>
      <div className={classes.ingredient}>
        <p>Перетащите ингридиент</p>
      </div>
      <div className={[classes.bun, classes.bun_upsidedown].join(" ")}>
        <p className={classes.bun_upsidedown}>Перетащите булку</p>
      </div>
    </>
  );
};

export default DummyBun;
