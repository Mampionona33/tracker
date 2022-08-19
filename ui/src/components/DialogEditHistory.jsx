import React, { useContext, useState } from 'react';
import Modale from './Modale';
import '../style/DialogEditHistory.scss';
import { HistoryContext } from '../context/historyContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DialogTitle from './DialogTitle';

function DialogEditHistory() {
  const historyContext = useContext(HistoryContext);
  const [selectedDate, setSelectedDate] = useState(
    historyContext.historyData.sessionstart
      ? new Date(historyContext.historyData.sessionstart)
      : new Date()
  );
  // console.log(historyContext.historyData.sessionstart);
  // console.log(new Date(historyContext.historyData.sessionstart));

  const handleDateSelect = (date) => {
    const select = `${new Date(date).getFullYear()}/${
      new Date(date).getMonth() + 1 //must add 1 to get correct month
    }/${new Date(date).getDate()}`;

    if (new Date(select).getTime() > new Date().getTime()) {
      setSelectedDate((perv) => new Date());
    } else {
      setSelectedDate((prev) => date);
    }
  };

  return (
    <>
      <div className='dialogEditHistory'>
        <div className='dialogEditHistory__formContainer'>
          <DialogTitle>EDIT HISTORY</DialogTitle>
          <form>
            <fieldset>
              <legend>START INFO</legend>
              <div
                className='dialogEditHistory__row'
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <label htmlFor='' style={{ display: 'inline' }}>
                  DATE
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelect}
                  onSelect={handleDateSelect}
                />
              </div>

              <div>
                <label htmlFor=''>HRS</label>
                <input type='number' name='' id='' />
              </div>

              <div>
                <label htmlFor=''>MIN</label>
                <input type='number' name='' id='' />
              </div>

              <div>
                <label htmlFor=''>SEC</label>
                <input type='number' name='' id='' />
              </div>
            </fieldset>
            <fieldset>
              <legend>END INFO</legend>
              <div>
                <label htmlFor=''>HRS</label>
                <input type='number' name='' id='' />
              </div>

              <div>
                <label htmlFor=''>MIN</label>
                <input type='number' name='' id='' />
              </div>

              <div>
                <label htmlFor=''>SEC</label>
                <input type='number' name='' id='' />
              </div>
            </fieldset>
            <hr />
            <div className='buttonGroup'>
              <button>SAVE</button>
              <button>CANCEL</button>
            </div>
          </form>
        </div>
      </div>
      <Modale />
    </>
  );
}

export default DialogEditHistory;
