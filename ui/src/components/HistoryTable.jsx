import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { duration } from '../assets/img/duration';
import { AuthContext } from '../context/authContext';
import { GET_TASK_BY_DATE, GET_USER_TASK } from '../graphql/Query';
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

  const { data: userTasks, error: errorFetchingUserTask } = useQuery(
    GET_USER_TASK,
    {
      variables: {
        input: {
          sub: userContext.user.sub,
        },
      },
    }
  );

  const dateToString = (dt) => {
    const newDate = new Date(dt);
    return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (userTasks && userTasks.getUserTask.length > 0) {
      const tasks = userTasks.getUserTask;

      const sessions = tasks.map((item) => {
        const result = {};
        for (let i = 0; i < item.session.length; i++) {
          const sessionStartDate = item.session[i].sessionStart;
          const sessionStopDate = item.session[i].sessionStop;

          if (
            dateToString(sessionStartDate) === date ||
            dateToString(sessionStopDate) === date ||
            sessionStopDate === null
          ) {
            result.id = item.id;
            result.boothNumber = item.boothNumber;
            result.start = sessionStartDate;
            result.stop = sessionStopDate;
          }
        }
        return result;
      });

      const sessionClearEmptyObj = sessions.filter((element) => {
        if (Object.keys(element).length !== 0) {
          return true;
        }
        return false;
      });

      if (sessionClearEmptyObj.length > 0) {
        console.log(sessionClearEmptyObj);
        const sortedSession = sessionClearEmptyObj.sort((a, b) =>
          a.start > b.start ? 1 : -1
        );
        setDataTable(sortedSession);
      }
    }
  }, [userTasks]);

  // useEffect(() => {
  //   if (taskBydateData) {
  //     const dataSelect = taskBydateData.getTaskByDate;
  //     const sessionArray = [];

  //     if (dataSelect.length > 0) {
  //       for (let i = 0; i < dataSelect.length; i++) {
  //         const boothNumbers = dataSelect[i].boothNumber;

  //         for (let a = 0; a < dataSelect[i].session.length; a++) {
  //           if (dataSelect[i].session[a].sessionStart) {
  //             const startDt = Object.values(
  //               dataSelect[i].session[a].sessionStart
  //             ).join('');

  //             const stopDt =
  //               dataSelect[i].session[a].sessionStop &&
  //               Object.values(dataSelect[i].session[a].sessionStop).join('');

  //             const startDate = new Date(startDt);
  //             const stopDate = new Date(stopDt);

  //             const fullStrDate = `${startDate.getFullYear()}-${(
  //               startDate.getMonth() + 1
  //             )
  //               .toString()
  //               .padStart(2, '0')}-${startDate
  //               .getDate()
  //               .toString()
  //               .padStart(2, '0')}`;

  //             const fullStpDate = `${stopDate.getFullYear()}-${(
  //               stopDate.getMonth() + 1
  //             )
  //               .toString()
  //               .padStart(2, '0')}-${stopDate
  //               .getDate()
  //               .toString()
  //               .padStart(2, '0')}`;

  //             const startTime = `${startDate
  //               .getHours()
  //               .toString()
  //               .padStart(2, '0')}:${startDate
  //               .getMinutes()
  //               .toString()
  //               .padStart(2, '0')}:${startDate
  //               .getSeconds()
  //               .toString()
  //               .padStart(2, '0')}`;

  //             const stopTime = `${stopDate
  //               .getHours()
  //               .toString()
  //               .padStart(2, '0')}:${stopDate
  //               .getMinutes()
  //               .toString()
  //               .padStart(2, '0')}:${stopDate
  //               .getSeconds()
  //               .toString()
  //               .padStart(2, '0')}`;

  //             if (fullStrDate === date) {
  //               const dur = duration(startDate, stopDate);
  //               if (fullStpDate === date) {
  //                 sessionArray.push(
  //                   Object.assign(
  //                     {},
  //                     {
  //                       boothNumber: boothNumbers,
  //                       start: startTime,
  //                       stop: stopTime,
  //                       duration: dur,
  //                     }
  //                   )
  //                 );
  //               } else {
  //                 sessionArray.push(
  //                   Object.assign(
  //                     {},
  //                     {
  //                       boothNumber: boothNumbers,
  //                       start: startTime,
  //                       // if stop date is not the same as date(params) and not null => show stopTime (fullStpDate)
  //                       // else if stop date is null => show Processing
  //                       stop: dataSelect[i].session[a].sessionStop
  //                         ? `${stopTime} (${fullStpDate})`
  //                         : 'Processing',
  //                       duration: dur,
  //                     }
  //                   )
  //                 );
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }

  //     if (dataSelect.length <= 0) {
  //       setDataTable([]);
  //     }

  //     if (sessionArray.length > 0) {
  //       // create a new sorted array by start date
  //       const sortByStartDate = sessionArray.sort((a, b) =>
  //         a.start > b.start ? 1 : -1
  //       );

  //       setDataTable(sortByStartDate);
  //     }
  //   }
  // }, [taskBydateData]);

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

  return (
    <div className='historyTable'>
      <TableWithPagination columns={columns} data={dataTable} />
    </div>
  );
}
