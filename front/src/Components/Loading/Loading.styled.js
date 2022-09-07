import styled from 'styled-components';

export const LoadingCont = styled.div`
  margin: 1rem;
  border: 3px solid #aea79f;
  border-top: 3px solid #5e2750;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;
  @keyframes spin {
    9% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
