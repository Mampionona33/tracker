import React, { lazy, useContext, useEffect, useState } from 'react';
import { AuthConext } from '../../context/authContext';
import {
  DashboardContainer,
  NoProcessingTask,
  StyledSpan,
} from './Dashboard.style';
import { getUserTasks } from './../../Graphql/graphqlTasks';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { ComponentContext } from '../../context/componentContext';

const TitledCard = lazy(() => import('../../Components/TitledCard/TitledCard'));
const ProcessingTask = lazy(() =>
  import('../../Components/ProcessingTask/ProcessingTask')
);

export default function Dashboard(props) {
  const [processingTask, setProcessingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sub } = useContext(AuthConext);
  const navigate = useNavigate();
  const { dialogCreatTaskIsOpen, setdialogCreatTaskOpen } =
    useContext(ComponentContext);

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

  const handleClickText = (event) => {
    event.preventDefault();
    !dialogCreatTaskIsOpen && setdialogCreatTaskOpen();
  };

  return (
    <DashboardContainer>
      {loading && <Loading />}

      {processingTask ? (
        <TitledCard
          icon='engineering'
          iconBackGround='#3949AB'
          title='processing task'
        >
          <ProcessingTask />
        </TitledCard>
      ) : (
        <TitledCard
          icon='engineering'
          iconBackGround='#3949AB'
          title='processing task'
        >
          <NoProcessingTask>
            You have no processing task. Please, create one by clicking
            <StyledSpan onClick={handleClickText}> here </StyledSpan>
            or choose one from{' '}
            <StyledSpan
              onClick={() => {
                navigate('/pending_task', { replace: true });
              }}
            >
              there.
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
