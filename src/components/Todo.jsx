import React from "react";
import styles from "./todo.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

function Todo(props) {
  return (
    <div>
      {props.filtered.map((activity) => {
        return (
          <div key={activity.id} className={styles.todoItem}>
            <RiCloseCircleLine
              className={styles.removeButton}
              onClick={() => props.removeActivity(activity.id)}
            />
            <input
              defaultValue={activity.text}
              type="text"
              name="text"
              className={styles.todoField}
              key={activity.id}
              className={
                activity.completed === true
                  ? styles.todoField + " " + styles.active
                  : styles.todoField
              }
            />
            <button
              className={styles.button}
              onClick={() => props.handleComplete(activity.id)}
            >
              {activity.completed === true ? "Undo" : "Done"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
