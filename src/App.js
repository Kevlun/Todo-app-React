import "./App.css";
import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";

function App() {
  const initialState = JSON.parse(localStorage.getItem("activities")) || [];
  const [input, setInput] = useState("");
  const [activities, setActivities] = useState(initialState);
  const [status, setStatus] = useState("all");
  const [filtered, setFiltered] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  });

  function createActivity() {
    if (input === "") return;
    const newActivity = {
      text: input,
      id: Math.floor(Math.random() * 10000),
      completed: false,
    };
    setActivities((prevActivities) => {
      return [...prevActivities, newActivity];
    });
    setInput("");
  }

  function removeActivity(id) {
    const removeArr = [...filtered].filter((activity) => activity.id !== id);
    setActivities(removeArr);
  }

  function handleComplete(id) {
    setActivities(
      activities.map((activity) => {
        if (activity.id === id) {
          return {
            ...activity,
            completed: !activity.completed,
          };
        }
        return activity;
      })
    );
  }

  function filterActivity() {
    let filterArr = [];
    switch (status) {
      case "completed":
        setFiltered(activities);
        filterArr = [...activities].filter(
          (activity) => activity.completed === true
        );
        setFiltered(filterArr);
        break;
      case "uncompleted":
        setFiltered(activities);
        filterArr = [...activities].filter(
          (activity) => activity.completed === false
        );
        setFiltered(filterArr);
        break;
      default:
        setFiltered(activities);
        break;
    }
  }

  useEffect(() => {
    filterActivity();
  }, [activities, status]);

  return (
    <div className="todo-app">
      <div>
        <TodoForm
          createActivity={createActivity}
          setInput={setInput}
          setStatus={setStatus}
        />
        <Todo
          filtered={filtered}
          removeActivity={removeActivity}
          handleComplete={handleComplete}
        />
      </div>
    </div>
  );
}

export default App;
