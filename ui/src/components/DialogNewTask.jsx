import React, { useContext } from 'react';
import { componentContext } from '../context/componentContext';
import '../style/DialogNewTask.scss';
import Modale from './Modale';

const DialogNewTask = () => {
  const ComponentContext = useContext(componentContext);

  const handleClickSave = (evnt) => {
    evnt.preventDefault();
    ComponentContext.toggleDialogCreateNewTask();
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
    ComponentContext.toggleDialogCreateNewTask();
  };

  return (
    <div>
      <div className='dialogNewTask'>
        <div className='dialogNewTask__container'>
          <form action='' className='dialogNewTask__form'>
            <div className='dialogNewTask__form__el'>
              <label htmlFor='boothNumber'>BOOTH NUMBER</label>
              <input type='text' id='boothNumber' name='boothNumber' />
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='taskType'>TASK TYPE</label>
              <select name='taskType' id='taskType'>
                <option value={'Contenu'}>Contenu</option>
              </select>
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='url'>URL</label>
              <input type='text' id='url' name='url' />
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='cat'>CAT</label>
              <input type='text' id='cat' name='cat' />
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='ivpn'>STATUS IVPN</label>
              <select name='ivpn' id='ivpn'>
                <option value={'I'}>I</option>
                <option value={'V'}>V</option>
                <option value={'P'}>P</option>
                <option value={'N'}>N</option>
              </select>
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='nbBefore'>NB BEFORE</label>
              <input type='text' id='nbBefore' name='nbBefore' />
            </div>

            <div className='dialogNewTask__form__el'>
              <label htmlFor='nbAfter'>NB AFTER</label>
              <input type='text' id='nbAfter' name='nbAfter' />
            </div>

            <div className='dialogNewTask__form__el  comment'>
              <label htmlFor='comment'>COMMENT</label>
              <textarea type='text' id='comment' name='comment' />
            </div>
          </form>
          <div className='dialogNewTask__button'>
            <div
              className='dialogNewTask__button__save saveButton'
              onClick={(ev) => handleClickSave(ev)}
            >
              SAVE
            </div>
            <div
              className='dialogNewTask__button__cancel cancelButton'
              onClick={(ev) => handleClickCancel(ev)}
            >
              CANCEL
            </div>
          </div>
        </div>
      </div>
      <Modale />
    </div>
  );
};

export default DialogNewTask;
