import styled from 'styled-components';

export const DialogCreateTaskCont = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  margin-top: 25vh;
  position: absolute;
  @media screen and (max-width: 450px) {
    margin-top: 5vh;
  }
`;

export const DialogCreateTaskForm = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5rem;
  color: black;
`;

export const DialogCreateTaskFormLabel = styled.label`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 0.9rem;
  margin: 0;
`;

export const DialogCreateTaskInput = styled.input`
  margin: 0;
  outline: none;
  border-radius: 5px;
  border: 1px solid gray;
  :hover {
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }
  :focus {
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }
`;

export const DialogCreateTaskSelect = styled.select`
  text-transform: uppercase;
  border-radius: 5px;
  outline: none;
`;

export const DialogCreateTaskOption = styled.option`
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
`;

export const DialogCreateTaskTextarea = styled.textarea`
  color: black;
  grid-column-start: 1;
  grid-column-end: 3;
  border-radius: 0.2rem;
  max-height: 5rem;
  max-width: 30rem;
  border-radius: 5px;
  outline: none;
`;
