import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { difDate } from '../../assets/timeUtility';
import { AuthConext } from '../../context/authContext';
import { ComponentContext } from '../../context/componentContext';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import { GET_USER_TASK } from '../../Graphql/Query';
import BtnIconText from '../BtnIconText/BtnIconText';
import { DialogEditTaskHr } from '../DialogEditTask/DialogEditTask.styled';
import Modal from '../Modal/Modal';
import TitledCard from '../TitledCard/TitledCard';
import {
  DialogConfirmSubmitBtnCont,
  DialogConfirmSubmitCont1,
  DialogConfirmSubmitCont2,
  DialogConfirmSubmitMsg,
} from './DialogConfirmSubmit.styled';

const DialogConfirmSubmit = () => {
  const { dialogConfirmSubmit, setDialogConfirmSubmitClose } =
    useContext(ComponentContext);

  const { sub } = useContext(AuthConext);

  const { processingTask, loadingUserTask } = useGetProcessingTask();

  const [updateTaskStateToIsDone, { error: errorUpdateTaskState }] =
    useMutation(UPDATE_TASK, {
      refetchQueries: [
        { query: GET_USER_TASK, variables: { input: { sub: sub } } },
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
          return Array.from(item.session)
            .map((session) =>
              difDate(session.sessionStart, session.sessionStop)
            )
            .reduce((a, b) => a + b);
        })
        .reduce((a, b) => a + b);
      console.log('taskId', taskId);
      console.log('elapstedTime', elapstedTime);
      console.log('taskState', taskState);
    }
  };

  return (
    <>
      <DialogConfirmSubmitCont1>
        <DialogConfirmSubmitCont2 onSubmit={handleSubmit}>
          <TitledCard icon='info' title='submit task' iconBackGround='#f52d50'>
            <DialogConfirmSubmitMsg>
              Do you realy want to submit this task ?
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
