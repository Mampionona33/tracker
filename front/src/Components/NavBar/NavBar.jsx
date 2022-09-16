import React, { useContext } from 'react';
import BtnIconText from '../BtnIconText/BtnIconText';
import { AuthConext } from '../../context/authContext';
import {
  ButtonContainer,
  NavbarContainer,
  NavBarSecContainer,
  UserAvatar,
} from './NavBar.style';
import { ComponentContext } from '../../context/componentContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  mutateCurrentTaskPlayOff,
  mutateCurrentTaskPauseOff,
} from './../../Graphql/graphqlTasks';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { setCurrentTaskStateToOff } from '../../assets/taskStateSwitcher';

const NavBar = () => {
  const { user, logout } = useContext(AuthConext);
  const { processingTask, loadingUserTask } = useGetProcessingTask();
  const {
    setSideBarOpenTrue,
    sideBarOpen,
    dialogCreatTaskIsOpen,
    setdialogCreatTaskOpen,
  } = useContext(ComponentContext);
  const navigate = useNavigate();

  const handleClickMenu = (event) => {
    event.preventDefault();
    !sideBarOpen ? setSideBarOpenTrue() : '';
  };

  const [updateTaskState, { error: errorSetTaskStateToOff }] =
    useMutation(UPDATE_TASK);

  const handleClickBtn = (event) => {
    event.preventDefault();
    const title = event.target.title;
    switch (title) {
      case 'PENDING TASK':
        navigate('pending_task');
        break;
      case 'CREATE NEW TASK':
        !dialogCreatTaskIsOpen ? setdialogCreatTaskOpen() : '';
        break;
      case 'LOGOUT':
        {
          (async () => {
            await setCurrentTaskStateToOff(
              processingTask,
              errorSetTaskStateToOff,
              mutateCurrentTaskPauseOff,
              mutateCurrentTaskPlayOff,
              updateTaskState
            ).then(logout());
          })();
        }

        break;
      default:
        break;
    }
  };

  return (
    <NavbarContainer className='canonicalAubergine'>
      <NavBarSecContainer>
        <span
          className='material-icons-round navBarBtn'
          data-testid='btn-menu'
          onClick={handleClickMenu}
        >
          menu
        </span>

        <ButtonContainer>
          <BtnIconText
            title={'PENDING TASK'}
            className={'navBarBtn'}
            onClick={handleClickBtn}
          >
            <span className='material-icons-round'>pending_actions</span>
          </BtnIconText>

          <BtnIconText
            title={'CREATE NEW TASK'}
            className={'navBarBtn'}
            onClick={handleClickBtn}
          >
            <span className='material-icons-round'>add_circle_outline</span>
          </BtnIconText>

          <BtnIconText
            title={'LOGOUT'}
            className={'navBarBtn'}
            onClick={handleClickBtn}
          >
            <UserAvatar
              src={user ? user.picture : 'user picture'}
              alt={user ? user.given_name : ' user name'}
              referrerPolicy='no-referrer'
            />
          </BtnIconText>
        </ButtonContainer>
      </NavBarSecContainer>
    </NavbarContainer>
  );
};

export default NavBar;
