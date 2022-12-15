import { Fragment, useState } from "react";
import styles from "./Form.module.css";

const Form = () => {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const openFormHandler = function () {
    setIsFormOpened(true);
  };
  const closeFormHandler = function () {
    setIsFormOpened(false);
  };

  const submitFormHandler = function (e) {
    e.preventDefault();
  };

  return (
    <Fragment>
      {isFormOpened || (
        <div className={styles["form--container_closed"]}>
          <button
            className={styles["form--container__button"]}
            onClick={openFormHandler}
          >
            Add new task
          </button>
        </div>
      )}
      {!isFormOpened || (
        <form
          className={styles["form--container_opened"]}
          onSubmit={submitFormHandler}
        >
          <div className={styles["form--container__input-top"]}>
            <div className={styles["form--container__title"]}>
              <label>Title</label>
              <input type="text" />
            </div>
            <div>
              <label>Date</label>
              <input type="date" />
            </div>
          </div>
          <div className={styles["form--container__description"]}>
            <label>Description</label>
            <textarea name="Description" rows={3}></textarea>
          </div>
          <div className={styles["form--container__button--container"]}>
            <button className={styles["form--container__button"]}>ADD</button>
            <button
              className={styles["form--container__button"]}
              onClick={closeFormHandler}
            >
              CLOSE
            </button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default Form;
