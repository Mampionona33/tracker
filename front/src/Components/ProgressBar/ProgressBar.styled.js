import styled from 'styled-components';

export const ProgresBarCont = styled.div`
  height: 0.2rem;
  width: 100%;
  background-color: #aea79f;
  border-radius: 0.1rem;
  display: flex;
`;

export const ProgressBarValue = styled.div`
  height: 0.2rem;
  border-radius: inherit;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  width: ${(props) => `${props.completed}%`};
  background-color: ${(props) =>
    props.completed >= 95
      ? '#77216f'
      : props.completed >= 85
      ? '#5e2750'
      : '#2c001e'};
`;

export const ProgressBarPointer = styled.span``;
