import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { GET_TASK_BY_DATE } from '../graphql/Query';
import Table from './Table';

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

  useEffect(() => {
    if (taskBydateData) {
      const dataSelect = taskBydateData.getTaskByDate;
      // console.log(dataSelect);
      if (dataSelect) {
        const sessionDay = [];

        const session = dataSelect.map((item) => {
          const thisSession = item.session;
          const boothNumber = item.boothNumber;

          if (thisSession && boothNumber) {
            const sessionStart = thisSession.map((items) => {
              const sessionStartDate = new Date(items.sessionStart);
              const sessionStopDate = new Date(items.sessionStop);
              const sessionStartDateString = `${sessionStartDate.getFullYear()}-${(
                sessionStartDate.getMonth() + 1
              )
                .toString()
                .padStart(2, '0')}-${sessionStartDate
                .getDate()
                .toString()
                .padStart(2, '0')}`;

              const sessionStopTimeString = `${sessionStopDate
                .getHours()
                .toString()
                .padStart(2, '0')}:${sessionStopDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${sessionStopDate
                .getSeconds()
                .toString()
                .padStart(2, '0')}`;

              const sessionStartTimeString = `${sessionStartDate
                .getHours()
                .toString()
                .padStart(2, '0')}:${sessionStartDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${sessionStartDate
                .getSeconds()
                .toString()
                .padStart(2, '0')}`;

              const sessionStopDateString = `
                ${sessionStopDate.getFullYear()}-${(
                sessionStopDate.getMonth() + 1
              )
                .toString()
                .padStart(2, '0')}-${sessionStopDate
                .getDate()
                .toString()
                .padStart(2, '0')}
                `;
              const stopDateValue = sessionStopDateString.replace(/ /g, '');
              const regDate = date.replace(/ /g, '');

              if (sessionStartDateString === date) {
                sessionDay.push(
                  Object.assign(
                    {},
                    {
                      start: sessionStartTimeString,
                    },
                    { boothNumber: boothNumber },
                    {
                      stop: `${sessionStopTimeString} (${stopDateValue})`,
                    }
                  )
                );
              }
            });
          }

          return item;
        });
        // console.log(session);
        if (sessionDay.length > 0) {
          // console.log(sessionDay);
          setDataTable(sessionDay);
        }
      }
    }
  }, [taskBydateData]);

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

  const calculDifDate = (date1, date2) => {
    const dif = date2.getTime() - date1.getTime();
    const day = Math.floor(dif / (3600 * 24));
    const hours = Math.floor((dif % 3600.24) / 3600);
    const min = Math.floor((dif % 3600) / 60);
    const sec = Math.floor(dif / 60);

    return { day, hours, min, sec };
  };

  return (
    <div className='historyTable'>
      <Table columns={columns} data={dataTable} />
    </div>
  );
}
