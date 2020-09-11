import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import InputField from "./Components/InputField";

const App = () => {
  const [newTask, setNewTask] = useState("");

  const onInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const [tasks, setTasks] = useState([
    { task: "Wash the car", isComplete: false, priority: "low" },
    { task: "Do Gardening", isComplete: true, priority: "medium" },
    { task: "Buy Groceries", isComplete: false, priority: "high" }
  ]);

  const addTask = () => {
    const taskObject = {
      task: newTask,
      isComplete: false,
      priority: "low"
    };
    // setTasks(tasks.concat(taskObject)); // method 1
    setTasks([...tasks, taskObject]); // method 2
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, taskIndex) => {
        if (taskIndex === index) {
          return {
            ...task,
            isComplete: !task.isComplete
          };
        }

        return task;
      })
    );
  };

  const taskPriority = (index) => {
    setTasks(
      tasks.map((task, taskIndex) => {
        if (taskIndex === index) {
          return {
            ...task,
            isComplete: task.isComplete,
            priority:
              task.priority === "high"
                ? "medium"
                : task.priority === "medium"
                ? "low"
                : "high"
          };
        }

        return task;
      })
    );
  };

  const removeTask = (index) => {
    setTasks(tasks.splice(index, 1));
  };

  const pendingTasks = tasks.filter((taskObject) => {
    return !taskObject.isComplete;
  });

  const completedTasks = tasks.filter((taskObject) => {
    return taskObject.isComplete;
  });

  const highPriority = tasks.filter((taskObject) => {
    return taskObject.priority === "high";
  });

  const mediumPriority = tasks.filter((taskObject) => {
    return taskObject.priority === "medium";
  });

  const lowPriority = tasks.filter((taskObject) => {
    return taskObject.priority === "low";
  });

  return (
    <Fragment>
      <h1>ToDoList App</h1>
      <InputField
        newTask={newTask}
        onInputChange={onInputChange}
        addTask={addTask}
      />
      <ul>
        {tasks.map((taskObject, index) => {
          const clickedTask = () => {
            toggleTask(index);
          };

          const deleteTask = () => {
            removeTask(index);
          };

          const changePriority = () => {
            taskPriority(index);
          };

          return (
            <li key={index}>
              <span onClick={clickedTask}>
                {taskObject.task} {taskObject.isComplete ? "✔️" : "⏱"}
              </span>
              <span style={{ padding: "10px" }} onClick={deleteTask}>
                🗑
              </span>
              {taskObject.priority === "high" ? (
                <span style={{ color: "red" }} onClick={changePriority}>
                  High
                </span>
              ) : taskObject.priority === "medium" ? (
                <span style={{ color: "orange" }} onClick={changePriority}>
                  Medium
                </span>
              ) : (
                <span style={{ color: "brown" }} onClick={changePriority}>
                  Low
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <h4>Number of pending tasks : </h4>
      {pendingTasks.length}
      <h4>Number of completed tasks : </h4>
      {completedTasks.length}
      <h4>Number of tasks based on priority : </h4>
      <span>High - {highPriority.length}</span>
      <br />
      <span>Medium - {mediumPriority.length}</span>
      <br />
      <span>Low - {lowPriority.length}</span>
    </Fragment>
  );
};

ReactDOM.render(<App />, document.querySelector("#app-root"));
