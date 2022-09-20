import styled from 'styled-components';

export const DialogCreateTaskCon1 = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  position: relative;
  margin-top: 10vh;
  z-index: 2;
`;

export const DialogCreateTaskCont = styled.div`
  position: fixed;
`;

export const DialogCreateTaskFormInput = styled.div`
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
  white-space: nowrap;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
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
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

export const DialogCreateTaskSelect = styled.select`
  text-transform: uppercase;
  border-radius: 5px;
  outline: none;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

export const DialogCreateTaskOption = styled.option`
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
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
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

export const DialogCreateTaskHr = styled.hr`
  width: 100%;
`;

export const DialogCreateTaskForm = styled.form``;

export const DialogCreateTaskBtnContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const DialogLoadingCont1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: absolute;
  left: 50%;
`;
