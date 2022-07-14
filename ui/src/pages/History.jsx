import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/History.scss';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export default function History(props) {
  const { date } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    date !== undefined ? new Date(date) : new Date()
  );

  const handleDateSelect = (date) => {
    console.log(date);
    setSelectedDate(date);
    navigate(
      `date=${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${new Date(date)
        .getDate()
        .toString()
        .padStart(2, '0')}`,
      { replace: true }
    );
  };

  useEffect(() => {
    if (date === undefined) {
      navigate(
        `date=${new Date().getFullYear()}-${(new Date().getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${new Date()
          .getDate()
          .toString()
          .padStart(2, '0')}`
      );
    }
  }, [date]);

  return (
    <>
      <div className='history'>
        <div className='history__cont'>
          <div className='date_piker_cont'>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => handleDateSelect(date)}
              onSelect={(date) => handleDateSelect(date)}
            />
          </div>
          {/* this Outlet will be render when url get parmas date */}
          <Outlet />
        </div>
      </div>
    </>
  );
}
