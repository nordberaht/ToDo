import { useContext } from "react";
import { ListContext } from "../../store/list-context";
import styles from "./List.module.css";
import ListItem from "./ListItem";

const List = (props) => {
  const tasksList = useContext(ListContext);
  const random = (Math.random() * (100 - 1)).toFixed(4);

  return (
    <ul className={styles["list-of-items"]}>
      {tasksList.map((task) => (
        <ListItem
          onTaskRemoveHandler={props.onTaskRemoveHandler}
          title={task.titleValue}
          date={task.dateValue}
          id={task.id}
          key={`${task.titleValue}-${random}`}
        />
      ))}
    </ul>
  );
};

export default List;
