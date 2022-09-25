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

export const ProgressBarBulCont = styled.div`
  position: relative;
  ::before {
    content: '';
    color: white;
    background-color: black;
    width: 1px;
    height: 1rem;
    display: block;
  }
`;

export const ProgressBarBul = styled.div`
  position: absolute;
  right: ${(props) =>
    `${-props.completed.toString().padStart(2, '0').length / 2}em`};
  top: 0.5rem;
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
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.completed >= 95
      ? '#77216f'
      : props.completed >= 85
      ? '#5e2750'
      : '#2c001e'};
`;
