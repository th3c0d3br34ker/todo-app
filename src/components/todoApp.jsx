import React, { useEffect, useState } from "react";

import TodoForm from "./todoForm.jsx";
import TodoItem from "./todoItem.jsx";
import styled from "styled-components";

const TodoBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  // border: 2px solid green;
  max-height: 400px;
  min-height: 435px;
  overflow: hidden;
  overflow-y: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #03045e;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #00b4d8;
    border-radius: 8px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

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
      <TodoBody>
        {tasks.map((task, i) => (
          <TodoItem
            key={task.id}
            id={task.id}
            complete={task.complete}
            toggleComplete={() => toggleComplete(task.id)}
            text={task.text}
            onDeleteTask={() => deleteTodo(task.id)}
          />
        ))}
      </TodoBody>
    </TodoMain>
  );
}

// class TodoApp extends Component {
//   state = {
//     tasks: [],
//     count: 0,
//   };

//   render() {
//     return (
//       <TodoMain>
//         <TodoForm onSubmit={this.addTodo} />
//         <TodoBody>
//           {this.state.tasks.map((task, i) => (
//             <TodoItem
//               id={task.id}
//               key={i}
//               complete={task.complete}
//               toggleComplete={() => this.toggleComplete(task.id)}
//               text={task.text}
//               onDeleteTask={() => this.deleteTodo(task.id)}
//             />
//           ))}
//         </TodoBody>
//       </TodoMain>
//     );
//   }
// }

// export default TodoApp;
