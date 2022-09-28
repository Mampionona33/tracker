import styled from 'styled-components';

export const SwitchDoubleLabelWarper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

export const SwitchDoubleLabelCont = styled.div`
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SwitchDoubleLabelLabel = styled.label`
  margin: 0;
  width: 42px;
  border-radius: 15px;
  background: #1565c0;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

export const SwitchDoubleLabelCheckBox = styled.input`
  opacity: 0;
  display: none;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  &:checked + ${SwitchDoubleLabelLabel} {
    background: #4fbe79;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
  &:disabled + ${SwitchDoubleLabelLabel} {
    background-color: #cfd8dc;
  }
`;

export const SwitchDoubleLabelText = styled.p`
  text-transform: uppercase;
  margin: 0;
  font-size: 0.7rem;
`;
