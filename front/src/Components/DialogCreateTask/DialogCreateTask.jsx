import React, { useContext } from 'react';
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
import { TaskTypeContext } from '../../context/taskTypeContext';
import BtnIconText from './../BtnIconText/BtnIconText';

const IvpnList = ['i', 'v', 'p', 'n'].map((item, index) => (
  <DialogCreateTaskOption value={item} key={index}>
    {item.toUpperCase()}
  </DialogCreateTaskOption>
));

const statComOption = [
  '---',
  'Abandon',
  'Abonné',
  'Dégradé',
  'DégradéDefinitif',
  'Essai',
  'EssaiNouveau',
  'EssaiPayant',
  'Retiré',
].map((item, index) => (
  <DialogCreateTaskOption
    style={{ textTransform: 'none' }}
    value={item}
    key={index}
  >
    {item}
  </DialogCreateTaskOption>
));

const DialogCreateTask = () => {
  const { taskTypeList } = useContext(TaskTypeContext);

  const taskTypeOption = taskTypeList
    ? Array.from(taskTypeList).map((item) => (
        <DialogCreateTaskOption
          style={{ textTransform: 'none' }}
          value={item.name}
          key={item.id}
        >
          {item.name}
        </DialogCreateTaskOption>
      ))
    : '';

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
              <DialogCreateTaskFormLabel htmlFor='boothNumber'>
                Booth number
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskInput
                name='boothNumber'
                id='boothNumber'
                type='text'
              ></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel htmlFor='type'>
                Task type
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskSelect
                name='type'
                id='type'
                style={{ textTransform: 'none' }}
              >
                {taskTypeOption}
              </DialogCreateTaskSelect>
              <DialogCreateTaskFormLabel htmlFor='statCom'>
                STATUS COM
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskSelect
                id='statCom'
                name='statCom'
                style={{ textTransform: 'none' }}
              >
                {statComOption}
              </DialogCreateTaskSelect>
              <DialogCreateTaskFormLabel htmlFor='ivpn'>
                IVPN
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskSelect name='ivpn' id='ivpn'>
                {IvpnList}
              </DialogCreateTaskSelect>
              <DialogCreateTaskFormLabel htmlFor='cat'>
                CATEGORY
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskInput
                name='cat'
                id='cat'
                type='text'
              ></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel htmlFor='url'>
                url
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskInput
                name='url'
                id='url'
                type='url'
              ></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel htmlFor='nbBefore'>
                nb before
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskInput
                name='nbBefore'
                id='nbBefore'
                type='number'
                pattern='[0-9{0,5}]'
              ></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel htmlFor='nbAfter'>
                nb after
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskInput
                name='nbAfter'
                id='nbAfter'
                type='number'
                pattern='[0-9{0,5}]'
              ></DialogCreateTaskInput>
              <DialogCreateTaskFormLabel htmlFor='comment'>
                comment
              </DialogCreateTaskFormLabel>
              <DialogCreateTaskTextarea id='comment' name='comment' />
            </DialogCreateTaskFormInput>
            <DialogCreateTaskHr />
            <DialogCreateTaskBtnContainer>
              <BtnIconText title='save' hoverBgColor={true} bgColor='#1B5E20'>
                <span className='material-icons-round'>done</span>
              </BtnIconText>
              <BtnIconText title='cancel' hoverBgColor={true} bgColor='#5e2750'>
                <span className='material-icons-round'>close</span>
              </BtnIconText>
            </DialogCreateTaskBtnContainer>
          </DialogCreateTaskForm>
        </TitledCard>
      </DialogCreateTaskCont>
    </Modal>
  );
};

export default DialogCreateTask;
