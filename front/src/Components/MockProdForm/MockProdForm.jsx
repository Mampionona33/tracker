import React from 'react';
import BtnIconText from '../BtnIconText/BtnIconText';
import ProgressBar from '../ProgressBar/ProgressBar';
import {
  MockProdFormButtonCont,
  MockProdFormCont,
  MockProdFormInputNbafter,
  MockProdFormLabel,
  MockProdFormTimer,
  MockProdFormTimerDay,
  MockProdFormTimerHrs,
  MockProdFormTimerInput,
  MockProdFormTimerMin,
  MockProdFormTimerSec,
  MocProdFormProgressBarCont,
} from './MockProdForm.styled';

const MockProdForm = () => {
  return (
    <MockProdFormCont>
      <MockProdFormLabel>nb after</MockProdFormLabel>
      <MockProdFormInputNbafter
        type='number'
        id='nbAfter'
        name='nbAfter'
        pattern='[0-9{0,5}]'
        placeholder='00'
      />
      <MockProdFormLabel>elapsted time</MockProdFormLabel>

      <MockProdFormTimerDay>
        <MockProdFormTimer>
          <MockProdFormTimerInput
            type='number'
            id='day'
            name='day'
            pattern='[0-9{0,5}]'
            placeholder='00'
          />
          day
        </MockProdFormTimer>
      </MockProdFormTimerDay>

      <MockProdFormTimerHrs>
        <MockProdFormTimerInput
          type='number'
          id='hrs'
          name='hrs'
          pattern='[0-9{0,5}]'
          min={0}
          max={23}
          placeholder='00'
        />
        hrs
      </MockProdFormTimerHrs>

      <MockProdFormTimerMin>
        <MockProdFormTimerInput
          type='number'
          id='min'
          name='min'
          pattern='[0-9{0,5}]'
          min={0}
          max={59}
          placeholder='00'
        />
        min
      </MockProdFormTimerMin>

      <MockProdFormTimerSec>
        <MockProdFormTimerInput
          type='number'
          id='sec'
          name='sec'
          pattern='[0-9{0,5}]'
          min={0}
          max={59}
          placeholder='00'
        />
        sec
      </MockProdFormTimerSec>
      <MockProdFormLabel>result</MockProdFormLabel>
      <MocProdFormProgressBarCont>
        <ProgressBar completed={50} />
      </MocProdFormProgressBarCont>
      <MockProdFormButtonCont>
        <BtnIconText title='reset' hoverBgColor={true} bgColor='#5e2750'>
          <span className='material-icons-round'>undo</span>
        </BtnIconText>
      </MockProdFormButtonCont>
    </MockProdFormCont>
  );
};

export default MockProdForm;
