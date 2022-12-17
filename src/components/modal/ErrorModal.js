import styles from "./ErrorModal.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import Card from "../UI/Card";

const Overlay = (props) => {
  return (
    <Fragment>
      <div className={styles["backdrop"]} onClick={props.onConfirm}></div>
      <div className={styles["error-modal-container"]}>
        <div className={styles["error-modal-container-inner"]}>
          <h3>Error occured</h3>
          <p>
            Please try again with correct input. Every input field should be
            filled before submitting form
          </p>
          <div className={styles["center-button"]}>
            <button onClick={props.onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const ErrorModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Overlay onConfirm={props.onConfirm} />,
        document.getElementById("overlay")
      )}
    </Fragment>
  );
};

export default ErrorModal;
