import React, { useContext } from 'react';
import BtnIconText from '../BtnIconText/BtnIconText';
import { AuthConext } from '../../context/authContext';
import { ButtonContainer, NavbarContainer, UserAvatar } from './NavBar.style';
import { ComponentContext } from '../../context/componentContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthConext);
  const { setSideBarOpenTrue, sideBarOpen } = useContext(ComponentContext);

  const handleOnClicLogout = (event) => {
    event.preventDefault();
    logout();
  };

  const handleClickMenu = (event) => {
    event.preventDefault();
    !sideBarOpen ? setSideBarOpenTrue() : '';
  };

  return (
    <NavbarContainer className='canonicalAubergine'>
      <span
        className='material-icons-round navBarBtn'
        data-testid='btn-menu'
        onClick={handleClickMenu}
      >
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
            src={user ? user.picture : 'user picture'}
            alt={user ? user.given_name : ' user name'}
            referrerPolicy='no-referrer'
          />
        </BtnIconText>
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default NavBar;
