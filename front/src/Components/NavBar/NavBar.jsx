import React, { useContext, useEffect, useState } from 'react';
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
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_TASK } from '../../Graphql/Query';
import {
  setCurrentTaskPlayOff,
  setCurrentTaskPauseOff,
} from './../../Graphql/graphqlTasks';
import { UPDATE_TASK } from '../../Graphql/Mutation';

const NavBar = () => {
  const { user, logout, sub } = useContext(AuthConext);
  const [currentProcessingTask, setCurrentProcessingTask] = useState([]);
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

  const setCurrentTaskStateToOff = async () => {
    if (currentProcessingTask.length > 0) {
      const currenTaskId = currentProcessingTask.reduce((a, b) => a + b).id;
      const currentTaskState = currentProcessingTask.reduce(
        (a, b) => a + b
      ).taskState;
      const currentSessionId = Array.from(
        currentProcessingTask.reduce((a, b) => a + b).session
      )
        .map((item) => item.session_id)
        .reduce((a, b) => Math.max(a, b));
      currentSessionId && console.log(currentSessionId);

      if (currentTaskState === 'isPause') {
        await setCurrentTaskPauseOff(
          updateTaskState,
          currenTaskId,
          errorSetTaskStateToOff
        ).then(() => {
          return true;
        });
      }
      if (currentTaskState === 'isPlay') {
        setCurrentTaskPlayOff(
          updateTaskState,
          currenTaskId,
          errorSetTaskStateToOff,
          currentSessionId
        ).then(() => {
          true;
        });
      }
    }
  };

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
            await setCurrentTaskStateToOff().then(logout());
          })();
        }

        break;
      default:
        break;
    }
  };

  const {
    data: userTasks,
    error: errorFetchingUserTask,
    loading: loaddingUserTask,
  } = useQuery(GET_USER_TASK, { variables: { input: { sub: sub } } });

  useEffect(() => {
    // Check if user have some task
    if (userTasks && Array.from(userTasks.getUserTask).length > 0) {
      const currentProcessing = Array.from(userTasks.getUserTask).filter(
        (task) => task.taskState === 'isPlay' || task.taskState === 'isPause'
      );
      currentProcessing.length > 0 &&
        setCurrentProcessingTask((prev) => currentProcessing);
    }
  }, [userTasks]);

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
