import React, { useContext, useEffect, useState } from 'react';
import { AuthConext } from '../../context/authContext';
import { getUserTasks } from '../../Graphql/graphqlTasks';
import Loading from '../Loading/Loading';
import {
  ProcessingTaskInfoContainer,
  ProcessingTaskTitleLabel,
  ProcessingTaskLabel,
  ProcessingTaskComment,
} from './ProcessingTaskInfo.style';

export default function ProcessingTaskInfo() {
  const [processingTask, setProcessingTask] = useState([]);
  const { sub } = useContext(AuthConext);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (sub) {
        const allUserTasks = await getUserTasks(sub);
        setIsLoading((prev) => false);
        if (isMounted) {
          if (allUserTasks && Array.from(allUserTasks).length > 0) {
            const processing = Array.from(allUserTasks).filter(
              (item) =>
                item.taskState === 'isPlay' || item.taskState === 'isPause'
            );

            processing.length > 0 && setProcessingTask((prev) => processing);
          }
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ProcessingTaskInfoContainer>
      <ProcessingTaskTitleLabel>BOOT NUMBER</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].boothNumber : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>TASK TYPE</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].type : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>STATUS COM</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].statCom : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>STATUS IVPN</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].ivpn : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>CATEGORY</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].cat : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>URL</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        <a
          href={processingTask.length > 0 ? processingTask[0].url : ''}
          target='_blank'
        >
          {processingTask.length > 0 ? processingTask[0].url : ''}
        </a>
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>NB BEFORE</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].nbBefore : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>NB AFTER</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].nbAfter : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>COMMENT</ProcessingTaskTitleLabel>
      <ProcessingTaskComment
        disabled
        defaultValue={
          processingTask.length > 0 ? processingTask[0].comment : ''
        }
      />
    </ProcessingTaskInfoContainer>
  );
}
