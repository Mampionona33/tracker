import styled from 'styled-components';

export const TitledCardBody = styled.div`
  box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.2);
  padding: 2.5rem 1rem 1rem 1rem;
  border-radius: 0.5rem;
  min-width: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ::before {
    content: '${(props) => props.title && props.title.toUpperCase()}';
    font-weight: 800;
  }
`;

export const TitledCardSeconCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitledCardContainer = styled.div`
  margin: 2rem;
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
  z-index: auto;
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
