import styles from "./todoform.module.css";
import React, { useEffect, useRef } from "react";
import { GiCapybara } from "react-icons/gi";

function TodoForm(props) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    todoRef.current.focus();
  });

  function handleChange(event) {
    const value = event.target.value;
    props.setInput(value);
  }

  const todoRef = useRef();

  function handleStatus(e) {
    props.setStatus(e.target.value);
  }

  function handleField() {
    todoRef.current.value = null;
  }

  return (
    <div>
      <form className={styles.form} onSubmit={() => handleSubmit()}>
        <h1>Hey, what do you want to create today?</h1>
        <div className={styles.formContainer}>
          <GiCapybara className={styles.capybara} />
          <input
            required
            name="test"
            autoComplete="off"
            ref={todoRef}
            placeholder="Click happybara for good fortune..."
            onChange={handleChange}
            className={styles.todoField}
          />
          <button
            className={styles.button}
            onClick={function () {
              props.createActivity();
              handleField();
            }}
          >
            Add
          </button>
        </div>
        <div>
          <select className={styles.select} onChange={handleStatus}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
