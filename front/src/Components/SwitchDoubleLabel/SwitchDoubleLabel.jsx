import React, { useContext, useState } from 'react';
import { ComponentContext } from '../../context/componentContext';
import {
  SwitchDoubleLabelCheckBox,
  SwitchDoubleLabelCont,
  SwitchDoubleLabelLabel,
  SwitchDoubleLabelText,
  SwitchDoubleLabelWarper,
} from './SwitchDoubleLabel.styled';

const SwitchDoubleLabel = ({ label1, label2, id, disabled = false }) => {
  const {
    mockProdByEndingTime,
    setMockProdByEndingTimeTrue,
    setMockProdByEndingTimeFalse,
  } = useContext(ComponentContext);

  const onToggle = () => {
    !mockProdByEndingTime
      ? setMockProdByEndingTimeTrue()
      : setMockProdByEndingTimeFalse();
  };

  return (
    <SwitchDoubleLabelWarper>
      <SwitchDoubleLabelText>{label1}</SwitchDoubleLabelText>
      <SwitchDoubleLabelCont>
        <SwitchDoubleLabelCheckBox
          type='checkbox'
          id={id}
          name={id}
          checked={mockProdByEndingTime}
          onChange={onToggle}
          disabled={disabled}
        />
        <SwitchDoubleLabelLabel htmlFor={id} />
      </SwitchDoubleLabelCont>
      <SwitchDoubleLabelText>{label2}</SwitchDoubleLabelText>
    </SwitchDoubleLabelWarper>
  );
};

export default SwitchDoubleLabel;
