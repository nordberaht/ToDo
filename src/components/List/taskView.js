import { Fragment, useState } from "react";
import styles from "./taskView.module.css";

const TaskView = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [titleValue, setTitleValue] = useState(props.task.titleValue);
  const [descriptionValue, setDescriptionValue] = useState(
    props.task.descriptionValue
  );

  const [titleClasses, setTitleClasses] = useState();
  const [descriptionClasses, setdescriptionClasses] = useState(
    `${styles.descriptionEdit}`
  );

  const editTask = () => {
    if (!editMode) setEditMode(true);
    if (editMode) {
      // verification
      if (titleValue.trim().length === 0) {
        setTitleClasses(`${styles["wrong-edit"]}`);

        return;
      }
      setTitleClasses("");
      if (descriptionValue.trim().length === 0) {
        setdescriptionClasses(
          `${styles.descriptionEdit} ${styles["wrong-edit"]}`
        );
        return;
      }
      // After succesfull verification exit edit mode and save changes

      setdescriptionClasses(`${styles.descriptionEdit}`);
      setEditMode(false);
      props.onTaskEdit(props.task.id, titleValue, descriptionValue);
    }
  };

  const titleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const descritpionChange = (e) => {
    setDescriptionValue(e.target.value);
  };
  return (
    <Fragment>
      <div className={styles["backdrop"]} onClick={props.closeTask}></div>
      <div className={styles["outter"]}>
        <div className={styles["inner"]}>
          <p className={styles.date}>{props.task.dateValue}</p>
          {!editMode ? (
            <h3>{titleValue}</h3>
          ) : (
            <input
              defaultValue={titleValue}
              onChange={titleChange}
              className={titleClasses}
            ></input>
          )}
          {!editMode ? (
            <p className={styles.description}>{descriptionValue}</p>
          ) : (
            <textarea
              onChange={descritpionChange}
              className={descriptionClasses}
              defaultValue={descriptionValue}
            ></textarea>
          )}

          <button className={styles.btn} onClick={editTask}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={styles["btn-icon"]}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskView;
