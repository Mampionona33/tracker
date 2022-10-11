import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { AuthConext } from '../../context/authContext';
import { GET_USER_TASK } from '../../Graphql/Query';
import { HistoryTableCont } from './HistoryTable.styled';

const HistoryTable = () => {
  const { sub } = useContext(AuthConext);
  const {
    data: userTasks,
    error: errorFetchUserTasks,
    loading: loadingUsertask,
  } = useQuery(GET_USER_TASK, { variables: { input: { sub: sub } } });

  useEffect(() => {
    if (userTasks && userTasks.getUserTask) {
      const session = Array.from(userTasks.getUserTask).map(
        (item) => item.session
      );
      console.log(session);
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
