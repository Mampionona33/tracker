import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { AuthConext } from '../../context/authContext';
import { GET_USER_TASK } from '../../Graphql/Query';
import { HistoryTableCont } from './HistoryTable.styled';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const HistoryTable = () => {
  const { sub } = useContext(AuthConext);
  const { date } = useParams();
  const {
    data: userTasks,
    error: errorFetchUserTasks,
    loading: loadingUsertask,
  } = useQuery(GET_USER_TASK, { variables: { input: { sub: sub } } });

  useEffect(() => {
    if (userTasks && userTasks.getUserTask) {
      Array.from(userTasks.getUserTask).map((item) => {
        const boothNumber = item.boothNumber;
        Array.from(item.session).map((el) => {
          //   console.log(el);

          const selectedDate = moment(el.sessionStart).format('DD-MM-YYYY');

          if (selectedDate === date) {
            console.log(
              boothNumber,
              'start : ',
              moment(el.sessionStart).format('HH:mm:ss'),
              'stop :',
              moment(el.sessionStop).format('HH:mm:ss')
            );
          }
        });
      });
    }
  }, [userTasks]);

  const column = [
    {
      name: 'BOOTH NUMBER',
    },
    {
      name: 'START',
    },
    {
      name: 'STOP',
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
      <DataTable columns={column} />
    </HistoryTableCont>
  );
};

export default HistoryTable;
