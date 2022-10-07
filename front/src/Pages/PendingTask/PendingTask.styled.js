import styled from 'styled-components';

export const PendigTaskCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 760px) {
    height: 100vh;
  }
  @media screen and (max-width: 760px) {
    overflow: hidden;
  }
`;
