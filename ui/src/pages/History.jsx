import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/History.scss';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function History(props) {
  const { date, row_show } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState(
    date !== undefined ? new Date(date) : new Date(),
    row_show !== undefined ? row_show : 7
  );

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    navigate(
      `date=${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${new Date(date)
        .getDate()
        .toString()
        .padStart(2, '0')}&row_show=${row_show}`,
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
          .padStart(2, '0')}&row_show=${row_show !== undefined ? row_show : 7}`
      );
    }
  }, [date, row_show]);

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
