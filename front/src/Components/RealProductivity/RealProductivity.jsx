import React, { useContext, useEffect, useRef, useState } from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { difDate } from '../../assets/timeUtility';
import { TaskTypeContext } from '../../context/taskTypeContext';
import ProgressBar from '../ProgressBar/ProgressBar';
import { RealProdLabel, RealProductivityCont } from './RealProductivity.styled';

const RealProductivity = () => {
  const { processingTask } = useGetProcessingTask();
  const { taskTypeList } = useContext(TaskTypeContext);
  const [prod, setProd] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    if (processingTask.length > 0 && taskTypeList) {
      const currentTaskType = processingTask.reduce((a, b) => a + b).type;

      const taskState = processingTask.reduce((a, b) => a + b).taskState;

      const elapstedTime = processingTask
        .map((item) => {
          return Array.from(item.session)
            .map((session) => {
              if (!session.sessionStop) {
                return difDate(session.sessionStart, new Date());
              }
              return difDate(session.sessionStart, session.sessionStop);
            })
            .reduce((a, b) => a + b);
        })
        .reduce((a, b) => a + b);

      const goal = Array.from(taskTypeList)
        .filter((item) => item.name === currentTaskType)
        .reduce((a, b) => a + b).goal;
      const nbAfter = processingTask.reduce((a, b) => a + b).nbAfter;

      if (taskState === 'isPause') {
        clearInterval(interval.current);
        const productivity = Math.round(
          (nbAfter / elapstedTime / (goal / 3600)) * 100
        );
        setProd(productivity);
      }
      if (taskState === 'isPlay') {
        let elapstedTimePlay = elapstedTime;
        interval.current = setInterval(() => {
          elapstedTimePlay++;
          const productivity = Math.round(
            (nbAfter / elapstedTimePlay / (goal / 3600)) * 100
          );
          setProd(productivity);
        }, 1000);
      }
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [processingTask, taskTypeList]);

  return (
    <RealProductivityCont>
      <RealProdLabel>real productivity</RealProdLabel>
      <ProgressBar completed={prod} />
    </RealProductivityCont>
  );
};

export default RealProductivity;
