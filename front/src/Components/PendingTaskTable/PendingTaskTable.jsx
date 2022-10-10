import React from 'react';
import DataTable from 'react-data-table-component';
import useGetPendingTask from '../../assets/Hooks/useGetPendingTask';
import { difDate, secondToDayHourMinSec } from '../../assets/timeUtility';
import PendingTaskPlayBtn from '../PendingTaskPlayBtn/PendingTaskPlayBtn';
import { customStyle, PendingTaskTableCont } from './PendingTaskTable.styled';

const PendingTaskTable = () => {
  const { pendingTask } = useGetPendingTask();

  const tableHeader = (txt) => txt.toString().toUpperCase();
  const column = [
    {
      name: 'BOOTH NUMBER',
      selector: (row) => row.boothNumber,
      sortable: true,
      grow: 2,
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
      grow: 3,
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
      name: tableHeader('elapsted time'),
      grow: 5,
      selector: (row) => {
        const elapstedTimeInSec = Array.from(row.session)
          .map((item) => {
            return difDate(item.sessionStart, item.sessionStop);
          })
          .reduce((a, b) => a + b);

        const elapstedDay = secondToDayHourMinSec(elapstedTimeInSec).day;
        const elapstedHours = secondToDayHourMinSec(elapstedTimeInSec).hours;
        const elapstedMin = secondToDayHourMinSec(elapstedTimeInSec).minutes;
        const elapstedSec = secondToDayHourMinSec(elapstedTimeInSec).secondes;

        return (
          <>
            {elapstedDay === 1
              ? `${elapstedDay.toString().padStart(2, '0')} Day - `
              : elapstedDay > 1
              ? `${elapstedDay.toString().padStart(2, '0')} Days - `
              : ''}
            {elapstedHours === 1
              ? ` ${elapstedHours.toString().padStart(2, '0')} Hour - `
              : elapstedHours > 1
              ? ` ${elapstedHours.toString().padStart(2, '0')} Hours -`
              : ''}
            {elapstedMin === 1
              ? ` ${elapstedMin.toString().padStart(2, '0')} Minute -`
              : elapstedMin > 1
              ? ` ${elapstedMin.toString().padStart(2, '0')} Minutes -`
              : ''}
            {elapstedSec === 1
              ? ` ${elapstedSec.toString().padStart(2, '0')} Seconde`
              : elapstedSec > 1
              ? ` ${elapstedSec.toString().padStart(2, '0')} Secondes`
              : ''}
          </>
        );
      },
      sortable: true,
    },
    {
      name: 'ACTION',
      center: true,
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
    <PendingTaskTableCont>
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
