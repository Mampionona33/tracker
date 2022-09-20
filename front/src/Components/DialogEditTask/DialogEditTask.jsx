import React, { useContext } from 'react';
import { TaskTypeContext } from '../../context/taskTypeContext';
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
  DialogEditTaskRow,
  DialogEditTaskSelect,
  DialogEditTaskTextarea,
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
              <DialogEditTaskLabel>ivpn</DialogEditTaskLabel>
              <DialogEditTaskSelect>
                <IvpnListOptions />
              </DialogEditTaskSelect>
              <DialogEditTaskLabel>cat</DialogEditTaskLabel>
              <DialogEditTaskPara type='text' />
              <DialogEditTaskLabel>URL</DialogEditTaskLabel>
              <DialogEditTaskPara type='url' />
              <DialogEditTaskLabel>nb before</DialogEditTaskLabel>
              <DialogEditTaskPara type='number' />
              <DialogEditTaskLabel>nb after</DialogEditTaskLabel>
              <DialogEditTaskPara type='number' />
              <DialogEditTaskLabel>comment</DialogEditTaskLabel>
              <DialogEditTaskTextarea />
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
