import React, { useContext, useEffect, useRef, useState } from 'react';
import { difDate } from '../../assets/timeUtility';
import { ComponentContext } from '../../context/componentContext';
import { TaskTypeContext } from '../../context/taskTypeContext';
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

  const { taskTypeList } = useContext(TaskTypeContext);

  const [formSate, setFormState] = useState({
    nbAfter: 0,
    type: '',
    day: 0,
    hrs: 0,
    min: 0,
    sec: 0,
    result: 0,
  });

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
      result: 0,
    });
  };

  const handleFocus = (event) => {
    setFormState({ ...formSate, [event.target.name]: '' });
  };

  const handleImputChange = (event) => {
    event.preventDefault();
    const prod = calculProd();

    const name = event.target.name;
    const value = event.target.value;
    if (name !== 'type') {
      setFormState({
        ...formSate,
        [name]: value,
        result: prod,
      });
    }
    if (event.target.name === 'type') {
      setFormState({ ...formSate, result: prod, type: value });
    }
    if (name === 'day' && value < 0) {
      setFormState({ ...formSate, day: 0 });
    }
    if (name === 'hrs') {
      if (value < 0) {
        setFormState({ ...formSate, hrs: 0 });
      }
      if (value > 23) {
        setFormState({
          ...formSate,
          hrs: value.toString().slice(0, value.toString().length - 1),
        });
      }
    }
    if (name === 'min') {
      if (value < 0) {
        setFormState({ ...formSate, min: 0 });
      }
      if (value > 59) {
        setFormState({
          ...formSate,
          min: value.toString().slice(0, value.toString().length - 1),
        });
      }
    }
    if (name === 'sec') {
      if (value < 0) {
        setFormState({ ...formSate, sec: 0 });
      }
      if (value > 59) {
        setFormState({
          ...formSate,
          sec: value.toString().slice(0, value.toString().length - 1),
        });
      }
    }
  };

  const handleBlure = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const prod = calculProd();
    setFormState({ ...formSate, result: prod });
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
  };

  const calculProd = () => {
    const indexOfSelectedTaskType = refForm.current.children[3].selectedIndex;
    const selectedTaskType =
      refForm.current.children[3][indexOfSelectedTaskType].value;

    const goal = Array.from(taskTypeList)
      .filter((item) => item.name === selectedTaskType)
      .reduce((a, b) => a + b).goal;

    const nbAfter =
      refForm.current[0].value !== '' ? parseInt(refForm.current[0].value) : 0;
    const day = !mockProdByEndingTime ? refForm.current[2].value : 0;
    const hrs = !mockProdByEndingTime
      ? refForm.current[3].value
      : refForm.current[2].value;

    const min = !mockProdByEndingTime
      ? refForm.current[4].value
      : refForm.current[3].value;

    const sec = !mockProdByEndingTime
      ? refForm.current[5].value
      : refForm.current[4].value;

    if (!mockProdByEndingTime) {
      const elapstedTime =
        parseInt(day) * 86400 +
        parseInt(hrs) * 3600 +
        parseInt(min) * 60 +
        parseInt(sec);

      const prod =
        elapstedTime > 0
          ? Math.round((nbAfter / elapstedTime / (goal / 3600)) * 100)
          : 0;
      return prod;
    }
    if (mockProdByEndingTime) {
      const elapstedTime = Array.from(
        processingTask.reduce((a, b) => a + b).session
      )
        .map((item) => {
          const now = new Date();
          now.setHours(hrs);
          now.setMinutes(min);
          now.setSeconds(sec);

          if (item.sessionStop) {
            return difDate(item.sessionStart, item.sessionStop);
          }
          if (!item.sessionStop && difDate(new Date(), now) > 0) {
            return difDate(item.sessionStart, now);
          }
        })
        .reduce((a, b) => a + b);

      const prod =
        elapstedTime > 0 && elapstedTime !== NaN
          ? Math.round((nbAfter / elapstedTime / (goal / 3600)) * 100)
          : 0;
      return prod;
    }
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
        min={0}
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
              min={0}
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
