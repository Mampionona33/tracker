import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  position: relative;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const DashboardCont2 = styled.div`
  height: 100vh;
  display: flex;
  position: fixed;
  overflow: auto;
  justify-content: center;
  align-items: center;
`;

export const DashboardCont3 = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  @media screen and (max-width: 875px) {
    padding-top: 5rem;
  }
`;

export const NoProcessingTask = styled.div`
  max-width: 25rem;
`;

export const StyledSpan = styled.span`
  background-color: #77216f;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 0.1rem;
`;

export const DashboardHr = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid black;
  margin: 1rem 0;
`;
