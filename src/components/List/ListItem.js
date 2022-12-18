import TrashIcon from "../../Icons/trash-icon";
import styles from "./ListItem.module.css";

const months = new Map([
  [0, "Jan"],
  [1, "Feb"],
  [2, "Mar"],
  [3, "Apr"],
  [4, "May"],
  [5, "Jun"],
  [6, "Jul"],
  [7, "Aug"],
  [8, "Sep"],
  [9, "Oct"],
  [10, "Nov"],
  [11, "Dec"],
]);

const ListItem = (props) => {
  const date = new Date(props.date);
  const day = date.getDate();
  const month = months.get(date.getMonth());
  const year = date.getFullYear();

  const deleteTask = () => {
    props.onTaskRemoveHandler(props.id);
  };

  const showTask = (event) => {
    props.showTaskView(event);
  };

  const onCheck = (e) => {
    props.onTaskCheck(e, props.id);
  };

  return (
    <li className={styles["list-item"]} onClick={showTask} id={props.id}>
      <div className={styles["list-item__date"]}>
        <div className={styles["list-item__date-day"]}>{`${day} ${month}`}</div>
        <div className={styles["list-item__date-year"]}>{year}</div>
      </div>
      <div className={styles.titleStyle}>{props.title}</div>
      <div className={styles["list-item__buttons"]}>
        <input
          className={styles["list-item__done-button"]}
          type="checkbox"
          onChange={onCheck}
          checked={props.checked}
        ></input>

        <button
          className={styles["list-item__remove-button"]}
          onClick={deleteTask}
        >
          <TrashIcon stroke={"rgb(238, 238, 238)"} />
        </button>
      </div>
    </li>
  );
};

export default ListItem;
