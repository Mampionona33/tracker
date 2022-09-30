import React, { useContext, useEffect, useState } from 'react';
import { ComponentContext } from '../../context/componentContext';
import TaskTypeOptions from '../TaskTypeOptions/TaskTypeOptions';
import useGetProcessingTask from './../../assets/Hooks/useGetProcessingTask';
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

  const { processingTask } = useGetProcessingTask();

  const [formSate, setFormState] = useState({
    nbAfter: 0,
    type: '',
    day: 0,
    hrs: 0,
    min: 0,
    sec: 0,
    result: 0,
  });

  const handleImputChange = (event) => {
    event.preventDefault();
    setFormState({ ...formSate, [event.target.name]: event.target.value });
    console.log(event.target.name);
  };

  useEffect(() => {
    if (processingTask.length > 0) {
      setFormState({
        ...formSate,
        nbAfter: processingTask.reduce((a, b) => a + b).nbAfter,
        type: processingTask.reduce((a, b) => a + b).type,
      });
    }
  }, [processingTask]);

  useEffect(() => {
    handleReset();
  }, [mockProdByEndingTime]);

  const handleReset = () => {
    setFormState({
      ...formSate,
      nbAfter:
        processingTask.length > 0
          ? processingTask.reduce((a, b) => a + b).nbAfter
          : 0,
      type:
        processingTask.length > 0
          ? processingTask.reduce((a, b) => a + b).type
          : '',
      day: 0,
      hrs: 0,
      min: 0,
      sec: 0,
    });
  };

  return (
    <MockProdFormCont onReset={handleReset}>
      <MockProdFormLabel htmlFor='nbAfter'>nb after</MockProdFormLabel>
      <MockProdFormInputNbafter
        type='number'
        id='nbAfter'
        name='nbAfter'
        pattern='[0-9{0,5}]'
        placeholder='00'
        value={formSate.nbAfter}
        onChange={handleImputChange}
      />

      <MockProdFormLabel htmlFor='type'>task type</MockProdFormLabel>
      <MockProdFormSelection
        id='type'
        name='type'
        value={formSate.type}
        onChange={handleImputChange}
      >
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
              value={formSate.day}
              onChange={handleImputChange}
              onInput={handleImputChange}
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
          value={formSate.hrs}
          onChange={handleImputChange}
          onInput={handleImputChange}
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
          value={formSate.min}
          onChange={handleImputChange}
          onInput={handleImputChange}
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
          value={formSate.sec}
          onChange={handleImputChange}
          onInput={handleImputChange}
        />
        sec
      </MockProdFormTimerSec>
      <MockProdFormLabel>result</MockProdFormLabel>
      <MocProdFormResult value={formSate.result}>
        {formSate.result}%
      </MocProdFormResult>
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
