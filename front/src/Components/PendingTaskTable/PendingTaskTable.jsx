import React from 'react';
import DataTable from 'react-data-table-component';
import useGetPendingTask from '../../assets/Hooks/useGetPendingTask';
import PendingTaskPlayBtn from '../PendingTaskPlayBtn/PendingTaskPlayBtn';
import { customStyle, PendingTaskTableCont } from './PendingTaskTable.styled';

const PendingTaskTable = () => {
  const { pendingTask } = useGetPendingTask();

  const column = [
    {
      name: 'BOOTH NUMBER',
      selector: (row) => row.boothNumber,
      sortable: true,
    },
    {
      name: 'STATUS COM',
      selector: (row) => row.statCom,
      sortable: true,
    },
    {
      name: 'CAT',
      selector: (row) => row.cat,
      sortable: true,
    },
    {
      name: 'NB BEFORE',
      selector: (row) => row.nbBefore,
      sortable: true,
    },
    {
      name: 'NB AFTER',
      selector: (row) => row.nbAfter,
      sortable: true,
    },
    {
      name: 'ACTION',
      selector: (row) => {
        return (
          <>
            <PendingTaskPlayBtn clickedTask={row} />
          </>
        );
      },
      sortable: true,
    },
  ];

  const paginationRowsPerPageOptions = [5, 8, 10, 13];

  return (
    <PendingTaskTableCont columnHeader={column.map((item) => item.name)}>
      <DataTable
        columns={column}
        data={pendingTask}
        customStyles={customStyle}
        pagination
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      />
    </PendingTaskTableCont>
  );
};

export default PendingTaskTable;
