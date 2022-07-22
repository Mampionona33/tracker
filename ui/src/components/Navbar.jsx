import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import '../style/Navbar.scss';
import { useMutation } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK } from '../graphql/Mutation';
import { GET_USER_TASK, GET_USER_TASK_PLAY } from '../graphql/Query';
import { setTaskStateOff } from '../graphql/tasks';
import { TaskContext } from '../context/taskContext';
export default function Navbar(props) {
  const context = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);
  const taskContext = useContext(TaskContext);
  const taskPlay = taskContext.userTaskPlay;

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

  const handleClickMenu = (event) => {
    event.preventDefault();
    ComponentContext.toggleSideBar();
  };

  const handleClickLogout = async (event) => {
    event.preventDefault();
    console.log(taskPlay.id);

    if (taskPlay) {
      console.log(taskPlay);
      setTaskStateOff(updateTask, taskPlay.id, errorOnUpdateTask);
      if (taskPlay[0]) {
        setTaskStateOff(updateTask, taskPlay[0].id, errorOnUpdateTask);
      }
    }
    if (taskPlay.length <= 0) {
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
        <button
          type={'button'}
          className='navbar__createTask'
          onClick={(ev) => handleClickCreateNewTask(ev)}
        >
          <span className='material-icons-round'>add_task</span>
          NEW TASK
        </button>

        <div
          className='navbar__logoutbtn'
          onClick={(e) => handleClickLogout(e)}
        >
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
