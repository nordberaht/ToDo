import styles from "./Header.module.css";
import { useState } from "react";

const Header = (props) => {
  const [classesContainer, setClassesContainer] = useState(
    `${styles["header-container"]}`
  );
  const [classesTitle, setClassesTitle] = useState(`${styles["title"]}`);
  const [btnClicked, setBtnClicked] = useState(false);

  const shrinkHeader = () => {
    setClassesContainer(`${styles["header-container__shrinked"]}`);
    setClassesTitle(`${styles["title__shrinked"]}`);
    setBtnClicked(true);
    props.onShrink();
  };

  return (
    <div className={classesContainer}>
      <h1 className={classesTitle}>To Do</h1>
      {btnClicked || (
        <button className={styles.button} onClick={shrinkHeader}>
          make a list
        </button>
      )}
    </div>
  );
};

export default Header;
