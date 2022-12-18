import Form from "./Form";
import Card from "../UI/Card";
import styles from "./ToDos.module.css";
import List from "../List/List";
import ListContextProvider from "../../store/list-context";
import { useEffect, useState } from "react";

const ToDos = () => {
  const [tasks, setTasks] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true);

  //LOCAL STORAGE - at the first load of page get tasks from local storage if any
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  //Show/Hide list card based on list length
  useEffect(() => {
    if (tasks?.length === 0) setIsListEmpty(true);
    if (tasks?.length > 0) {
      setIsListEmpty(false);
    }
    //On every task list change update tasks object stored in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onFormSubmitHandler = (obj) => {
    setTasks((prev) => {
      if (prev) return [...prev, obj];
      return [obj];
    });
  };

  const onTaskRemoveHandler = (id) => {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(updatedTasks);
  };

  const onCheckHandler = (e, id) => {
    //Find task in the list
    const checkedTaskIndex = tasks.findIndex((task) => id === task.id);
    const checkedTask = tasks.find((task) => id === task.id);
    //Update task check value
    checkedTask.checked = e.target.checked;
    //Update list
    setTasks((prev) => {
      const updatedAr = [...prev];
      updatedAr.splice(checkedTaskIndex, 1, checkedTask);

      return updatedAr;
    });
  };

  return (
    <ListContextProvider tasks={tasks}>
      <div className={styles["todos"]}>
        <Card>
          <Form onFormSubmit={onFormSubmitHandler}></Form>
        </Card>
        {isListEmpty || (
          <Card>
            <List
              onTaskRemoveHandler={onTaskRemoveHandler}
              onCheckHandler={onCheckHandler}
            />
          </Card>
        )}
      </div>
    </ListContextProvider>
  );
};

export default ToDos;
