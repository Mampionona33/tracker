import { useMutation } from '@apollo/client';
import { shouldWriteResult } from '@apollo/client/core/QueryInfo';
import React, { useContext, useEffect } from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { difDate } from '../../assets/timeUtility';
import { AuthConext } from '../../context/authContext';
import { ComponentContext } from '../../context/componentContext';
import { TaskTypeContext } from '../../context/taskTypeContext';
import { mutateTaskStatePauseToDone } from '../../Graphql/graphqlTasks';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import { GET_USER_TASK } from '../../Graphql/Query';
import BtnIconText from '../BtnIconText/BtnIconText';
import { DialogEditTaskHr } from '../DialogEditTask/DialogEditTask.styled';
import Modal from '../Modal/Modal';
import TitledCard from '../TitledCard/TitledCard';
import { mutateTakStatePlayToDone } from './../../Graphql/graphqlTasks';
import {
  DialogConfirmSubmitBtnCont,
  DialogConfirmSubmitCont1,
  DialogConfirmSubmitCont2,
  DialogConfirmSubmitMsg,
} from './DialogConfirmSubmit.styled';

const DialogConfirmSubmit = () => {
  const { dialogConfirmSubmit, setDialogConfirmSubmitClose } =
    useContext(ComponentContext);

  const { taskTypeList } = useContext(TaskTypeContext);

  const { sub } = useContext(AuthConext);

  const { processingTask, loadingUserTask, refetchUserTasks } =
    useGetProcessingTask();

  const [updateTaskStateToIsDone, { error: errorUpdateTaskState }] =
    useMutation(UPDATE_TASK, {
      refetchQueries: [
        {
          query: GET_USER_TASK,
          variables: {
            input: {
              sub: sub,
            },
          },
        },
      ],

      awaitRefetchQueries: true,
    });

  const handleClickCancel = () => {
    dialogConfirmSubmit && setDialogConfirmSubmitClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (processingTask.length > 0) {
      const taskState = processingTask[0].taskState;
      const taskId = processingTask[0].id;
      const elapstedTime = processingTask
        .map((item) => {
          return [...item.session]
            .map((session) => {
              if (!session.sessionStop) {
                return difDate(session.sessionStart, new Date());
              }
              return difDate(session.sessionStart, session.sessionStop);
            })
            .reduce((a, b) => a + b);
        })
        .reduce((a, b) => a + b);
      const nbAfter = processingTask[0].nbAfter;

      const sessionId =
        taskState === 'isPlay' &&
        processingTask
          .map((item) => {
            if (item.taskState === 'isPlay') {
              return [...item.session]
                .filter((session) => !session.sessionStop)
                .map((item) => item.session_id)
                .reduce((a, b) => a + b);
            }
          })
          .reduce((a, b) => a + b);

      const goal = [...taskTypeList]
        .filter(
          (item) =>
            item.name ===
            processingTask.map((item) => item.type).reduce((a, b) => a + b)
        )
        .reduce((a, b) => a + b).goal;

      const productivity = Math.round(
        (nbAfter / elapstedTime / (goal / 3600)) * 100
      );

      if (taskState === 'isPlay') {
        mutateTakStatePlayToDone(
          updateTaskStateToIsDone,
          taskId,
          productivity,
          elapstedTime,
          sessionId
        ).then(() => setDialogConfirmSubmitClose());
      } else {
        mutateTaskStatePauseToDone(
          updateTaskStateToIsDone,
          taskId,
          productivity,
          elapstedTime
        ).then(() => setDialogConfirmSubmitClose());
      }
    }
  };

  return (
    <>
      <DialogConfirmSubmitCont1>
        <DialogConfirmSubmitCont2 onSubmit={handleSubmit}>
          <TitledCard
            icon='question_mark'
            title='submit task'
            iconBackGround='#f52d50'
          >
            <DialogConfirmSubmitMsg>
              Do you realy want to submit this task :
              <b>{processingTask.map((item) => item.boothNumber)}</b>?
            </DialogConfirmSubmitMsg>
            <DialogEditTaskHr />
            <DialogConfirmSubmitBtnCont>
              <BtnIconText
                title='save'
                hoverBgColor={true}
                bgColor='#1B5E20'
                type='submit'
              >
                <span className='material-icons-round'>done</span>
              </BtnIconText>
              <BtnIconText
                title='cancel'
                hoverBgColor={true}
                bgColor='#5e2750'
                onClick={handleClickCancel}
              >
                <span className='material-icons-round'>close</span>
              </BtnIconText>
            </DialogConfirmSubmitBtnCont>
          </TitledCard>
        </DialogConfirmSubmitCont2>
      </DialogConfirmSubmitCont1>
      <Modal />
    </>
  );
};

export default DialogConfirmSubmit;
