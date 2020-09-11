import React, { Fragment } from "react";

const InputField = (props) => {
  return (
    <Fragment>
      <input
        type="text"
        value={props.newTask}
        onChange={props.onInputChange}
        placeholder="Add new task"
      />
      <button onClick={props.addTask}>Add</button>
    </Fragment>
  );
};

export default InputField;
