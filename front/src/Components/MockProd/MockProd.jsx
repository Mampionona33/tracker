import React from 'react';
import Switch from '../Switch/Switch';
import { MocProdCont, MocProdTitle } from './MockProd.styled';

const MockProd = () => {
  return (
    <MocProdCont>
      <MocProdTitle>mock prod</MocProdTitle>
      <Switch label1='by elapsted time' label2='by ending time' />
    </MocProdCont>
  );
};

export default MockProd;
