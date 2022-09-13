import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import {
  DialogCreateTaskCont,
  DialogCreateTaskInput,
  DialogCreateTaskFormLabel,
  DialogCreateTaskSelect,
  DialogCreateTaskOption,
  DialogCreateTaskTextarea,
  DialogCreateTaskHr,
  DialogCreateTaskFormInput,
  DialogCreateTaskBtnContainer,
  DialogCreateTaskForm,
  DialogCreateTaskCon1,
  DialogLoadingCont1,
} from './DialogCreateTask.styled';
import TitledCard from './../TitledCard/TitledCard';
import { TaskTypeContext } from '../../context/taskTypeContext';
import BtnIconText from './../BtnIconText/BtnIconText';
import { ComponentContext } from '../../context/componentContext';
import { AuthConext } from '../../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_USER_TASK } from '../../Graphql/Query';
import { getUserTasks } from './../../Graphql/graphqlTasks';
import Loading from '../Loading/Loading';

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
  const { sub } = useContext(AuthConext);
  const [loading, setLoading] = useState(true);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const { dialogCreatTaskIsOpen, setdialogCreatTaskClose } =
    useContext(ComponentContext);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const userTasks = await getUserTasks(sub);
      setLoading((prev) => false);
      if (isMounted) {
        if (userTasks) {
          setCurrentTaskId(
            (prev) =>
              Array.from(userTasks)
                .filter(
                  (item) =>
                    item.taskState === 'isPlay' || item.taskState === 'isPause'
                )
                .map((item) => item.id)[0]
          );
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const [newTask, setNewTask] = useState({
    boothNumber: '',
    type: 'Contenu',
    processingState: '',
    url: '',
    cat: '',
    ivpn: 'I',
    nbBefore: 0,
    statCom: '',
    nbAfter: 0,
    comment: '',
    totalElapstedTime: '',
    submitedDate: null,
    productivity: 0,
    user: { sub: sub },
  });

  const refForm = useRef();

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

  const handleClickCancel = (event) => {
    event.preventDefault();
    dialogCreatTaskIsOpen && setdialogCreatTaskClose();
  };

  const handleClickSave = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  console.log(currentTaskId);

  return (
    <>
      {loading ? (
        <DialogLoadingCont1>
          <Loading firstColor='#fff' seconColor='black' zIndex='2' />
        </DialogLoadingCont1>
      ) : (
        <DialogCreateTaskCon1>
          <DialogCreateTaskCont>
            <TitledCard
              icon='note_add'
              iconBackGround='#2196F3'
              title={'create new task'}
            >
              <DialogCreateTaskForm ref={refForm} onSubmit={handleClickSave}>
                <DialogCreateTaskFormInput>
                  <DialogCreateTaskFormLabel htmlFor='boothNumber'>
                    Booth number
                  </DialogCreateTaskFormLabel>
                  <DialogCreateTaskInput
                    name='boothNumber'
                    id='boothNumber'
                    type='text'
                    value={newTask.boothNumber}
                    onChange={handleInputChange}
                  ></DialogCreateTaskInput>
                  <DialogCreateTaskFormLabel htmlFor='type'>
                    Task type
                  </DialogCreateTaskFormLabel>
                  <DialogCreateTaskSelect
                    name='type'
                    id='type'
                    style={{ textTransform: 'none' }}
                    value={newTask.type}
                    onChange={handleInputChange}
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
                    value={newTask.statCom}
                    onChange={handleInputChange}
                  >
                    {statComOption}
                  </DialogCreateTaskSelect>
                  <DialogCreateTaskFormLabel htmlFor='ivpn'>
                    IVPN
                  </DialogCreateTaskFormLabel>
                  <DialogCreateTaskSelect
                    name='ivpn'
                    id='ivpn'
                    value={newTask.ivpn}
                    onChange={handleInputChange}
                  >
                    {IvpnList}
                  </DialogCreateTaskSelect>
                  <DialogCreateTaskFormLabel htmlFor='cat'>
                    CATEGORY
                  </DialogCreateTaskFormLabel>
                  <DialogCreateTaskInput
                    name='cat'
                    id='cat'
                    type='text'
                    value={newTask.cat}
                    onChange={handleInputChange}
                  ></DialogCreateTaskInput>
                  <DialogCreateTaskFormLabel htmlFor='url'>
                    url
                  </DialogCreateTaskFormLabel>
                  <DialogCreateTaskInput
                    name='url'
                    id='url'
                    type='url'
                    value={newTask.url}
                    onChange={handleInputChange}
                  ></DialogCreateTaskInput>
                  <DialogCreateTaskFormLabel htmlFor='nbBefore'>
                    nb before
                  </DialogCreateTaskFormLabel>
                  <DialogCreateTaskInput
                    name='nbBefore'
                    id='nbBefore'
                    type='number'
                    pattern='[0-9{0,5}]'
                    value={newTask.nbBefore}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  ></DialogCreateTaskInput>
                  <DialogCreateTaskFormLabel htmlFor='nbAfter'>
                    nb after
                  </DialogCreateTaskFormLabel>
                  <DialogCreateTaskInput
                    name='nbAfter'
                    id='nbAfter'
                    type='number'
                    pattern='[0-9{0,5}]'
                    value={newTask.nbAfter}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  ></DialogCreateTaskInput>
                  <DialogCreateTaskFormLabel htmlFor='comment'>
                    comment
                  </DialogCreateTaskFormLabel>
                  <DialogCreateTaskTextarea
                    id='comment'
                    name='comment'
                    value={newTask.comment}
                    onChange={handleInputChange}
                  />
                </DialogCreateTaskFormInput>
                <DialogCreateTaskHr />
                <DialogCreateTaskBtnContainer>
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
                </DialogCreateTaskBtnContainer>
              </DialogCreateTaskForm>
            </TitledCard>
          </DialogCreateTaskCont>
        </DialogCreateTaskCon1>
      )}
      <Modal justifContent='center' />
    </>
  );
};

export default DialogCreateTask;
