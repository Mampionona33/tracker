import styled from 'styled-components';

export const ProcessingTaskTimerCont = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ProcessingTaskTimerDigitCon = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  & div:nth-child(1) {
    width: 3rem;
    height: 3rem;
    border: 1px solid #77216f;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2c001e;
    overflow: hidden;
  }

  & div:nth-child(2) {
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    font-size: 0.7rem;
  }
`;
