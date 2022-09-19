import React from 'react';
import TitledCard from '../TitledCard/TitledCard';
import Modal from './../Modal/Modal';
import {
  DialogEditTaskCont,
  DialogEditTaskCont2,
} from './DialogEditTask.styled';

const DialogEditTask = () => {
  return (
    <>
      <DialogEditTaskCont>
        <DialogEditTaskCont2>
          <TitledCard
            icon='edit'
            iconBackGround='#F57F17'
            title='edit processing task'
          ></TitledCard>
        </DialogEditTaskCont2>
      </DialogEditTaskCont>
      <Modal />
    </>
  );
};

export default DialogEditTask;
