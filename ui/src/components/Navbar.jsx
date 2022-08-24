import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import '../style/Navbar.scss';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASK } from '../graphql/Mutation';
import { GET_USER_TASK } from '../graphql/Query';
import {
  setCurrentTaskPauseToOff,
  setCurrentTaskPlayToOff,
  setTaskStateOff,
} from '../graphql/tasks';
import BtnMyTask from './BtnMyTask';
export default function Navbar(props) {
  const context = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);
  const [processingTask, setProcessingTask] = useState({});

  const [
    updateTask,
    { data: dataUpdate, error: errorOnUpdateTask, onCompleted },
  ] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      GET_USER_TASK,
      {
        variables: { input: { sub: context && context.user.sub } },
      },
    ],
    // after the update is complete, execute the logout function
    onCompleted: () => context.logout(),
    awaitRefetchQueries: true,
  });

  const { data: allUserTask, error: errorFetchUserTask } = useQuery(
    GET_USER_TASK,
    {
      variables: { input: { sub: context.user.sub } },
    }
  );

  useEffect(() => {
    if (allUserTask && allUserTask.getUserTask) {
      const currentTask = Array.from(allUserTask.getUserTask).filter(
        (item) => item.taskState === 'isPause' || item.taskState === 'isPlay'
      );
      if (currentTask.length > 0) {
        setProcessingTask((prev) => currentTask[0]);
      }
    }
  }, [allUserTask]);

  const handleClickMenu = (event) => {
    event.preventDefault();
    ComponentContext.toggleSideBar();
  };

  const handleClickLogout = async (event) => {
    event.preventDefault();

    if (Object.keys(processingTask).length > 0) {
      const currentProcessingTaskSessionId = Array.from(processingTask.session)
        .map((item) => item.session_id)
        .reduce((a, b) => Math.max(a, b));

      if (processingTask.taskState === 'isPause') {
        setCurrentTaskPauseToOff(
          updateTask,
          processingTask.id,
          errorOnUpdateTask,
          currentProcessingTaskSessionId
        );
      }
      if (processingTask.taskState === 'isPlay') {
        setCurrentTaskPlayToOff(
          updateTask,
          processingTask.id,
          errorOnUpdateTask,
          currentProcessingTaskSessionId
        );
      }
    } else {
      context.logout();
    }
  };

  const handleClickCreateNewTask = (event) => {
    event.preventDefault();
    ComponentContext.toggleDialogCreateNewTask();
  };

  return (
    <div className='navbar'>
      <div className='navbar__menu'>
        <div
          onClick={(ev) => handleClickMenu(ev)}
          className='navbar__menu__button'
        >
          {!ComponentContext.sideBar ? (
            <span className='material-icons-round'>menu</span>
          ) : (
            <span className='material-icons-round'>close</span>
          )}
        </div>
      </div>

      <div className='navbar__rightButton'>
        <BtnMyTask />
        <button
          type={'button'}
          className='navbar__btn'
          onClick={(ev) => handleClickCreateNewTask(ev)}
        >
          <span className='material-icons-round'>add_task</span>
          NEW TASK
        </button>

        <div className='navbar__btn' onClick={(e) => handleClickLogout(e)}>
          {context.user && (
            <img
              className='navbar__avatar'
              referrerPolicy='no-referrer' // add this to avoid erro 403 on downloading image from google
              src={context.user.picture}
              alt={context.user.given_name}
            />
          )}
          LOGOUT
          <span className='material-icons-round'>logout</span>
        </div>
      </div>
    </div>
  );
}
