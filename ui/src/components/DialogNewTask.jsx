import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import { TaskContext } from '../context/taskContext';
import { CREATE_TASK, UPDATE_TASK } from '../graphql/Mutation';
import {
  createNewTask,
  getUserTaskPlay,
  setTaskStateOff,
} from '../graphql/tasks';
import '../style/DialogNewTask.scss';
import Modale from './Modale';
import {
  GET_TASK_BY_FILTER,
  GET_USER_PROCESSING_TASK,
  GET_USER_TASK,
} from './../graphql/Query';

const DialogNewTask = () => {
  const ComponentContext = useContext(componentContext);
  const context = useContext(AuthContext);
  const userSub = context.user.sub;
  const [currentProcTask, setCurrentProcTask] = useState([]);

  const { data: processingTask, error: errorLoadingProcTask } = useQuery(
    GET_USER_TASK,
    { variables: { input: { sub: userSub } } }
  );

  useEffect(() => {
    if (processingTask) {
      // console.log(processingTask);
      const curProTask = processingTask.getUserTask.filter(
        (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
      );
      if (curProTask) {
        setCurrentProcTask(curProTask[0]);
      }
    }
  }, [processingTask]);

  const [createTask, { error: errorCreatTask }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_USER_TASK,
        variables: {
          input: {
            sub: context && context.user.sub,
          },
        },
      },
      {
        query: GET_TASK_BY_FILTER,
        variables: {
          input: {
            taskState: 'isOff',
            user: {
              sub: context && context.user.sub,
            },
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [updateTask, { error: errorOnUpDateTask }] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      {
        query: GET_TASK_BY_FILTER,
        variables: {
          input: {
            taskState: 'isOff',
            user: {
              sub: context && context.user.sub,
            },
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleClickSave = async (evnt) => {
    evnt.preventDefault();
    const sub = context.user.sub;
    if (currentProcTask) {
      const id = currentProcTask.id;
      setTaskStateOff(updateTask, id, errorOnUpDateTask)
        .then(createNewTask(createTask, sub, newTask, errorCreatTask))
        .then(ComponentContext.toggleDialogCreateNewTask());
    } else {
      createNewTask(createTask, sub, newTask, errorCreatTask).then(
        ComponentContext.toggleDialogCreateNewTask()
      );
    }
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
    ComponentContext.toggleDialogCreateNewTask();
  };

  const [newTask, setNewTask] = useState({
    boothNumber: '',
    type: 'Contenu',
    processingState: '',
    url: '',
    cat: '',
    ivpn: 'I',
    nbBefore: 0,
    statCom: '',
    nbAfter: 0,
    comment: '',
    user: { sub: userSub },
  });

  const handleInputChange = (ev) => {
    ev.preventDefault();
    setNewTask({ ...newTask, [ev.target.name]: ev.target.value });
  };

  return (
    <div>
      <div className='dialogNewTask'>
        <div className='dialogNewTask__container'>
          <form onSubmit={handleClickSave} className='dialogNewTask__form'>
            <div className='dialogNewTask__form__el'>
              <label htmlFor='boothNumber'>BOOTH NUMBER</label>
              <input
                type='text'
                id='boothNumber'
                name='boothNumber'
                value={newTask.boothNumber}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='type'>TASK TYPE</label>
              <select
                name='type'
                id='type'
                value={newTask.type}
                onChange={(ev) => handleInputChange(ev)}
              >
                <option value={'Contenu'}>Contenu</option>
                <option value={'Maj'}>Maj</option>
              </select>
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='url'>URL</label>
              <input
                type='url'
                id='url'
                name='url'
                value={newTask.url}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='cat'>CAT</label>
              <input
                type='text'
                id='cat'
                name='cat'
                value={newTask.cat}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='ivpn'>STATUS IVPN</label>
              <select
                name='ivpn'
                id='ivpn'
                value={newTask.ivpn}
                onChange={(ev) => handleInputChange(ev)}
              >
                <option value={'I'}>I</option>
                <option value={'V'}>V</option>
                <option value={'P'}>P</option>
                <option value={'N'}>N</option>
              </select>
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='statCom'>STATUS COM</label>
              <select
                name='statCom'
                id='statCom'
                value={newTask.statCom}
                onChange={(ev) => handleInputChange(ev)}
              >
                <option value={''}>---</option>
                <option value={'Abondon'}>Abondon</option>
                <option value={'Abonne'}>Abonné</option>
                <option value={'Degrade'}>Dégradé</option>
                <option value={'Degrade_definitif'}>Dégradé Definitif</option>
                <option value={'Essai'}>Essai</option>
                <option value={'EssaiNouveau'}>EssaiNouveau</option>
                <option value={'Essai_Payant'}>Essai Payant</option>
                <option value={'Retire'}>Retiré</option>
              </select>
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='nbBefore'>NB BEFORE</label>
              <input
                type='number'
                pattern='[0-9]{0,5}'
                id='nbBefore'
                name='nbBefore'
                value={newTask.numberBefore}
                onInput={(ev) => handleInputChange(ev)}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='nbAfter'>NB AFTER</label>
              <input
                type='number'
                id='nbAfter'
                name='nbAfter'
                value={newTask.numberAfter}
                onInput={(ev) => handleInputChange(ev)}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>

            <div className='dialogNewTask__form__el  comment'>
              <label htmlFor='comment'>COMMENT</label>
              <textarea
                type='text'
                id='comment'
                name='comment'
                value={newTask.comment}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>
            <div className='dialogNewTask__button'>
              <button
                type='submit'
                className='dialogNewTask__button__save saveButton'
              >
                SAVE
              </button>
              <div
                className='dialogNewTask__button__cancel cancelButton'
                onClick={(ev) => handleClickCancel(ev)}
              >
                CANCEL
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modale />
    </div>
  );
};

export default DialogNewTask;
