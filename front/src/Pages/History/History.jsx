import React, { useState } from 'react';
import { HistoryCont, HistoryCont1 } from './History.styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Outlet, useParams } from 'react-router-dom';

const History = () => {
  const { date } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <HistoryCont>
      <HistoryCont1>
        <DatePicker
          selected={selectedDate}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => handleChange(date)}
          onSelect={(date) => handleChange(date)}
        />
      </HistoryCont1>
      <Outlet />
    </HistoryCont>
  );
};

export default History;
