import classes from "./404.module.scss";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className={classes.error}>
      <p className="text text_type_main-large">404 Not Found (:</p>
      <Link className={classes.error__home} to="/">
        Home
      </Link>
    </div>
  );
}

export default ErrorPage;
