import { Fragment, useContext, useState } from "react";
import { ListContext } from "../../store/list-context";
import styles from "./List.module.css";
import ListItem from "./ListItem";
import TaskView from "./taskView";

const List = (props) => {
  const tasksList = useContext(ListContext);

  const [showTask, setShowTask] = useState(false);
  const [task, setTask] = useState({});

  const showTaskView = (e) => {
    if (e.target.localName !== "div" && e.target.localName !== "li") return;
    const id = e.currentTarget.getAttribute("id");
    const taskCur = tasksList.find((task) => task.id === id);
    setShowTask(true);
    setTask(taskCur);
  };

  const closeTaskView = () => {
    setShowTask(false);
  };

  return (
    <Fragment>
      {showTask && (
        <TaskView
          task={task}
          closeTask={closeTaskView}
          onTaskEdit={props.onTaskEdit}
        />
      )}
      <ul className={styles["list-of-items"]}>
        {tasksList?.map((task) => (
          <ListItem
            showTaskView={showTaskView}
            onTaskCheck={props.onCheckHandler}
            onTaskRemoveHandler={props.onTaskRemoveHandler}
            title={task.titleValue}
            date={task.dateValue}
            checked={task.checked}
            id={task.id}
            key={task.id}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default List;
