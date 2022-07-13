import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/History.scss';
import HistoryTable from '../components/HistoryTable';
import { HistoryContext } from '../context/historyContext';
import { useNavigate } from 'react-router-dom';
export default function History(props) {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateContext = useContext(HistoryContext);
  const selelctedDate = new Date(selectedDateContext.selectedDate);
  const stringDate = `${selelctedDate.getFullYear()}-${selelctedDate.getMonth()}-${selelctedDate.getDate()}`;
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    selectedDateContext.setSelectedDate(date);
    navigate(`date=${stringDate}`);
    console.log(stringDate);
  };

  return (
    <>
      <div className='history'>
        <div className='history__cont'>
          <div className='date_piker_cont'>
            <DatePicker
              selected={selectedDateContext.selectedDate}
              onChange={(date) => handleDateSelect(date)}
              onSelect={(date) => handleDateSelect(date)}
            />
          </div>
          <HistoryTable selectedDate={selectedDateContext.selectedDate} />
        </div>
      </div>
    </>
  );
}
