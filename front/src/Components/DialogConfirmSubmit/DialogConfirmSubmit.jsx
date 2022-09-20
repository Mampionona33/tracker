import React, { useContext } from 'react';
import { ComponentContext } from '../../context/componentContext';
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

  const handleClickCancel = () => {
    dialogConfirmSubmit && setDialogConfirmSubmitClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
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
