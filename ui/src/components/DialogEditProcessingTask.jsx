import React, { useContext } from 'react';
import { TaskTypeContext } from '../context/taskTypeContext';
import Modale from './Modale';
import '../style/DialogEditProcessingTask.scss';

const DialogEditProcessingTask = () => {
  const taskTypeContext = useContext(TaskTypeContext);
  return (
    <>
      <div className='dialogEditProcessingTask'>
        <div className='dialogEditProcessingTask__formContainer'>
          <form action='' className='dialogEditProcessingTask__form'>
            <table className='dialogProcessingTask__table'>
              <tr className='dialogProcessingTask__table__row'>
                <td className='dialogProcessingTask__table__data'>
                  <label
                    htmlFor='boothNumber'
                    className='dialoProcessingTask__table__data__label'
                  >
                    BOOTH NUMBER
                  </label>
                </td>
                <td className='dialogProcessingTask__table__data'>
                  <input type='text' id='boothNumber' name='boothNumber' />
                </td>
              </tr>

              <tr className='dialogProcessingTask__table__row'>
                <td className='dialogProcessingTask__table__data'>
                  <label
                    htmlFor='type'
                    className='dialoProcessingTask__table__data__label'
                  >
                    TASK TYPE
                  </label>
                </td>
                <td>
                  <select name='type' id='type'>
                    {taskTypeContext &&
                      Array.from(taskTypeContext.taskType).map((item) => {
                        return (
                          <option value={item.name} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </td>
              </tr>

              <tr className='dialogProcessingTask__table__row'>
                <td className='dialogProcessingTask__table__data'>
                  <label
                    htmlFor='url'
                    className='dialoProcessingTask__table__data__label'
                  >
                    URL
                  </label>
                </td>
                <td className='dialogProcessingTask__table__data'>
                  <input type='url' id='url' name='url' />
                </td>
              </tr>

              <tr>
                <td>
                  <lable htmlFor='cat'>CAT</lable>
                </td>
                <td>
                  <input type='text' id='cat' name='cat' />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='ivpn'>STATUS IVPN</label>
                </td>
                <td>
                  <select name='ivpn' id='ivpn'>
                    <option value='I'>I</option>
                    <option value='V'>V</option>
                    <option value='P'>P</option>
                    <option value='N'>N</option>
                  </select>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
      <Modale />
    </>
  );
};

export default DialogEditProcessingTask;
