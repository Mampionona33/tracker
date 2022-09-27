import React from 'react';
import { SwitchCont } from './Switch.styled';

const Switch = ({ label1, label2 }) => {
  return (
    <SwitchCont>
      <p>{label1}</p>
      <p>{label2}</p>
    </SwitchCont>
  );
};

export default Switch;
