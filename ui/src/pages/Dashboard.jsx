import React, { useContext, useEffect, useState } from 'react';
import TiteledCard from '../components/TiteledCard';
import Processing from '../components/Processing';
import '../style/Dashboard.scss';
import ProductivSimulation from '../components/ProductivSimulation';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_USER_TASK } from '../graphql/Query';

export default function Dashboard() {
  const userContext = useContext(AuthContext);
  const [currentProcessigTask, setCurrentProcessigTask] = useState([]);

  const { data: userTask, error: errorFetchUserTask } = useQuery(
    GET_USER_TASK,
    {
      variables: {
        input: {
          sub: userContext && userContext.user.sub,
        },
      },
    }
  );

  useEffect(() => {
    if (userTask) {
      const processingTask = userTask.getUserTask.filter(
        (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
      );
      if (processingTask) {
        setCurrentProcessigTask(processingTask[0]);
      }
    }
  });

  return (
    <div className='dashboard'>
      <TiteledCard title={'PROCESSING'} content={<Processing />} />

      <TiteledCard
        title={'PROD SIMULATION'}
        content={<ProductivSimulation />}
      />
    </div>
  );
}
