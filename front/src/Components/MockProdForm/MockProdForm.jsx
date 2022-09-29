import React, { useContext, useState } from 'react';
import { ComponentContext } from '../../context/componentContext';
import TaskTypeOptions from '../TaskTypeOptions/TaskTypeOptions';
import {
  MockProdFormButtonCont,
  MockProdFormCont,
  MockProdFormInputNbafter,
  MockProdFormInputReset,
  MockProdFormLabel,
  MockProdFormSelection,
  MockProdFormTimer,
  MockProdFormTimerDay,
  MockProdFormTimerHrs,
  MockProdFormTimerInput,
  MockProdFormTimerMin,
  MockProdFormTimerSec,
  MocProdFormResult,
} from './MockProdForm.styled';

const MockProdForm = () => {
  const { mockProdByEndingTime } = useContext(ComponentContext);
  const [result, setResult] = useState(95);
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

      <MockProdFormLabel>task type</MockProdFormLabel>
      <MockProdFormSelection>
        <TaskTypeOptions />
      </MockProdFormSelection>
      <MockProdFormLabel>
        {!mockProdByEndingTime ? 'elapsted time' : 'ending time'}
      </MockProdFormLabel>
      {!mockProdByEndingTime ? (
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
      ) : (
        ''
      )}

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
      <MocProdFormResult value={result}>{result}%</MocProdFormResult>
      <MockProdFormButtonCont>
        <MockProdFormInputReset type='reset'>
          <span className='material-icons-round'>undo</span>
          reset
        </MockProdFormInputReset>
      </MockProdFormButtonCont>
    </MockProdFormCont>
  );
};

export default MockProdForm;
