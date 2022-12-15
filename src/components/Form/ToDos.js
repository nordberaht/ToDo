import Form from "./Form";
import Card from "../UI/Card";
import styles from "./ToDos.module.css";

const ToDos = () => {
  return (
    <div className={styles["todos"]}>
      <Card>
        <Form></Form>
      </Card>
      <Card>
        <div>List</div>
      </Card>
    </div>
  );
};

export default ToDos;
