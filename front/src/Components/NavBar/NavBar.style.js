import styled from 'styled-components';

export const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  overflow: hidden;
  z-index: 1;
`;

export const NavBarMenuSpan = styled.span`
  background-color: #2c001e;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.9rem;
  width: 1.9rem;
  cursor: pointer;
  font-size: 1rem;

  @media (max-width: 480px) {
  }

  :hover {
    background-color: #5e2750;
  }
`;

export const NavBarSecContainer = styled.div`
  display: flex;
  color: white;
  gap: 0.2rem;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 480px) {
    gap: 0.1rem;
  }
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
