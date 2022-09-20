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
              <DialogEditTaskLabel htmlFor='boothNumber'>
                booth number
              </DialogEditTaskLabel>
              <DialogEditTaskPara
                type='text'
                id='boothNumber'
                name='boothNumber'
              />
              <DialogEditTaskLabel htmlFor='statCom'>
                status com
              </DialogEditTaskLabel>
              <DialogEditTaskSelect name='statCom' id='statCom'>
                <StatComListOptions />
              </DialogEditTaskSelect>
              <DialogEditTaskLabel htmlFor='type'>
                Task type
              </DialogEditTaskLabel>
              <DialogEditTaskSelect name='type' id='type'>
                <TaskTypeOptions />
              </DialogEditTaskSelect>
              <DialogEditTaskLabel htmlFor='ivpn'>ivpn</DialogEditTaskLabel>
              <DialogEditTaskSelect name='ivpn' id='ivpn'>
                <IvpnListOptions />
              </DialogEditTaskSelect>
              <DialogEditTaskLabel htmlFor='cat'>cat</DialogEditTaskLabel>
              <DialogEditTaskPara type='text' name='cat' id='cat' />
              <DialogEditTaskLabel htmlFor='url'>URL</DialogEditTaskLabel>
              <DialogEditTaskPara type='url' name='url' id='url' />
              <DialogEditTaskLabel htmlFor='nbBefore'>
                nb before
              </DialogEditTaskLabel>
              <DialogEditTaskPara
                type='number'
                pattern='[0-9{0,5}]'
                name='nbBefore'
                id='nbBefore'
              />
              <DialogEditTaskLabel htmlFor='nbAfter'>
                nb after
              </DialogEditTaskLabel>
              <DialogEditTaskPara
                type='number'
                pattern='[0-9{0,5}]'
                name='nbAfter'
                id='nbAfter'
              />
              <DialogEditTaskLabel htmlFor='comment'>
                comment
              </DialogEditTaskLabel>
              <DialogEditTaskTextarea name='comment' id='comment' />
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
