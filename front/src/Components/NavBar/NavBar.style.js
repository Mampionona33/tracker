import styled from 'styled-components';

export const NavbarContainer = styled.div`
  position: fixed;
  width: 100vw;
  overflow: hidden;
  z-index: 1;
`;

export const NavBarSecContainer = styled.div`
  display: flex;
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.1rem;
`;

export const UserAvatar = styled.img`
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
`;
