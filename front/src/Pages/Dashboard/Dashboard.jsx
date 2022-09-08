import React, { lazy, useContext, useEffect, useState } from 'react';
import { AuthConext } from '../../context/authContext';
import {
  DashboardContainer,
  NoProcessingTask,
  Spliter,
  StyledSpan,
} from './Dashboard.style';
import { getUserTasks } from './../../Graphql/graphqlTasks';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

const TitledCard = lazy(() => import('../../Components/TitledCard/TitledCard'));
const ProcessingTask = lazy(() =>
  import('../../Components/ProcessingTask/ProcessingTask')
);

export default function Dashboard(props) {
  const [processingTask, setProcessingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sub } = useContext(AuthConext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (sub) {
        const allUserTasks = await getUserTasks(sub);
        setLoading((prev) => false);

        if (isMounted) {
          if (allUserTasks && allUserTasks.length > 0) {
            const processing = Array.from(allUserTasks).filter(
              (item) =>
                item.taskState === 'isPlay' || item.taskState === 'isPause'
            );
            if (processing.length > 0) {
              setProcessingTask((prev) => true);
            }
          }
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [sub]);

  return (
    <DashboardContainer>
      {loading && <Loading />}

      {processingTask ? (
        <TitledCard
          icon='engineering'
          iconBackGround='#3949AB'
          title='processing task'
        >
          <Spliter />
          <ProcessingTask />
        </TitledCard>
      ) : (
        <TitledCard
          icon='engineering'
          iconBackGround='#3949AB'
          title='processing task'
        >
          <Spliter />
          <NoProcessingTask>
            You have no processing task. Please, create one by clicking
            <StyledSpan> here </StyledSpan>
            or choose one from{' '}
            <StyledSpan
              onClick={() => {
                navigate('/pending_task', { replace: true });
              }}
            >
              here.
            </StyledSpan>
          </NoProcessingTask>
        </TitledCard>
      )}

      {processingTask && (
        <TitledCard
          icon='science'
          iconBackGround='#39A275'
          title='testing productivity'
        >
          TESTING
        </TitledCard>
      )}
    </DashboardContainer>
  );
}
