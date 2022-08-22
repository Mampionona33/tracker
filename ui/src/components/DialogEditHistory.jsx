import React, { useContext, useState } from 'react';
import Modale from './Modale';
import '../style/DialogEditHistory.scss';
import { HistoryContext } from '../context/historyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DialogTitle from './DialogTitle';
import '../style/DialogEditHistory.scss';
import { componentContext } from '../context/componentContext';
import { useParams } from 'react-router-dom';

function DialogEditHistory() {
  const historyContext = useContext(HistoryContext);
  const ComponentContext = useContext(componentContext);
  const { date } = useParams(); // Date from link params
  const [selectedDate, setSelectedDate] = useState(
    historyContext.historyData.sessionstart
      ? new Date(historyContext.historyData.sessionstart)
      : new Date(date)
  );

  const [inputState, setInputState] = useState({
    startHrs: new Date(historyContext.historyData.sessionstart).getHours()
      ? new Date(historyContext.historyData.sessionstart)
          .getHours()
          .toString()
          .padStart(2, '0')
      : '00',
    startMin: new Date(historyContext.historyData.sessionstart).getMinutes()
      ? new Date(historyContext.historyData.sessionstart)
          .getMinutes()
          .toString()
          .padStart(2, '0')
      : '00',
    startSec: new Date(historyContext.historyData.sessionstart).getSeconds()
      ? new Date(historyContext.historyData.sessionstart)
          .getSeconds()
          .toString()
          .padStart(2, '0')
      : '00',

    stopHrs: new Date(historyContext.historyData.sessionStop).getHours()
      ? new Date(historyContext.historyData.sessionStop)
          .getHours()
          .toString()
          .padStart(2, '0')
      : '00',

    stopMin: new Date(historyContext.historyData.sessionStop).getMinutes()
      ? new Date(historyContext.historyData.sessionStop)
          .getMinutes()
          .toString()
          .padStart(2, '0')
      : '00',
    stopSec: new Date(historyContext.historyData.sessionStop).getSeconds()
      ? new Date(historyContext.historyData.sessionStop)
          .getSeconds()
          .toString()
          .padStart(2, '0')
      : '00',
  });

  const handleDateSelect = (date_) => {
    const select = `${new Date(date_).getFullYear()}/${
      new Date(date_).getMonth() + 1 //must add 1 to get correct month
    }/${new Date(date_).getDate()}`;

    if (new Date(select).getTime() > new Date(date).getTime()) {
      setSelectedDate((perv) => new Date(date));
    } else {
      setSelectedDate((prev) => date_);
    }
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
    ComponentContext.closeDialogEditHistory();
  };

  const handleClickSave = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  const handleInputChagne = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name.match(/Hrs/gi)) {
      if (value % 24 !== 0) {
        setInputState({ ...inputState, [name]: value % 24 });
        if (name === 'stopHrs') {
        }
      }
      if (value % 24 === 0) {
        setInputState({ ...inputState, [name]: 0 });
      }
      if (value < 0) {
        setInputState({ ...inputState, [name]: 23 });
      }
    }
    if (name.match(/Min/gi) || name.match('Sec')) {
      console.log(typeof value);
      console.log(value);
      setInputState({ ...inputState, [name]: value });
      if (value > 59) {
        setInputState({
          ...inputState,
          [name]: 0,
        });
      }
      if (value < 0) {
        setInputState({
          ...inputState,
          [name]: 59,
        });
      }
    }
  };

  return (
    <>
      <div className='dialogEditHistory'>
        <div className='dialogEditHistory__formContainer'>
          <DialogTitle>EDIT HISTORY</DialogTitle>
          <form onSubmit={handleClickSave}>
            <fieldset className='dialogEditHistory__fieldset'>
              <legend>START INFO</legend>
              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor='' style={{ display: 'inline' }}>
                  DATE
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelect}
                  onSelect={handleDateSelect}
                />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor='startHrs'>HRS</label>
                <input
                  type='number'
                  name='startHrs'
                  id='startHrs'
                  pattern='[0-9]{0,5}'
                  value={inputState.startHrs}
                  onChange={handleInputChagne}
                />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor='startMin'>MIN</label>
                <input
                  type='number'
                  name='startMin'
                  id='startMin'
                  pattern='[0-9]{0,5}'
                  value={inputState.startMin}
                  onChange={handleInputChagne}
                />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor='startSec'>SEC</label>
                <input
                  type='number'
                  pattern='[0-9]{0,5}'
                  name='startSec'
                  id='startSec'
                  value={inputState.startSec}
                  onChange={handleInputChagne}
                />
              </div>
            </fieldset>
            <fieldset className='dialogEditHistory__fieldset'>
              <legend>END INFO</legend>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor='stopHrs'>HRS</label>
                <input
                  type='number'
                  name='stopHrs'
                  id='stopHrs'
                  value={inputState.stopHrs}
                  onChange={handleInputChagne}
                />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor='stopMin'>MIN</label>
                <input
                  type='number'
                  pattern='[0-9]{0,5}'
                  name='stopMin'
                  id='stopMin'
                  value={inputState.stopMin}
                  onChange={handleInputChagne}
                />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor='stopSec'>SEC</label>
                <input
                  pattern='[0-9]{0,5}'
                  type='number'
                  name='stopSec'
                  id='stopSec'
                  value={inputState.stopSec}
                  onChange={handleInputChagne}
                />
              </div>
            </fieldset>
            <hr />
            <div className='dialogEditHistory__buttonGroup'>
              <button type='submit' className='saveButton'>
                SAVE
              </button>
              <button
                type='reset'
                onClick={handleClickCancel}
                className='cancelButton'
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
}

export default DialogEditHistory;
