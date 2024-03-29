import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import { TaskContext } from '../context/taskContext';
import { CREATE_TASK, UPDATE_TASK } from '../graphql/Mutation';
import {
  createNewTask,
  setCurrentTaskPauseToOff,
  setCurrentTaskPlayToOff,
  setTaskStateOff,
} from '../graphql/tasks';
import '../style/DialogNewTask.scss';
import Modale from './Modale';
import { GET_TASK_BY_FILTER, GET_USER_TASK } from './../graphql/Query';
import { TaskTypeContext } from '../context/taskTypeContext';
import DialogTitle from './DialogTitle';
import { useNavigate } from 'react-router-dom';

const DialogNewTask = () => {
  const ComponentContext = useContext(componentContext);
  const context = useContext(AuthContext);
  const taskTypeContext = useContext(TaskTypeContext);
  const userSub = context.user.sub;
  const [currentProcTask, setCurrentProcTask] = useState([]);
  const navigate = useNavigate();

  const { data: processingTask, error: errorLoadingProcTask } = useQuery(
    GET_USER_TASK,
    { variables: { input: { sub: userSub } } }
  );


  // CLOSE ALL OTHER MODALS
  useEffect(() => {
    ComponentContext.sideBar && ComponentContext.closeSideBar();
    ComponentContext.dialogEditHistory && ComponentContext.closeDialogEditHistory();
    ComponentContext.dialogConfirmSubmit && ComponentContext.closeDialogConfirmSubmitTask();
    ComponentContext.dialogEditProcessingTask && ComponentContext.closeDialogEditProcessingTask();
  },[])

  useEffect(() => {
    if (processingTask) {
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
      const currentSessionId = Array.from(currentProcTask.session)
        .map((item) => item.session_id)
        .reduce((a, b) => Math.max(a, b));

      if (Object.keys(currentProcTask).length > 0) {
        if (currentProcTask.taskState === 'isPause') {
          setCurrentTaskPauseToOff(
            updateTask,
            id,
            errorOnUpDateTask,
            currentSessionId
          )
            .then(createNewTask(createTask, sub, newTask, errorCreatTask))
            .then(ComponentContext.toggleDialogCreateNewTask());
        }
        if (currentProcTask.taskState === 'isPlay') {
          setCurrentTaskPlayToOff(
            updateTask,
            id,
            errorOnUpDateTask,
            currentSessionId
          )
            .then(createNewTask(createTask, sub, newTask, errorCreatTask))
            .then(ComponentContext.toggleDialogCreateNewTask());
        }
      }
    } else {
      createNewTask(createTask, sub, newTask, errorCreatTask).then(
        ComponentContext.toggleDialogCreateNewTask()
      );
    }
    navigate('/dashboard');
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
    totalElapstedTime: '',
    submitedDate: null,
    productivity: 0,
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
          <DialogTitle>CREATE NEW TASK</DialogTitle>
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
              <label className='dialogNewTask__form__label' htmlFor='type'>
                TASK TYPE
              </label>
              <select
                name='type'
                id='type'
                value={newTask.type}
                onChange={(ev) => handleInputChange(ev)}
              >
                {taskTypeContext.taskType &&
                  taskTypeContext.taskType.map((item) => {
                    return (
                      <option value={item.name} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className='dialogNewTask__form__el'>
              <label className='dialogNewTask__form__label' htmlFor='url'>
                URL
              </label>
              <input
                type='url'
                id='url'
                name='url'
                value={newTask.url}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>

            <div className='dialogNewTask__form__el'>
              <label className='dialogNewTask__form__label' htmlFor='cat'>
                CAT
              </label>
              <input
                type='text'
                id='cat'
                name='cat'
                value={newTask.cat}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>

            <div className='dialogNewTask__form__el'>
              <label className='dialogNewTask__form__label' htmlFor='ivpn'>
                STATUS IVPN
              </label>
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
              <label className='dialogNewTask__form__label' htmlFor='statCom'>
                STATUS COM
              </label>
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
              <label className='dialogNewTask__form__label' htmlFor='nbBefore'>
                NB BEFORE
              </label>
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
              <label className='dialogNewTask__form__label' htmlFor='nbAfter'>
                NB AFTER
              </label>
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
              <label className='dialogNewTask__form__label' htmlFor='comment'>
                COMMENT
              </label>
              <textarea
                type='text'
                id='comment'
                name='comment'
                value={newTask.comment}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>
            <hr style={{ width: '100%' }} />
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
