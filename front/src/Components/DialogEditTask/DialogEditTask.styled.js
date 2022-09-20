import styled from 'styled-components';

export const DialogEditTaskCont = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 2;
  margin-top: 15vh;
`;

export const DialogEditTaskCont2 = styled.div`
  position: fixed;
`;

export const DialogEditTaskForm = styled.form`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5rem;
`;

export const DialogEditTaskRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DialogEditTaskLabel = styled.label`
  display: flex;
  align-items: center;
  color: #333333;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 0.8rem;
  white-space: nowrap;
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;
export const DialogEditTaskPara = styled.input`
  color: #333333;
  border-radius: 5px;
  outline: none;
  border: 1px solid #333333;
  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const DialogEditTaskSelect = styled.select`
  border: 1px solid #333333;
  border-radius: 5px;
  outline: none;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

export const DialogEditTaskTextarea = styled.textarea`
  color: black;
  grid-column-start: 1;
  grid-column-end: 3;
  border-radius: 0.2rem;
  max-height: 5rem;
  max-width: 30rem;
  border-radius: 5px;
  outline: none;
`;

export const DialogEditTaskHr = styled.hr`
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  border: none;
  border-top: 1px solid black;
`;
