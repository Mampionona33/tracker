import styled from 'styled-components';

export const MockProdFormCont = styled.form`
  display: grid;
  grid-template-columns: auto 3rem 3rem 3rem 3rem;
  gap: 0.8rem;
  @media screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
  }
`;

export const MockProdFormLabel = styled.label`
  text-transform: uppercase;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  font-weight: 900;
  grid-column-start: 1;
  grid-column-end: 2;
`;

export const MockProdFormInputNbafter = styled.input`
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
  grid-column-start: 2;
  grid-column-end: 6;
  &:focus::placeholder {
    color: transparent;
  }
`;

export const MockProdFormTimer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MockProdFormTimerDay = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  text-transform: capitalize;
  text-align: center;
  font-size: 0.8rem;
`;
export const MockProdFormTimerHrs = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  text-align: center;
  font-size: 0.8rem;
`;

export const MockProdFormTimerMin = styled.div`
  grid-column-start: 4;
  grid-column-end: 5;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  text-align: center;
  font-size: 0.8rem;
`;
export const MockProdFormTimerSec = styled.div`
  grid-column-start: 5;
  grid-column-end: 6;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  text-align: center;
  font-size: 0.8rem;
`;

export const MockProdFormTimerInput = styled.input`
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
  &:focus::placeholder {
    color: transparent;
  }
`;

export const MockProdFormButtonCont = styled.div`
  display: flex;
  justify-content: center;
  grid-column-start: 4;
  grid-column-end: 6;
`;

export const MocProdFormProgressBarCont = styled.div`
  grid-column-start: 2;
  grid-column-end: 6;
`;

export const MockProdFormInputReset = styled.button`
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  border: none;
  gap: 0.2rem;
  background-color: #5e2750;
  border-radius: 5px;
  color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  :hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
  :active {
    background-color: #fff;
    color: #5e2750;
  }
`;
