import React, { useContext } from 'react';
import { TaskTypeContext } from '../../context/taskTypeContext';
import StatComListOptions from '../StatComListOptions/StatComListOptions';
import TaskTypeOptions from '../TaskTypeOptions/TaskTypeOptions';
import TitledCard from '../TitledCard/TitledCard';
import Modal from './../Modal/Modal';

import {
  DialogEditTaskCont,
  DialogEditTaskCont2,
  DialogEditTaskForm,
  DialogEditTaskLabel,
  DialogEditTaskPara,
  DialogEditTaskRow,
  DialogEditTaskSelect,
} from './DialogEditTask.styled';

const DialogEditTask = () => {
  const { taskTypeList } = useContext(TaskTypeContext);
  return (
    <>
      <DialogEditTaskCont>
        <DialogEditTaskCont2>
          <TitledCard
            icon='edit'
            iconBackGround='#F57F17'
            title='edit processing task'
          >
            <DialogEditTaskForm>
              <DialogEditTaskLabel>booth number</DialogEditTaskLabel>
              <DialogEditTaskPara type='text' />
              <DialogEditTaskLabel>status com</DialogEditTaskLabel>
              <DialogEditTaskSelect>
                <StatComListOptions />
              </DialogEditTaskSelect>
              <DialogEditTaskLabel>Task type</DialogEditTaskLabel>
              <DialogEditTaskSelect>
                <TaskTypeOptions />
              </DialogEditTaskSelect>
            </DialogEditTaskForm>
          </TitledCard>
        </DialogEditTaskCont2>
      </DialogEditTaskCont>
      <Modal />
    </>
  );
};

export default DialogEditTask;
