import styled from 'styled-components';

export const LoginPage = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  justify-items: center;
  justify-content: center;
  position: relative;
`;

export const LoginCardContainer = styled.div`
  position: absolute;
  top: 35vh;
  display: flex;
  flex-direction: column;
`;
export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 10;
`;
export const LoginTitle = styled.h4`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: auto;
`;
