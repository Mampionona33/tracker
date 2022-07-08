import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_TASK_BY_DATE } from '../graphql/Query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function History(props) {
  const userContext = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: taskByDate, error: errorFetchTaskByDate } = useQuery(
    GET_TASK_BY_DATE,
    {
      variables: {
        query: {
          date: selectedDate.toISOString(),
          sub: userContext.user.sub,
        },
      },
    }
  );

  useEffect(() => {
    if (taskByDate) {
      console.log(taskByDate.getTaskByDate);
    }
  }, [taskByDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className='history'>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          onSelect={(date) => handleDateSelect(date)}
        />
      </div>
    </>
  );
}
