import React, { useEffect, useState } from "react";

import TodoBody from "./todoBody.jsx";
import TodoForm from "./todoForm.jsx";
import styled from "styled-components";

const TodoHeading = styled.h1`
  color: white;
`;

const TodoHeadingWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const TodoMain = styled.div`
  display: block;
  min-width: 420px;
  max-height: 640px;

  // border: 2px solid violet;
  background-color: #03045e;
  border-radius: 0 32px;
  box-shadow: 8px 8px 16px 2px #caf0f8;
`;

export default function TodoApp() {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todo-app-data"));
    if (data) {
      setTask(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-app-data", JSON.stringify(tasks));
  }, [tasks]);

  const addTodo = (task) => {
    setTask([...tasks, task]);
  };

  const toggleComplete = (id) => {
    setTask(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            complete: !task.complete,
          };
        } else {
          return task;
        }
      })
    );
  };

  const deleteTodo = (id) => {
    setTask(tasks.filter((tasks) => tasks.id !== id));
  };

  return (
    <TodoMain>
      <TodoHeadingWrapper>
        <TodoHeading>
          <span aria-label="note" role="img">
            📝
          </span>{" "}
          TO DO APP
        </TodoHeading>
      </TodoHeadingWrapper>
      <TodoForm onSubmit={addTodo} />
      <TodoBody
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </TodoMain>
  );
}
