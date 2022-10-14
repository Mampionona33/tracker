import React, { useEffect, useState } from 'react';
import { HistoryCont, HistoryCont1 } from './History.styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const History = () => {
  const { date } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const handleChange = (date) => {
    setSelectedDate(date);
    navigate(`/history/date=${moment(date).format('DD-MM-YYYY')}`);
  };

  useEffect(() => {
    if (date) {
      const [day, month, year] = date.split('-');
      const formatedDate = new Date(+year, month - 1, +day);
      setSelectedDate(new Date(formatedDate));
    }
  }, [date]);

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
