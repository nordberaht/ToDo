import Form from "./Form";
import Card from "../UI/Card";
import styles from "./ToDos.module.css";
import List from "../List/List";
import ListContextProvider from "../../store/list-context";
import { useState } from "react";

const ToDos = () => {
  const [tasks, setTasks] = useState([]);

  const onFormSubmitHandler = (obj) => {
    setTasks((prev) => {
      return [...prev, obj];
    });
  };

  const onTaskRemoveHandler = (id) => {
    console.log("RY");
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    console.log(updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <ListContextProvider tasks={tasks}>
      <div className={styles["todos"]}>
        <Card>
          <Form onFormSubmit={onFormSubmitHandler}></Form>
        </Card>
        <Card>
          <List onTaskRemoveHandler={onTaskRemoveHandler} />
        </Card>
      </div>
    </ListContextProvider>
  );
};

export default ToDos;
