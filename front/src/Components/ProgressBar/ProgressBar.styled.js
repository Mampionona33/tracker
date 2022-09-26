import styled from 'styled-components';

export const ProgresBarCont = styled.div`
  height: 0.8em;
  width: 100%;
  background-color: #aea79f;
  border-radius: 0.5em;
  display: flex;
`;

export const ProgressBarValue = styled.div`
  height: 0.8em;
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

export const ProgressBarBulCont = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ProgressBarBul = styled.div`
  position: absolute;
  border: solid 1px #fff;
  right: ${(props) =>
    `${-props.completed.toString().padStart(2, '0').length / 2}em`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 2px;
  width: ${(props) =>
    `${props.completed.toString().padStart(2, '0').length}em`};
  height: ${(props) =>
    `${props.completed.toString().padStart(2, '0').length}em`};
  color: #fff;
  font-size: 0.7rem;
  background-color: ${(props) =>
    props.completed >= 95
      ? '#77216f'
      : props.completed >= 85
      ? '#5e2750'
      : '#2c001e'};
`;
