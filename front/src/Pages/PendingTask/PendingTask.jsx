import React from 'react';
import PendingTaskTable from '../../Components/PendingTaskTable/PendingTaskTable';
import { PendigTaskCont } from './PendingTask.styled';

const PendingTask = () => {
  return (
    <PendigTaskCont>
      <PendingTaskTable />
    </PendigTaskCont>
  );
};

export default PendingTask;
