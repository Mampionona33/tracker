import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';

export default function SubmitedTaskTable() {
  const userContext = useContext(AuthContext);
  const [currentTask, setCurrentTask] = useState([]);
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

  const columns = [];

  return (
    <div >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>BOOTH NUMBER</TableCell>
              <TableCell sx={{ color: 'white' }}>IVPN</TableCell>
              <TableCell sx={{ color: 'white' }}>TYPE</TableCell>
              <TableCell sx={{ color: 'white' }}>STATUS COM</TableCell>
              <TableCell sx={{ color: 'white' }}>NB BEFORE</TableCell>
              <TableCell sx={{ color: 'white' }}>NB AFTER</TableCell>
              <TableCell sx={{ color: 'white' }}>TOTAL TIME</TableCell>
              <TableCell sx={{ color: 'white' }}>SUBMIT DATE</TableCell>
              <TableCell sx={{ color: 'white' }}>PRODUCTIVITY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTask.length > 0 &&
              currentTask.map((rows) => (
                <TableRow key={rows.id}>
                  <TableCell>{rows.boothNumber}</TableCell>
                  <TableCell>{rows.ivpn}</TableCell>
                  <TableCell>{rows.type}</TableCell>
                  <TableCell>{rows.statCom}</TableCell>
                  <TableCell>{rows.nbBefore}</TableCell>
                  <TableCell>{rows.nbAfter}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}