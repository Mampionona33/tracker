import styled from 'styled-components';

export const DialogConfirmSubmitCont1 = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const DialogConfirmSubmitCont2 = styled.form`
  position: fixed;
  z-index: 2;
`;

export const DialogConfirmSubmitMsg = styled.div`
  display: flex;
  max-width: 50rem;
`;

export const DialogConfirmSubmitBtnCont = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.2rem;
`;

export const DialogConfirmSubmitHr = styled.hr`
width: 100%;
border: none;
border-top: 1px solid black;
`;
