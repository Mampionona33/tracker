import React from 'react';
import {
  MockProdFormCont,
  MockProdFormInputNbafter,
  MockProdFormLabel,
  MockProdFormTimer,
  MockProdFormTimerDay,
  MockProdFormTimerHrs,
  MockProdFormTimerInput,
  MockProdFormTimerMin,
  MockProdFormTimerSec,
} from './MockProdForm.styled';

const MockProdForm = () => {
  return (
    <MockProdFormCont>
      <MockProdFormLabel>nb after</MockProdFormLabel>
      <MockProdFormInputNbafter type='number' />
      <MockProdFormLabel>elapsted time</MockProdFormLabel>

      <MockProdFormTimerDay>
        <MockProdFormTimer>
          <MockProdFormTimerInput type='number' />
          day
        </MockProdFormTimer>
      </MockProdFormTimerDay>

      <MockProdFormTimerHrs>
        <MockProdFormTimerInput type='number' />
        hrs
      </MockProdFormTimerHrs>

      <MockProdFormTimerMin>
        <MockProdFormTimerInput type='number' />
        min
      </MockProdFormTimerMin>

      <MockProdFormTimerSec>
        <MockProdFormTimerInput type='number' />
        sec
      </MockProdFormTimerSec>
    </MockProdFormCont>
  );
};

export default MockProdForm;
