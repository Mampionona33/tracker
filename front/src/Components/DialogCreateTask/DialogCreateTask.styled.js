import styled from 'styled-components';

export const DialogCreateTaskCont = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  margin-top: 30vh;
  position: absolute;
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
`;

export const DialogCreateTaskSelect = styled.select`
  text-transform: uppercase;
`;

export const DialogCreateTaskOption = styled.option`
  text-transform: uppercase;
  display: flex;
  justify-content: flex-end;
`;

export const DialogCreateTaskTextarea = styled.textarea`
  color: black;
  grid-column-start: 1;
  grid-column-end: 3;
  border-radius: 0.2rem;
  max-height: 5rem;
  max-width: 30rem;
`;
