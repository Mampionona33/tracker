import React, { useContext } from 'react';
import { TaskTypeContext } from '../context/taskTypeContext';
import Modale from './Modale';
import '../style/DialogEditProcessingTask.scss';
import Card from './Card';

const DialogEditProcessingTask = () => {
  const taskTypeContext = useContext(TaskTypeContext);
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
  return (
    <>
      <div className='dialogEditProcessingTask'>
        <div className='dialogEditProcessingTask__formContainer'>
          <h2 className='dialogEditProcessingTask__title'>
            EDIT PROCESSING TASK
          </h2>
          <form action='' className='dialogEditProcessingTask__form'>
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
                type='text'
                className='dialogEditProcessingTask__form__input'
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
                type='text'
                className='dialogEditProcessingTask__form__input'
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
              <button className='dialogEditProcessingTask__button__cancel cancelButton'>
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
