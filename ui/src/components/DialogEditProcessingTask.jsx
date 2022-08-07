import React, { useContext, useEffect, useState } from 'react';
import { TaskTypeContext } from '../context/taskTypeContext';
import Modale from './Modale';
import '../style/DialogEditProcessingTask.scss';
import DialogTitle from './DialogTitle';
import { componentContext } from '../context/componentContext';
import { useQuery } from '@apollo/client';
import { GET_USER_TASK } from '../graphql/Query';
import { AuthContext } from '../context/authContext';

const DialogEditProcessingTask = () => {
  const taskTypeContext = useContext(TaskTypeContext);
  const userContext = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);
  const [formState, setFormState] = useState({
    id: null,
    boothNumber: '',
    type: '',
    url: '',
    cat: '',
    ivpn: '',
    nbBefore: 0,
    nbAfter: 0,
    comment: '',
  });
  const statuCom = [
    { id: 0, value: 'Essai', name: 'Essai' },
    { id: 1, value: 'Abonne', name: 'Abonné' },
    { id: 2, value: 'Degrade', name: 'Dégradé' },
    { id: 3, value: 'Degrade_definitif', name: 'Dégradé Definitif' },
    { id: 4, value: 'Abondon', name: 'Abondon' },
    { id: 5, value: 'EssaiNouveau', name: 'Dégradé Definitif' },
    { id: 6, value: 'Essai_Payant', name: 'Essai Payant' },
    { id: 7, value: 'Retire', name: 'Retiré' },
  ];
  const { data: userTask, error: errorFetchingUserTask } = useQuery(
    GET_USER_TASK,
    {
      variables: {
        input: {
          sub: userContext.user.sub,
        },
      },
    }
  );

  const handleClickSave = async (event) => {
    event.preventDefault();
    const boothNumber = Array.from(event.target)
      .filter((item) => item.id === 'boothNumber')
      .map((item) => item.value)[0];

    const type = Array.from(event.target)
      .filter((item) => item.id === 'type')
      .map((item) => item.value)[0];

    const url = Array.from(event.target)
      .filter((item) => item.id === 'url')
      .map((item) => item.value)[0];

    const cat = Array.from(event.target)
      .filter((item) => item.id === 'cat')
      .map((item) => item.value)[0];

    const ivpn = Array.from(event.target)
      .filter((item) => item.id === 'ivpn')
      .map((item) => item.value)[0];

    const nbBefore = Array.from(event.target)
      .filter((item) => item.id === 'nbBefore')
      .map((item) => item.value)[0];

    boothNumber && console.log(boothNumber);
    type && console.log(type);
    cat && console.log(cat);
    ivpn && console.log(ivpn);
    nbBefore && console.log(nbBefore);
    formState.id && console.log(formState.id);
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
    ComponentContext.closeDialogEditProcessingTask();
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (userTask && userTask.getUserTask) {
      const curProcTask = Array.from(userTask.getUserTask).filter(
        (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
      );
      if (curProcTask) {
        setFormState({
          ...formState,
          id: curProcTask[0].id,
          boothNumber: curProcTask[0].boothNumber,
          type: curProcTask[0].type,
          url: curProcTask[0].url,
          cat: curProcTask[0].cat,
          ivpn: curProcTask[0].ivpn,
          nbBefore: curProcTask[0].nbBefore,
          nbAfter: curProcTask[0].nbAfter,
          comment: curProcTask[0].comment,
        });
      }
    }
  }, [userTask]);

  return (
    <>
      <div className='dialogEditProcessingTask'>
        <div className='dialogEditProcessingTask__formContainer'>
          <DialogTitle>EDIT PROCESSING TASK</DialogTitle>
          <form
            onSubmit={handleClickSave}
            className='dialogEditProcessingTask__form'
          >
            {/* BOOTH NUMBER */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor='boothNumber'
                className='dialogEditProcessingTask__form__label'
              >
                BOOTH NUMBER
              </label>
              <input
                type='text'
                id='boothNumber'
                name='boothNumber'
                className='dialogEditProcessingTask__form__input'
                value={formState.boothNumber}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>
            {/* TASK TYPE */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor='type'
                className='dialogEditProcessingTask__form__label'
              >
                TASK TYPE
              </label>
              <select
                name='type'
                id='type'
                className='dialogEditProcessingTask__form__input'
                value={formState.type}
                onChange={(ev) => handleInputChange(ev)}
              >
                {taskTypeContext.taskType &&
                  Array.from(taskTypeContext.taskType).map((item) => {
                    return (
                      <option value={item.name} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {/* URL */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor='url'
                className='dialogEditProcessingTask__form__label'
              >
                URL
              </label>
              <input
                type='text'
                name='url'
                id='url'
                className='dialogEditProcessingTask__form__input'
                value={formState.url}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>
            {/* CAT */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor='cat'
                className='dialogEditProcessingTask__form__label'
              >
                CAT
              </label>
              <input
                type='text'
                name='cat'
                id='cat'
                className='dialogEditProcessingTask__form__input'
                value={formState.cat}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>
            {/* STATUS IVPN */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor='ivpn'
                className='dialogEditProcessingTask__form__label'
              >
                STATUS IVPN
              </label>
              <select
                name='ivpn'
                id='ivpn'
                className='dialogEditProcessingTask__form__input'
                value={formState.ivpn}
                onChange={(ev) => handleInputChange(ev)}
              >
                <option value='I'>I</option>
                <option value='V'>V</option>
                <option value='P'>P</option>
                <option value='N'>N</option>
              </select>
            </div>
            {/* STATUS COM */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor='statCom'
                className='dialogEditProcessingTask__form__label'
              >
                STATUS COM
              </label>
              <select
                name='statCom'
                id='statCom'
                className='dialogEditProcessingTask__form__input'
              >
                {statuCom &&
                  statuCom.map((item) => {
                    return (
                      <option value={item.value} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {/* NUMBER BEFORE */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor='numberBefore'
                className='dialogEditProcessingTask__form__label'
              >
                NUMBER BEFORE
              </label>
              <input
                id='numberBefore'
                name='numberBefore'
                type='number'
                className='dialogEditProcessingTask__form__input'
                value={formState.nbBefore}
                onInput={(ev) => handleInputChange(ev)}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>
            {/* NUMBER AFTER */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor='numberAfter'
                className='dialogEditProcessingTask__form__label'
              >
                NUMBER AFTER
              </label>
              <input
                id='numberAfter'
                name='numberAfter'
                type='number'
                className='dialogEditProcessingTask__form__input'
                value={formState.nbAfter}
                onInput={(ev) => handleInputChange(ev)}
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>
            {/* COMMENT */}
            <div className='dialogEditProcessingTask__form__row'>
              <label
                htmlFor=''
                className='dialogEditProcessingTask__form__label'
              >
                COMMENT
              </label>
              <textarea
                name=''
                id=''
                cols='30'
                rows='10'
                className='dialogEditProcessingTask__form__input'
                style={{ maxHeight: '5rem' }}
                value={formState.comment}
                onChange={(ev) => handleInputChange(ev)}
              ></textarea>
            </div>
            {/* BUTTONS */}
            <hr style={{ width: '100%' }} />
            <div className='dialogEditProcessingTask__form__buttonGroupCenter'>
              <button
                type='submit'
                className='dialogEditProcessingTask__button__save saveButton'
              >
                SAVE
              </button>
              <button
                type='reset'
                onClick={(e) => handleClickCancel(e)}
                className='dialogEditProcessingTask__button__cancel cancelButton'
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modale />
    </>
  );
};

export default DialogEditProcessingTask;
