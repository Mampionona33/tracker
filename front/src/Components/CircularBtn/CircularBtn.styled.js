import styled from 'styled-components';

export const CircularBtnCont = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  color: ${(props) => (props.color ? props.color : '#77216f')};
  background-color: ${(props) =>
    props.backGroundCol ? props.backGroundCol : '#fff'};

  :hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  :active {
    color: ${(props) => (props.backGroundCol ? props.backGroundCol : '#fff')};
    background-color: ${(props) => (props.color ? props.color : '#77216f')};
  }
`;
