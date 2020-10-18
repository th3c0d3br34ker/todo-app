import { CSSTransition, TransitionGroup } from "react-transition-group";

import React from "react";
import TodoItem from "./todoItem";
import propTypes from "prop-types";
import styled from "styled-components";

const TodoBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  // border: 2px solid green;
  max-height: 400px;
  min-height: 435px;
  overflow: hidden;
  overflow-y: scroll;

  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #03045e;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #00b4d8;
    border-radius: 8px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #fff;
  }

  // Transition
  .transition-enter {
    opacity: 0.01;
  }
  .transition-enter-active {
    opacity: 1;
    transition: all 0.4s ease-out;
  }
  .transition-exit {
    opacity: 1;
  }
  .transition-exit-active {
    opacity: 0.01;
    transition: all 0.4s ease-in;
  }
`;

export default function TodoBody(props) {
  return (
    <TransitionGroup component={TodoBodyContainer}>
      {props.tasks.map((task) => (
        <CSSTransition key={task.id} timeout={400} classNames="transition">
          <TodoItem
            id={task.id}
            complete={task.complete}
            toggleComplete={() => props.toggleComplete(task.id)}
            text={task.text}
            onDeleteTask={() => props.deleteTodo(task.id)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

TodoBody.propTypes = {
  tasks: propTypes.array,
  toggleComplete: propTypes.func,
  deleteTodo: propTypes.func,
};
