import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { AuthConext } from '../../context/authContext';
import { ComponentContext } from '../../context/componentContext';
import { mutateUpdateProcessingTask } from '../../Graphql/graphqlTasks';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import { GET_USER_TASK } from '../../Graphql/Query';
import BtnIconText from '../BtnIconText/BtnIconText';
import IvpnListOptions from '../IvpnListOptions/IvpnListOptions';
import StatComListOptions from '../StatComListOptions/StatComListOptions';
import TaskTypeOptions from '../TaskTypeOptions/TaskTypeOptions';
import TitledCard from '../TitledCard/TitledCard';
import Modal from './../Modal/Modal';

import {
  DialogEditTaskBtnGroup,
  DialogEditTaskCont,
  DialogEditTaskCont2,
  DialogEditTaskForm,
  DialogEditTaskHr,
  DialogEditTaskLabel,
  DialogEditTaskPara,
  DialogEditTaskSelect,
  DialogEditTaskTextarea,
} from './DialogEditTask.styled';

const DialogEditTask = () => {
  const { processingTask } = useGetProcessingTask();
  const { sub } = useContext(AuthConext);
  const { dialogEditTask, setDialogEditTaskClose } =
    useContext(ComponentContext);

  const [formState, setFormState] = useState({
    id: null,
    boothNumber: '',
    type: '',
    url: '',
    cat: '',
    statCom: '',
    ivpn: '',
    nbBefore: 0,
    nbAfter: 0,
    comment: '',
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (processingTask.length > 0) {
      setFormState({
        ...formState,
        id: processingTask[0].id,
        boothNumber: processingTask[0].boothNumber,
        type: processingTask[0].type,
        cat: processingTask[0].cat,
        statCom: processingTask[0].statCom,
        ivpn: processingTask[0].ivpn,
        nbBefore: processingTask[0].nbBefore,
        nbAfter: processingTask[0].nbAfter,
        comment: processingTask[0].comment,
        url: processingTask[0].url,
      });
    }
  }, [processingTask]);

  const handleClickCancel = () => {
    dialogEditTask && setDialogEditTaskClose();
  };

  const [updateCurrentTask, { error: errorOnUpdateTask }] = useMutation(
    UPDATE_TASK,
    {
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
    }
  );

  const handleClickSave = (event) => {
    event.preventDefault();
    if (formState.id) {
      mutateUpdateProcessingTask(updateCurrentTask, formState).then(
        setDialogEditTaskClose()
      );
    }
  };

  return (
    <>
      <DialogEditTaskCont>
        <DialogEditTaskCont2>
          <TitledCard
            icon='edit'
            iconBackGround='#F57F17'
            title='edit processing task'
          >
            <DialogEditTaskForm onSubmit={handleClickSave}>
              <DialogEditTaskLabel htmlFor='boothNumber'>
                booth number
              </DialogEditTaskLabel>
              <DialogEditTaskPara
                type='text'
                id='boothNumber'
                name='boothNumber'
                value={formState.boothNumber}
                onChange={handleInputChange}
              />
              <DialogEditTaskLabel htmlFor='statCom'>
                status com
              </DialogEditTaskLabel>
              <DialogEditTaskSelect
                name='statCom'
                id='statCom'
                value={formState.statCom}
                onChange={handleInputChange}
              >
                <StatComListOptions />
              </DialogEditTaskSelect>
              <DialogEditTaskLabel htmlFor='type'>
                Task type
              </DialogEditTaskLabel>
              <DialogEditTaskSelect
                name='type'
                id='type'
                value={formState.type}
                onChange={handleInputChange}
              >
                <TaskTypeOptions />
              </DialogEditTaskSelect>
              <DialogEditTaskLabel htmlFor='ivpn'>ivpn</DialogEditTaskLabel>
              <DialogEditTaskSelect
                name='ivpn'
                id='ivpn'
                value={formState.ivpn}
                onChange={handleInputChange}
              >
                <IvpnListOptions />
              </DialogEditTaskSelect>
              <DialogEditTaskLabel htmlFor='cat'>cat</DialogEditTaskLabel>
              <DialogEditTaskPara
                type='text'
                name='cat'
                id='cat'
                value={formState.cat}
                onChange={handleInputChange}
              />
              <DialogEditTaskLabel htmlFor='url'>URL</DialogEditTaskLabel>
              <DialogEditTaskPara
                type='url'
                name='url'
                id='url'
                value={formState.url}
                onChange={handleInputChange}
              />
              <DialogEditTaskLabel htmlFor='nbBefore'>
                nb before
              </DialogEditTaskLabel>
              <DialogEditTaskPara
                type='number'
                pattern='[0-9{0,5}]'
                name='nbBefore'
                id='nbBefore'
                value={formState.nbBefore}
                onChange={handleInputChange}
                onInput={handleInputChange}
              />
              <DialogEditTaskLabel htmlFor='nbAfter'>
                nb after
              </DialogEditTaskLabel>
              <DialogEditTaskPara
                type='number'
                pattern='[0-9{0,5}]'
                name='nbAfter'
                id='nbAfter'
                value={formState.nbAfter}
                onChange={handleInputChange}
                onInput={handleInputChange}
              />
              <DialogEditTaskLabel htmlFor='comment'>
                comment
              </DialogEditTaskLabel>
              <DialogEditTaskTextarea
                name='comment'
                id='comment'
                value={formState.comment}
                onChange={handleInputChange}
              />
              <DialogEditTaskHr />
              <DialogEditTaskBtnGroup>
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
              </DialogEditTaskBtnGroup>
            </DialogEditTaskForm>
          </TitledCard>
        </DialogEditTaskCont2>
      </DialogEditTaskCont>
      <Modal />
    </>
  );
};

export default DialogEditTask;
