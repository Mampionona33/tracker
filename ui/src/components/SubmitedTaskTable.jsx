import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';
import { DataGrid } from '@mui/x-data-grid';
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Box,
} from '@mui/material';
import { dateToYearMonthDay } from '../assets/timeUtility';
import '../style/SubmitedTaskTable.scss';

export default function SubmitedTaskTable() {
  const userContext = useContext(AuthContext);
  const [currentTask, setCurrentTask] = useState([]);
  const [pageSize, setPageSize] = useState(7);
  const {
    data: userTask,
    error: errorFetchingUserTask,
    loading: loadingUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: userContext.user.sub,
      },
    },
  });

  useEffect(() => {
    if (userTask && userTask.getUserTask) {
      const taskDoneList = Array.from(userTask.getUserTask).filter(
        (item) => item.taskState === 'isDone'
      );
      taskDoneList &&
        taskDoneList.length > 0 &&
        (setCurrentTask((prev) => taskDoneList), console.log(taskDoneList));
    }
  }, [userTask]);

  const columns = [
    {
      field: 'boothNumber',
      headerName: 'BOOTH NUMBER',
      cellClassName: 'spaceBetween',
    },
    { field: 'ivpn', headerName: 'IVPN', cellClassName: 'spaceBetween' },
    {
      field: 'statCom',
      headerName: 'STATUS COM',
      cellClassName: 'spaceBetween',
    },
    {
      field: 'nbBefore',
      headerName: 'NB BEFORE',
      cellClassName: 'spaceBetween',
    },
    { field: 'nbAfter', headerName: 'NB AFTER', cellClassName: 'spaceBetween' },
    { field: 'cat', headerName: 'CAT', cellClassName: 'cat', flex: 1 },
    {
      field: 'url',
      headerName: 'URL',
      cellClassName: 'spaceBetween',
      flex: 1,
      renderCell: (params) => {
        return (
          <a href={params.row.url} target='_blank' key={params.id}>
            {params.row.url}
          </a>
        );
      },
    },
    {
      field: 'productivity',
      headerName: 'PRODUCTIVITY',
      cellClassName: 'spaceBetween',
      valueFormatter: ({ value }) => `${value} %`,
    },
    {
      field: 'totalElapstedTime',
      headerName: 'TOTAL TIME',
      cellClassName: 'spaceBetween',
      flex: 1,
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '85vh',
          backgroundColor: 'white',
          borderRadius: '10px',
          zIndex: 0,
        }}
      >
        <DataGrid
          sx={{ borderRadius: '10px', justifyContent: 'space-between' }}
          columns={columns}
          pageSize={pageSize}
          getRowClassName={(params) => `${params.row.status} spaceBetween`}
          rows={currentTask.length > 0 ? currentTask.map((row) => row) : []}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 7, 10]}
        />
      </Box>
    </>
  );
}
