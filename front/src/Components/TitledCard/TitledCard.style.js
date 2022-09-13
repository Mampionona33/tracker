import styled from 'styled-components';

export const TitledCardBody = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 2.5rem 1rem 1rem 1rem;
  border-radius: 0.5rem;
  min-width: 5rem;
  display: flex;
  flex-direction: column;
  ::before {
    content: '${(props) => props.title && props.title.toUpperCase()}';
    font-weight: 800;
    z-index: auto;
    color: black;
  }
  background-color: white;
`;

export const TitledCardSeconCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitledSpliter = styled.hr`
  width: 100%;
  border: 0.5px solid black;
`;

export const TitledCardContainer = styled.div`
  margin: 2rem;
  min-width: 190px;
`;
export const TitledCardFirdCont = styled.div`
  position: relative;
`;

export const TitleCardFourth = styled.div`
  background-color: ${(props) => props.bc};
  height: 3rem;
  width: 5rem;
  display: flex;
  white-space: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 0.5rem 0.5rem 0 0;
  top: -2rem;
  left: -2.5rem;
  color: white;
  ::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 2.5rem solid transparent;
    border-right: 2.5rem solid transparent;
    border-top: 1rem solid ${(props) => props.bc};
    position: absolute;
    top: 100%;
  }
`;
