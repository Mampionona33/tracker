import React from 'react';
import Modal from '../Modal/Modal';
import { DialogCreateTaskCont } from './DialogCreateTask.styled';
import TitledCard from './../TitledCard/TitledCard';

const DialogCreateTask = () => {
  return (
    <Modal>
      <DialogCreateTaskCont>
        <TitledCard
          icon='note_add'
          iconBackGround='#2196F3'
          title={'create new task'}
        ></TitledCard>
      </DialogCreateTaskCont>
    </Modal>
  );
};

export default DialogCreateTask;
