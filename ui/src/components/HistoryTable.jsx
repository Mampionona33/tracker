import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  dateTime,
  dateToYearMonthDay,
  difDate,
  secondToDayHourMinSec,
} from '../assets/timeUtility';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import { HistoryContext } from '../context/historyContext';
import { GET_TASK_BY_DATE, GET_USER_TASK } from '../graphql/Query';
import Loading from './Loading';
import TableWithPagination from './TableWithPagination';

export default function HistoryTable() {
  const userContext = useContext(AuthContext);
  const historyContext = useContext(HistoryContext);

  // get the date from the url params
  const { date } = useParams();

  const [dataTable, setDataTable] = useState([]);

  const componentContext_ = useContext(componentContext);

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

  const handleClickEditIcon = (event, data) => {
    event.preventDefault();
    historyContext.setHistoryData(data);
    componentContext_.openDialogEditHistory();
  };

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

            const session_id = session[a].session_id;

            // console.log('session_id', session_id);

            // if start date == selected date and stop date != null => show start date(hh:mm:ss) and stop date(hh:mm:ss)
            if (dateToYearMonthDay(sessionStart) === date) {
              if (dateToYearMonthDay(sessionStop) === date) {
                const day = secondToDayHourMinSec(
                  difDate(sessionStart, sessionStop)
                ).day;
                const hrs = secondToDayHourMinSec(
                  difDate(sessionStart, sessionStop)
                ).hours;
                const min = secondToDayHourMinSec(
                  difDate(sessionStart, sessionStop)
                ).minutes;
                const sec = secondToDayHourMinSec(
                  difDate(sessionStart, sessionStop)
                ).secondes;

                selectedDateSession.push({
                  id: id,
                  boothNumber: boothNumber,
                  start: dateTime(sessionStart),
                  stop: dateTime(sessionStop),
                  sessionstart: sessionStart,
                  sessionStop: sessionStop,
                  session_id: session_id,
                  duration: `${
                    day > 0 ? day.toString().padStart(2, '0') : ''
                  } ${day > 0 && day > 1 ? 'Days - ' : ''} ${
                    day > 0 && day === 1 ? 'Day - ' : ''
                  } ${hrs > 0 ? hrs.toString().padStart(2, '0') : ''} ${
                    hrs > 1 ? 'Hours - ' : ''
                  } ${hrs === 1 ? 'Hour - ' : ''} ${
                    min > 0 ? min.toString().padStart(2, '0') + ' Min - ' : ''
                  } ${sec > 0 ? sec.toString().padStart(2, '0') + ' Sec' : ''}`,
                });
              }
              if (dateToYearMonthDay(sessionStop) > date) {
                selectedDateSession.push({
                  id: id,
                  boothNumber: boothNumber,
                  start: dateTime(sessionStart),
                  sessionstart: sessionStart,
                  sessionStop: sessionStop,
                  session_id: session_id,
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
              const day = secondToDayHourMinSec(
                difDate(sessionStart, sessionStop)
              ).day;
              const hrs = secondToDayHourMinSec(
                difDate(sessionStart, sessionStop)
              ).hours;
              const min = secondToDayHourMinSec(
                difDate(sessionStart, sessionStop)
              ).minutes;
              const sec = secondToDayHourMinSec(
                difDate(sessionStart, sessionStop)
              ).secondes;

              selectedDateSession.push({
                id: id,
                boothNumber: boothNumber,
                sessionstart: sessionStart,
                sessionStop: sessionStop,
                session_id: session_id,
                start: `${dateTime(sessionStart)} (${dateToYearMonthDay(
                  sessionStart
                )})`,
                stop: dateTime(sessionStop),
                duration: `${day > 0 ? day.toString().padStart(2, '0') : ''} ${
                  day > 0 && day > 1 ? 'Days - ' : ''
                } ${day > 0 && day === 1 ? 'Day - ' : ''} ${
                  hrs > 0 ? hrs.toString().padStart(2, '0') : ''
                } ${hrs > 1 ? 'Hours - ' : ''} ${hrs === 1 ? 'Hour - ' : ''} ${
                  min > 0 ? min.toString().padStart(2, '0') + ' Min - ' : ''
                } ${sec > 0 ? sec.toString().padStart(2, '0') + ' Sec' : ''}`,
              });
            }
            // if start date == selected date and stop date == null => show start date(hh:mm:ss) and stop : CURRENT
            if (dateToYearMonthDay(sessionStart) === date && !sessionStop) {
              selectedDateSession.push({
                id: id,
                boothNumber: boothNumber,
                sessionstart: sessionStart,
                session_id: session_id,
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
      accessor: (data) => {
        console.log(data);
        return (
          <div
            className='actions'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <span
              onClick={(event) => handleClickEditIcon(event, data)}
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
