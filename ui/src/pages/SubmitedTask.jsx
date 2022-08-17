import React from 'react';
import SubmitedTaskTable from '../components/SubmitedTaskTable';

const SubmitedTask = () => {
  return (
    <div
      className='submitedTask'
      style={{
        display: 'flex',
        padding: '1rem',
        justifyContent: 'center',
      }}
    >
      <SubmitedTaskTable />
    </div>
  );
};

export default SubmitedTask;
