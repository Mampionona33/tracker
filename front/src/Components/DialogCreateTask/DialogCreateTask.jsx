import React from 'react';
import Modal from '../Modal/Modal';
import {
  DialogCreateTaskCont,
  DialogCreateTaskForm,
  DialogCreateTaskInput,
  DialogCreateTaskFormLabel,
  DialogCreateTaskSelect,
  DialogCreateTaskOption,
  DialogCreateTaskTextarea,
  DialogCreateTaskHr,
  DialogCreateTaskFormInput,
  DialogCreateTaskBtnContainer,
} from './DialogCreateTask.styled';
import TitledCard from './../TitledCard/TitledCard';

const IvpnList = ['i', 'v', 'p', 'n'].map((item, index) => (
  <DialogCreateTaskOption value={item} key={index}>
    {item}
  </DialogCreateTaskOption>
));

const DialogCreateTask = () => {
  return (
    <Modal justifContent='center'>
      <DialogCreateTaskCont>
        <TitledCard
          icon='note_add'
          iconBackGround='#2196F3'
          title={'create new task'}
        >
          <DialogCreateTaskForm>
            <DialogCreateTaskFormInput>
              <DialogCreateTaskFormLabel>
                Booth number
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskInput></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel>Task type</DialogCreateTaskFormLabel>
              <DialogCreateTaskInput></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel>STATUS COM</DialogCreateTaskFormLabel>
              <DialogCreateTaskInput></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel>IVPN</DialogCreateTaskFormLabel>
              <DialogCreateTaskSelect>{IvpnList}</DialogCreateTaskSelect>
              <DialogCreateTaskFormLabel>CATEGORY</DialogCreateTaskFormLabel>
              <DialogCreateTaskInput></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel>url</DialogCreateTaskFormLabel>
              <DialogCreateTaskInput></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel>nb before</DialogCreateTaskFormLabel>
              <DialogCreateTaskInput></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel>nb after</DialogCreateTaskFormLabel>
              <DialogCreateTaskInput></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel>comment</DialogCreateTaskFormLabel>
              <DialogCreateTaskTextarea />
            </DialogCreateTaskFormInput>
            <DialogCreateTaskHr />
            <DialogCreateTaskBtnContainer></DialogCreateTaskBtnContainer>
          </DialogCreateTaskForm>
        </TitledCard>
      </DialogCreateTaskCont>
    </Modal>
  );
};

export default DialogCreateTask;
