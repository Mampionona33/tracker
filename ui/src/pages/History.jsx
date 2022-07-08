import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_TASK_BY_DATE } from '../graphql/Query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/History.scss';
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
        <div className='history__cont'>
          <div className='date_piker_cont'>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              onSelect={(date) => handleDateSelect(date)}
            />
          </div>
          <table className='history__cont__table'>
            <thead className='history__cont__table__head'>
              <tr className='history__cont__table__head__title'>
                <th className='border__round__top__left'>BOOTH NUMBER</th>
                <th className='border__round__top'>SESSION</th>
                <th className='border__round__top__right'>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr className='rows'>
                <td>test</td>
                <td>test2</td>
                <td>ACTION</td>
              </tr>
              <tr className='rows'>
                <td>test</td>
                <td>test2</td>
                <td>ACTION</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
