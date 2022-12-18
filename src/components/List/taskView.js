import { Fragment } from "react";
import styles from "./taskView.module.css";

const TaskView = (props) => {
  return (
    <Fragment>
      <div className={styles["backdrop"]} onClick={props.closeTask}></div>
      <div className={styles["outter"]}>
        <div className={styles["inner"]}>
          <p>{props.task.dateValue}</p>
          <h3>{props.task.titleValue}</h3>
          <p className={styles.description}>{props.task.descriptionValue}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskView;
