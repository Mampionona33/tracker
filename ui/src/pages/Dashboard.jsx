import React, { useContext, useEffect, useState } from 'react';
import TiteledCard from '../components/TiteledCard';
import Pending from '../components/Pending';
import Processing from '../components/Processing';
import '../style/Dashboard.scss';
import ProductivSimulation from '../components/ProductivSimulation';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_USER_TASK } from '../graphql/Query';
import { useNavigate, useParams } from 'react-router-dom';

export default function Dashboard() {
  const userContext = useContext(AuthContext);
  const [currentProcessigTask, setCurrentProcessigTask] = useState([]);
  const { row_show } = useParams();
  const navigate = useNavigate();
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
    if (!row_show) {
      console.log('test');
      navigate('row_show=3', { replace: true });
    }
  }, [row_show]);

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
      <TiteledCard title={'PENDING'} content={<Pending />} />
      <TiteledCard title={'PROCESSING'} content={<Processing />} />

      <TiteledCard
        title={'PROD SIMULATION'}
        content={<ProductivSimulation />}
      />
    </div>
  );
}
