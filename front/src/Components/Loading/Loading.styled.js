import styled from 'styled-components';

export const LoadingCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${(props) => props.firstColor};
  border-top: 3px solid ${(props) => props.seconColor};
  border-radius: 50%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  animation: spin 1s linear infinite;
  z-index: ${(props) => props.zIndex};
  @keyframes spin {
    9% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
