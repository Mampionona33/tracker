import React from 'react';
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
    </MocProdCont>
  );
};

export default MockProd;
