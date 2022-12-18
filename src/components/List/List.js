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
      {showTask && <TaskView task={task} closeTask={closeTaskView} />}
      <ul className={styles["list-of-items"]}>
        {tasksList?.map((task) => (
          <ListItem
            showTaskView={showTaskView}
            onTaskRemoveHandler={props.onTaskRemoveHandler}
            title={task.titleValue}
            date={task.dateValue}
            id={task.id}
            key={task.id}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default List;
