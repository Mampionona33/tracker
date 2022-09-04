import React, { useContext } from 'react';
import styled from 'styled-components';
import BtnIconText from '../../BtnIconText/BtnIconText';
import { AuthConext } from '../../../context/authContext';

const NavbarContainer = styled.div`
  display: flex;
  color: white;
  height: 2rem;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.1rem;
`;

const UserAvatar = styled.img`
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
`;

const NavBar = () => {
  const { user, logout } = useContext(AuthConext);

  const handleOnClicLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <NavbarContainer className='canonicalAubergine'>
      <span className='material-icons-round navBarBtn' data-testid='btn-menu'>
        menu
      </span>
      <ButtonContainer>
        <BtnIconText title={'PENDING TASK'} className={'navBarBtn'}>
          <span className='material-icons-round'>pending_actions</span>
        </BtnIconText>
        <BtnIconText title={'CREATE NEW TASK'} className={'navBarBtn'}>
          <span className='material-icons-round'>add_circle_outline</span>
        </BtnIconText>
        <BtnIconText
          title={'LOGOUT'}
          className={'navBarBtn'}
          onClick={handleOnClicLogout}
        >
          <UserAvatar
            src={user.picture}
            alt={user.given_name}
            referrerPolicy='no-referrer'
          />
        </BtnIconText>
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default NavBar;
