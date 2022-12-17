import { Fragment } from "react";
import styles from "./taskView.module.css";

const TaskView = (props) => {
  return (
    <Fragment>
      <div className={styles["backdrop"]} onClick={props.closeTask}></div>
      <div className={styles["outter"]}>
        <div className={styles["inner"]}>
          <h3>{`${props.task.titleValue} - till ${props.task.dateValue}`}</h3>
          <p className={styles.description}>{props.task.descriptionValue}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskView;
