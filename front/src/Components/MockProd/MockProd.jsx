import React from 'react';
import MockProdForm from '../MockProdForm/MockProdForm';
import SwitchDoubleLabel from '../SwitchDoubleLabel/SwitchDoubleLabel';
import { MocProdCont, MocProdTitle } from './MockProd.styled';

const MockProd = () => {
  return (
    <MocProdCont>
      <MocProdTitle>mock prod</MocProdTitle>
      <SwitchDoubleLabel
        id='mockProdCheckBox'
        label1='by elapsted time'
        label2='by ending time'
      />
      <MockProdForm />
    </MocProdCont>
  );
};

export default MockProd;
