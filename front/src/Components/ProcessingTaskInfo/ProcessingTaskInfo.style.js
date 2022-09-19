import styled from 'styled-components';

export const ProcessingTaskInfoContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.2rem;
`;
export const ProcessingTaskTitleLabel = styled.h5`
  display: flex;
  align-items: center;
  margin: 0;
`;
export const ProcessingTaskLabel = styled.p`
  max-width: 20rem;
  display: flex;
  align-items: center;
  margin: 0;
  justify-content: flex-start;
  overflow: hidden;
  white-space: nowrap;
`;

export const ProcessingTaskComment = styled.textarea`
  grid-column-start: 1;
  grid-column-end: 3;
  border-radius: 0.2rem;
  max-height: 5rem;
  max-width: 30rem;
`;
