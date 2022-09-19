import styled from 'styled-components';

export const SideBarContainer = styled.div`
  position: relative;
  z-index: 3;
`;
export const SideBarList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #5e2750;
  padding: 2rem 0 0 0;
  color: white;
  width: fit-content;
  height: calc(100vh - 2rem);
  transform: ${(props) => `translateY(${props.sideBarScrollY}px)`};
  gap: 1px;
`;
