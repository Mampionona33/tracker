import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  flex-wrap: wrap;
  position: relative;
  top: 5vh;
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
