import React, { useContext, useEffect, useState } from 'react';
import ProcessingTask from '../../Components/ProcessingTask/ProcessingTask';
import TitledCard from '../../Components/TitledCard/TitledCard';
import { AuthConext } from '../../context/authContext';
import {
  DashboardContainer,
  NoProcessingTask,
  Spliter,
  StyledSpan,
} from './Dashboard.style';
import { getUserTasks } from './../../Graphql/graphqlTasks';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(props) {
  const [processingTask, setProcessingTask] = useState(false);
  const { sub } = useContext(AuthConext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (sub) {
        const allUserTasks = await getUserTasks(sub);
        if (isMounted) {
          if (allUserTasks && allUserTasks.length > 0) {
            const processing = Array.from(allUserTasks).filter(
              (item) =>
                item.taskState === 'isPlay' || item.taskState === 'isPause'
            );
            if (processing.length > 0) {
              console.log(processing);
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
