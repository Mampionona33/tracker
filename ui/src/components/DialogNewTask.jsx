import React, { useContext, useState } from 'react';
import { componentContext } from '../context/componentContext';
import '../style/DialogNewTask.scss';
import Modale from './Modale';

const DialogNewTask = () => {
  const ComponentContext = useContext(componentContext);

  const handleClickSave = (evnt) => {
    evnt.preventDefault();
    console.log(newTask);
    ComponentContext.toggleDialogCreateNewTask();
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
    ComponentContext.toggleDialogCreateNewTask();
  };

  const [newTask, setNewTask] = useState({
    boothNumber: '',
    taskType: '',
    url: '',
    cat: '',
    ivpn: 'I',
    nbBefore: '',
    nbAfter: '',
    comment: '',
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
              <label htmlFor='taskType'>TASK TYPE</label>
              <select
                name='taskType'
                id='taskType'
                value={newTask.taskType}
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
