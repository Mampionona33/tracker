import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AuthConext } from '../../context/authContext';
import { GET_USER_TASK } from '../../Graphql/Query';
import { HistoryTableCont } from './HistoryTable.styled';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { difDate } from '../../assets/timeUtility';

const HistoryTable = () => {
  const { sub } = useContext(AuthConext);
  const { date } = useParams();
  const [columnData, setColumnData] = useState([]);
  const {
    data: userTasks,
    error: errorFetchUserTasks,
    loading: loadingUsertask,
  } = useQuery(GET_USER_TASK, { variables: { input: { sub: sub } } });

  useEffect(() => {
    if (userTasks && userTasks.getUserTask) {
      const sessionTask = [];
      Array.from(userTasks.getUserTask).map((item) => {
        const boothNumber = item.boothNumber;
        Array.from(item.session).map((el) => {
          //   console.log(el);

          const selectedDate = moment(el.sessionStart).format('DD-MM-YYYY');

          if (selectedDate === date) {
            console.log(boothNumber);

            console.log('dif date', difDate(el.sessionStart, el.sessionStop));

            sessionTask.push({
              boothNumber: boothNumber,
              sessionStart: moment(el.sessionStart).format('HH:mm:ss'),
              sessionStop: moment(el.sessionStop).format('HH:mm:ss'),
            });
            // console.log(
            //   boothNumber,
            //   'start : ',
            //   moment(el.sessionStart).format('HH:mm:ss'),
            //   'stop :',
            //   moment(el.sessionStop).format('HH:mm:ss')
            // );
          }
        });
      });

      if (sessionTask.length > 0) {
        setColumnData(sessionTask);
      }
    }
  }, [userTasks]);

  const column = [
    {
      name: 'BOOTH NUMBER',
      selector: (row) => row.boothNumber,
    },
    {
      name: 'START',
      selector: (row) => row.sessionStart,
    },
    {
      name: 'STOP',
      selector: (row) => row.sessionStop,
    },
    {
      name: 'DURATION',
    },
    {
      name: 'ACTION',
    },
  ];

  return (
    <HistoryTableCont>
      <DataTable columns={column} data={columnData} />
    </HistoryTableCont>
  );
};

export default HistoryTable;
