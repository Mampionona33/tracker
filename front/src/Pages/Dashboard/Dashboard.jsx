import React, { lazy, useContext, useEffect, useState } from 'react';
import { AuthConext } from '../../context/authContext';
import {
  DashboardContainer,
  NoProcessingTask,
  StyledSpan,
} from './Dashboard.style';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { ComponentContext } from '../../context/componentContext';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';

const TitledCard = lazy(() => import('../../Components/TitledCard/TitledCard'));
const ProcessingTask = lazy(() =>
  import('../../Components/ProcessingTask/ProcessingTask')
);

export default function Dashboard(props) {
  const { sub } = useContext(AuthConext);
  const navigate = useNavigate();
  const { dialogCreatTaskIsOpen, setdialogCreatTaskOpen } =
    useContext(ComponentContext);
  const { processingTask, loadingUserTask } = useGetProcessingTask();

  const handleClickText = (event) => {
    event.preventDefault();
    !dialogCreatTaskIsOpen && setdialogCreatTaskOpen();
  };

  return (
    <DashboardContainer>
      {loadingUserTask && <Loading />}

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
