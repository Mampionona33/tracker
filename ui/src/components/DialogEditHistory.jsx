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
      : new Date()
  );

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
                <label htmlFor=''>HRS</label>
                <input type='number' name='' id='' />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor=''>MIN</label>
                <input type='number' name='' id='' />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor=''>SEC</label>
                <input type='number' name='' id='' />
              </div>
            </fieldset>
            <fieldset className='dialogEditHistory__fieldset'>
              <legend>END INFO</legend>
              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor=''>HRS</label>
                <input type='number' name='' id='' />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor=''>MIN</label>
                <input type='number' name='' id='' />
              </div>

              <div className='dialogEditHistory__fieldset__row'>
                <label htmlFor=''>SEC</label>
                <input type='number' name='' id='' />
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
