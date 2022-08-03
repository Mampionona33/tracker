import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { duration } from '../assets/img/duration';
import { dateTime, dateToYearMonthDay } from '../assets/img/timeUtility';
import { AuthContext } from '../context/authContext';
import { GET_TASK_BY_DATE, GET_USER_TASK } from '../graphql/Query';
import Loading from './Loading';
import TableWithPagination from './TableWithPagination';

export default function HistoryTable() {
  const userContext = useContext(AuthContext);

  // get the date from the url params
  const { date } = useParams();

  const [dataTable, setDataTable] = useState([]);

  const { data: taskBydateData, error: errorFetchTaskByDate } = useQuery(
    GET_TASK_BY_DATE,
    {
      variables: {
        query: {
          date: date,
          sub: userContext.user.sub,
        },
      },
    }
  );

  const {
    data: userTasks,
    error: errorFetchingUserTask,
    loading: loadingUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: userContext.user.sub,
      },
    },
  });

  useEffect(() => {
    if (userTasks) {
      const tasks = userTasks.getUserTask;
      const selectedDateSession = [];

      if (tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
          const boothNumber = tasks[i].boothNumber;
          const id = tasks[i].id;
          const session = Array.from(tasks[i].session);

          for (let a = 0; a < session.length; a++) {
            const sessionStart = session[a].sessionStart;
            const sessionStop = session[a].sessionStop;

            // if start date == selected date and stop date != null => show start date(hh:mm:ss) and stop date(hh:mm:ss)
            if (dateToYearMonthDay(sessionStart) === date) {
              if (dateToYearMonthDay(sessionStop) === date) {
                selectedDateSession.push({
                  id: id,
                  boothNumber: boothNumber,
                  start: dateTime(sessionStart),
                  stop: dateTime(sessionStop),
                  sessionstart: sessionStart,
                });
              }
              if (dateToYearMonthDay(sessionStop) > date) {
                selectedDateSession.push({
                  id: id,
                  boothNumber: boothNumber,
                  start: dateTime(sessionStart),
                  sessionstart: sessionStart,
                  stop: `${dateTime(sessionStop)} (${dateToYearMonthDay(
                    sessionStop
                  )})`,
                });
              }
            }
            // if start date < date and stop date == date => show start date ((yyyy-MM-dd) hh:mm:ss) and stop date (hh:mm:ss)
            if (
              dateToYearMonthDay(sessionStart) < date &&
              dateToYearMonthDay(sessionStop) === date
            ) {
              selectedDateSession.push({
                id: id,
                boothNumber: boothNumber,
                sessionstart: sessionStart,
                start: `${dateTime(sessionStart)} (${dateToYearMonthDay(
                  sessionStart
                )})`,
                stop: dateTime(sessionStop),
              });
            }
            // if start date == selected date and stop date == null => show start date(hh:mm:ss) and stop : CURRENT
            if (dateToYearMonthDay(sessionStart) === date && !sessionStop) {
              selectedDateSession.push({
                id: id,
                boothNumber: boothNumber,
                sessionstart: sessionStart,
                start: dateTime(sessionStart),
                stop: 'CURRENT',
              });
            }
            // if start date < selected date and stop date == null => show start date( hh:mm:ss (yyyy-mm-dd) ) and stop :CURRENT
            if (
              dateToYearMonthDay(sessionStart) < date &&
              !sessionStop &&
              date <= dateToYearMonthDay(new Date())
            ) {
              selectedDateSession.push({
                id: id,
                boothNumber: boothNumber,
                sessionstart: sessionStart,
                start: ` ${dateTime(sessionStart)} (${dateToYearMonthDay(
                  sessionStart
                )})`,
                stop: 'CURRENT',
              });
            }
          }
        }
      }
      if (selectedDateSession.length > 0) {
        // removing duplicate object from selectedDateSession by sessionstart
        const uniqueStart = [];
        const removeDuplicate = selectedDateSession.filter((el) => {
          const isDuplicate = uniqueStart.includes(el.sessionstart);
          if (!isDuplicate) {
            uniqueStart.push(el.sessionstart);
            return true;
          }
          return false;
        });

        // sorting array before sending it to table
        const sortedDataSession = removeDuplicate.sort((a, b) => {
          const a_start = new Date(a.sessionstart).getTime();
          const b_start = new Date(b.sessionstart).getTime();
          return a_start - b_start;
        });
        // if there is data set it to the state data
        setDataTable((pev) => sortedDataSession);
      }

      // if there is no data clear data
      if (selectedDateSession.length <= 0) {
        setDataTable((pev) => []);
      }
    }
  }, [userTasks, date]);

  const columns = [
    {
      Header: 'BoothNumber',
      accessor: 'boothNumber',
    },
    {
      Header: 'Start',
      accessor: 'start',
    },
    {
      Header: 'Stop',
      accessor: 'stop',
    },
    {
      Header: 'Duration',
      accessor: 'duration',
    },
    {
      Header: 'Action',
      accessor: () => {
        return (
          <div
            className='actions'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <span
              className='material-icons-round'
              style={{ cursor: 'pointer', color: '#5e2750' }}
            >
              edit
            </span>
          </div>
        );
      },
    },
  ];

  if (loadingUserTask) {
    return <Loading />;
  }

  return (
    <div className='historyTable'>
      <TableWithPagination columns={columns} data={dataTable} />
    </div>
  );
}
