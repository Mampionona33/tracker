import React from 'react';
import DataTable from 'react-data-table-component';
import useGetPendingTask from '../../assets/Hooks/useGetPendingTask';
import { customStyle, PendingTaskTableCont } from './PendingTaskTable.styled';

const PendingTaskTable = () => {
  const { pendingTask } = useGetPendingTask();
  console.log(pendingTask);

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
  ];
  console.log(column.map((item) => item.name));

  return (
    <PendingTaskTableCont columnHeader={column.map((item) => item.name)}>
      <DataTable
        columns={column}
        data={pendingTask}
        customStyles={customStyle}
      />
    </PendingTaskTableCont>
  );
};

export default PendingTaskTable;
