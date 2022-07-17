import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { duration } from '../assets/img/duration';
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
      const sessionArray = [];

      if (dataSelect.length > 0) {
        for (let i = 0; i < dataSelect.length; i++) {
          // console.log(dataSelect[i].session);

          const boothNumbers = dataSelect[i].boothNumber;

          for (let a = 0; a < dataSelect[i].session.length; a++) {
            // console.log(dataSelect[i].session[a]);
            if (dataSelect[i].session[a].sessionStop) {
              // console.log(
              //   Object.values(dataSelect[i].session[a].sessionStop).join('')
              // );

              const startDt = Object.values(
                dataSelect[i].session[a].sessionStart
              ).join('');

              const stopDt = Object.values(
                dataSelect[i].session[a].sessionStop
              ).join('');

              const startDate = new Date(startDt);
              const stopDate = new Date(stopDt);

              const fullStrDate = `${startDate.getFullYear()}-${(
                startDate.getMonth() + 1
              )
                .toString()
                .padStart(2, '0')}-${startDate
                .getDate()
                .toString()
                .padStart(2, '0')}`;

              const fullStpDate = `${stopDate.getFullYear()}-${(
                stopDate.getMonth() + 1
              )
                .toString()
                .padStart(2, '0')}-${stopDate
                .getDate()
                .toString()
                .padStart(2, '0')}`;

              const startTime = `${startDate
                .getHours()
                .toString()
                .padStart(2, '0')}:${startDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${startDate
                .getSeconds()
                .toString()
                .padStart(2, '0')}`;

              const stopTime = `${stopDate
                .getHours()
                .toString()
                .padStart(2, '0')}:${stopDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${stopDate
                .getSeconds()
                .toString()
                .padStart(2, '0')}`;

              if (fullStrDate === date) {
                const dur = duration(startDate, stopDate);
                if (fullStpDate === date) {
                  sessionArray.push(
                    Object.assign(
                      {},
                      {
                        boothNumber: boothNumbers,
                        start: startTime,
                        stop: stopTime,
                        duration: dur,
                      }
                    )
                  );
                } else {
                  sessionArray.push(
                    Object.assign(
                      {},
                      {
                        boothNumber: boothNumbers,
                        start: startTime,
                        stop: `${stopTime} (${fullStpDate})`,
                        duration: dur,
                      }
                    )
                  );
                }
              }
            }
          }
        }
      }

      if (sessionArray.length > 0) {
        setDataTable(sessionArray);
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
