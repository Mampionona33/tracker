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

      const taskInSelectedDate = dataSelect.map((item) => {
        let start = ``;
        let stop = ``;
        let duration = null;
        let sessionId = 0;
        const boothNumber = item.boothNumber;

        for (let i = 0; i < item.session.length; i++) {
          const startTmp = item.session[i].sessionStart;
          sessionId = i;
          if (startTmp.slice(0, 10) === date) {
            const strDate = new Date(startTmp);
            start = `${strDate.getHours()}:${strDate.getMinutes()}:${strDate.getSeconds()}`;
            const stopTmp = item.session[i].sessionStop;

            // if task state set to pause or stop
            if (stopTmp) {
              const stpDate = new Date(stopTmp);
              const refDate = new Date(date);

              // if stop date is equal to the selected date
              if (
                stpDate.getFullYear() === refDate.getFullYear() &&
                stpDate.getMonth() === refDate.getMonth() &&
                stpDate.getDate() === refDate.getDate()
              ) {
                stop = `${stpDate.getHours()}:${stpDate.getMinutes()}:${stpDate.getSeconds()}`;

                duration = `${(stpDate.getHours() - strDate.getHours())
                  .toString()
                  .padStart(2, '0')} hours, ${
                  stpDate.getMinutes() >= strDate.getMinutes()
                    ? (stpDate.getMinutes() - strDate.getMinutes())
                        .toString()
                        .padStart(2, '0')
                    : (59 + stpDate.getMinutes() - strDate.getMinutes())
                        .toString()
                        .padStart(2, '0')
                } minutes and
                
                ${
                  stpDate.getSeconds() >= strDate.getSeconds()
                    ? (stpDate.getSeconds() - strDate.getSeconds())
                        .toString()
                        .padStart(2, '0')
                    : (60 + stpDate.getSeconds() - strDate.getSeconds())
                        .toString()
                        .padStart(2, '0')
                }`;
              }

              // if stop date is different to the selected date
              if (
                stpDate.getFullYear() === refDate.getFullYear() &&
                stpDate.getMonth() === refDate.getMonth() &&
                stpDate.getDate() !== refDate.getDate()
              ) {
                stop = `${stpDate.getHours()}:${stpDate.getMinutes()}:${stpDate.getSeconds()} (${stpDate.getFullYear()}-${stpDate.getMonth()}-${stpDate.getDate()})`;
                duration = `                ${
                  stpDate.getMonth() === strDate.getMonth() &&
                  (stpDate.getDate() - strDate.getDate() - 1)
                    .toString()
                    .padStart(2, '0')
                } days,                ${
                  stpDate.getHours() > strDate.getHours()
                    ? (stpDate.getHours() - strDate.getHours())
                        .toString()
                        .padStart(2, '0')
                    : (24 + stpDate.getHours() - strDate.getHours())
                        .toString()
                        .padStart(2, '0')
                } hours, ${
                  stpDate.getMinutes() > strDate.getMinutes()
                    ? (stpDate.getMinutes() - strDate.getMinutes())
                        .toString()
                        .padStart(2, '0')
                    : (59 + stpDate.getMinutes() - strDate.getMinutes())
                        .toString()
                        .padStart(2, '0')
                } minutes and               
                ${
                  stpDate.getSeconds() > strDate.getSeconds()
                    ? (stpDate.getSeconds() - strDate.getSeconds())
                        .toString()
                        .padStart(2, '0')
                    : (
                        60 +
                        stpDate.getSeconds() -
                        strDate.getSeconds()
                      ).toString(2, '0')
                } secondes`;
              }
            }

            // if task is still on play mode
            if (!stopTmp) {
              stop = `current`;
            }
          }
        }

        return { sessionId, boothNumber, start, stop, duration };
      });

      if (taskInSelectedDate) {
        console.log(taskInSelectedDate);
        setDataTable(taskInSelectedDate);
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

  return (
    <div className='historyTable'>
      <Table columns={columns} data={dataTable} />
    </div>
  );
}
