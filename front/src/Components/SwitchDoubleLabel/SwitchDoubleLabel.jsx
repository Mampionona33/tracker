import React, { useState } from 'react';
import {
  SwitchDoubleLabelCheckBox,
  SwitchDoubleLabelCont,
  SwitchDoubleLabelLabel,
  SwitchDoubleLabelText,
  SwitchDoubleLabelWarper,
} from './SwitchDoubleLabel.styled';

const SwitchDoubleLabel = ({ label1, label2, id, disabled = false }) => {
  const [isTogggle, setIsToggle] = useState(false);
  const onToggle = () => setIsToggle(!isTogggle);

  return (
    <SwitchDoubleLabelWarper>
      <SwitchDoubleLabelText>{label1}</SwitchDoubleLabelText>
      <SwitchDoubleLabelCont>
        <SwitchDoubleLabelCheckBox
          type='checkbox'
          id={id}
          name={id}
          checked={isTogggle}
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
