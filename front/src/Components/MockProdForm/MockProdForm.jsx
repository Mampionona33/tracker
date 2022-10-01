import React, { useContext, useEffect, useRef, useState } from 'react';
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
    if (event.target.name === 'type') {
      console.log(event.target.value);
    }
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

  const handleFocus = (event) => {
    setFormState({ ...formSate, [event.target.name]: '' });
  };
  const handleBlure = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (value === '') {
      switch (name) {
        case 'nbAfter':
          setFormState({
            ...formSate,
            nbAfter: processingTask.reduce((a, b) => a + b).nbAfter,
          });
          break;
        case 'day':
          setFormState({
            ...formSate,
            day: 0,
          });
          break;
        case 'hrs':
          setFormState({
            ...formSate,
            hrs: 0,
          });
          break;
        case 'min':
          setFormState({
            ...formSate,
            min: 0,
          });
          break;
        case 'sec':
          setFormState({
            ...formSate,
            sec: 0,
          });
          break;

        default:
          break;
      }
    }

    const indexOfSelectedTaskType = refForm.current.children[3].selectedIndex;
    const selectedTaskType =
      refForm.current.children[3][indexOfSelectedTaskType].value;
    console.log(selectedTaskType);
  };

  const refForm = useRef(null);

  return (
    <MockProdFormCont onReset={handleReset} ref={refForm}>
      <MockProdFormLabel htmlFor='nbAfter'>nb after</MockProdFormLabel>
      <MockProdFormInputNbafter
        type='number'
        id='nbAfter'
        name='nbAfter'
        pattern='[0-9{0,5}]'
        placeholder={formSate.nbAfter}
        value={formSate.nbAfter}
        onChange={handleImputChange}
        onFocus={handleFocus}
        onBlur={handleBlure}
      />

      <MockProdFormLabel htmlFor='type'>task type</MockProdFormLabel>
      <MockProdFormSelection
        id='type'
        name='type'
        value={formSate.type}
        onChange={handleImputChange}
        onFocus={handleFocus}
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
              onFocus={handleFocus}
              onBlur={handleBlure}
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
          onFocus={handleFocus}
          onBlur={handleBlure}
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
          onFocus={handleFocus}
          onBlur={handleBlure}
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
          onFocus={handleFocus}
          onBlur={handleBlure}
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
