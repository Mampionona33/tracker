import React, { useContext, useEffect, useState } from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { ComponentContext } from '../../context/componentContext';
import MockProdForm from '../MockProdForm/MockProdForm';
import SwitchDoubleLabel from '../SwitchDoubleLabel/SwitchDoubleLabel';
import { MocProdCont, MocProdTitle } from './MockProd.styled';

const MockProd = () => {
  const { processingTask } = useGetProcessingTask();
  const [enableSwitch, setEnableSwitch] = useState(false);

  const { setMockProdByEndingTimeFalse, setMockProdByEndingTimeTrue } =
    useContext(ComponentContext);

  useEffect(() => {
    if (processingTask.length > 0) {
      const taskState = processingTask.reduce((a, b) => a + b).taskState;

      taskState === 'isPause'
        ? (setEnableSwitch(true), setMockProdByEndingTimeTrue())
        : setEnableSwitch(false),
        setMockProdByEndingTimeFalse();
    }
  }, [processingTask]);

  return (
    <MocProdCont>
      <MocProdTitle>mock prod</MocProdTitle>
      <SwitchDoubleLabel
        id='mockProdCheckBox'
        label1='by elapsted time'
        label2='by ending time'
        disabled={enableSwitch}
      />
      <MockProdForm />
    </MocProdCont>
  );
};

export default MockProd;
