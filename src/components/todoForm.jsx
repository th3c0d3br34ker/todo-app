import React, { useState } from "react";

import styled from "styled-components";

const StyledForm = styled.form`
  margin: 0;
  // border: 2px solid blue;
  padding: 16px;
`;

const StyledInput = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: transparent;
  box-shadow: 2px 4px 2px #90e0f0;
`;

const AddButton = styled.button`
  float: right;
  width: 50px;
  border-radius: 8px;
  background-color: #00b4d8;
  border: transparent;
  padding: 8px;
  outline: none;
  box-shadow: 2px 4px 2px #90e0f0;
`;

export default function TodoForm(props) {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    [event.target.name] = event.target.value;
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text !== "") {
      props.onSubmit({
        id: parseInt(Date.now() % 10000, 10),
        text: text,
        complete: false,
      });
      setText("");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        name="text"
        placeholder="Enter Task"
        value={text}
        onChange={handleChange}
      />
      <AddButton onClick={handleSubmit}>
        <span aria-label="add" role="img">
          ➕
        </span>
      </AddButton>
    </StyledForm>
  );
}

// class TodoForm extends Component {
//   state = {
//     text: "",
//   };

//   render() {
//     return (
// <StyledForm onSubmit={this.handleSubmit}>
//   <StyledInput
//     name="text"
//     placeholder="Enter Task"
//     value={this.state.text}
//     onChange={this.handleChange}
//   />
//   <AddButton onClick={this.handleSubmit}>ADD</AddButton>
// </StyledForm>
//     );
//   }
// }

// export default TodoForm;
