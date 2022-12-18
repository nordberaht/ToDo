import { Fragment, useReducer, useState } from "react";
import styles from "./Form.module.css";
import ErrorModal from "../modal/ErrorModal";

const formReducer = (prevState, action) => {
  if (action.type === "TITLE") {
    return {
      ...prevState,
      titleValue: action.value,
      titleIsValid: action.value.trim().length > 0,
      formIsValid:
        action.value.trim().length > 0 &&
        prevState.dateIsValid &&
        prevState.descriptionIsValid,
    };
  }
  if (action.type === "DATE") {
    const minDate = new Date("2022-01-01");
    const inputDate = new Date(action.value);
    return {
      ...prevState,
      dateValue: action.value,
      dateIsValid: inputDate > minDate,
      formIsValid:
        prevState.titleIsValid &&
        inputDate > minDate &&
        prevState.descriptionIsValid,
    };
  }
  if (action.type === "DESCRIPTION") {
    return {
      ...prevState,
      descriptionValue: action.value,
      descriptionIsValid: action.value.trim().length > 0,
      formIsValid:
        prevState.titleIsValid &&
        prevState.dateIsValid &&
        action.value.trim().length > 0,
    };
  }
  return {
    titleValue: "",
    titleIsValid: null,
    dateValue: "",
    dateIsValid: null,
    descriptionValue: "",
    descriptionIsValid: null,
    formIsValid: null,
    checked: false,
  };
};

const Form = (props) => {
  //STATE MANAGEMENT
  const [formState, dispatchFormState] = useReducer(formReducer, {
    titleValue: "",
    titleIsValid: null,
    dateValue: "",
    dateIsValid: null,
    descriptionValue: "",
    descriptionIsValid: null,
    formIsValid: null,
    checked: false,
  });

  const [isFormOpened, setIsFormOpened] = useState(false);

  //States for invalid input style
  const [titleInputClass, setTitleInputClass] = useState("");
  const [dateInputClass, setDateInputClass] = useState("");
  const [descriptionInputClass, setDescriptionInputClass] = useState("");

  const [errorModal, setErrorModal] = useState(false);

  //CLEAR VALIDATION FORM INPUTS
  const clearInputs = () => {
    setTitleInputClass("");
    setDateInputClass("");
    setDescriptionInputClass("");
  };
  // FORM INPUT HANDLERS
  const titleInputHandler = (e) => {
    dispatchFormState({ type: "TITLE", value: e.target.value });
  };
  const dateInputHandler = (e) => {
    dispatchFormState({ type: "DATE", value: e.target.value });
  };
  const descriptionInputHandler = (e) => {
    dispatchFormState({ type: "DESCRIPTION", value: e.target.value });
  };
  //SHRINK / EXTEND FORM HANDLERS
  const openFormHandler = function () {
    setIsFormOpened(true);
  };
  const closeFormHandler = function () {
    setIsFormOpened(false);
    //reset invalid input style
    clearInputs();
  };

  //FORM FIELDS VALIDATION
  const invalidInputStyle = `${styles["invalid-input"]}`;
  const titleValidationHandler = () => {
    if (formState.titleIsValid) {
      setTitleInputClass("");
      return;
    }
    setTitleInputClass(invalidInputStyle);
  };

  const dateValidationHandler = () => {
    if (formState.dateIsValid) {
      setDateInputClass("");
      return;
    }
    setDateInputClass(invalidInputStyle);
  };

  const descriptionValidationHandler = () => {
    if (formState.descriptionIsValid) {
      setDescriptionInputClass("");
      return;
    }
    setDescriptionInputClass(invalidInputStyle);
  };
  // SUBMIT FORM HANDLER
  const submitFormHandler = function (e) {
    e.preventDefault();
    if (!formState.formIsValid) {
      setErrorModal(true);
      return;
    }

    //Adding id to submitted task in order to manipulate it in the future
    const random = (Math.random() * (100 - 1)).toFixed(4);
    const taskToAdd = {
      ...formState,
      id: `${formState.titleValue}-${random}`,
    };
    props.onFormSubmit(taskToAdd);
    //clearing the form after submission
    dispatchFormState({});
  };

  //MODAL HANDLER
  const closeErrorModalHandler = () => {
    setErrorModal(false);
    clearInputs();
  };

  return (
    <Fragment>
      {errorModal && <ErrorModal onConfirm={closeErrorModalHandler} />}
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
              <input
                maxLength={45}
                value={formState.titleValue}
                className={titleInputClass}
                type="text"
                onChange={titleInputHandler}
                onBlur={titleValidationHandler}
              />
            </div>
            <div>
              <label>Date</label>
              <input
                value={formState.dateValue}
                className={dateInputClass}
                type="date"
                onChange={dateInputHandler}
                onBlur={dateValidationHandler}
              />
            </div>
          </div>
          <div className={styles["form--container__description"]}>
            <label>Description</label>
            <textarea
              maxLength={200}
              value={formState.descriptionValue}
              className={descriptionInputClass}
              name="Description"
              rows={3}
              onChange={descriptionInputHandler}
              onBlur={descriptionValidationHandler}
            ></textarea>
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
