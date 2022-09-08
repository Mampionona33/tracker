import React, { useContext } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ComponentContext } from '../../context/componentContext';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  background-color: ${(props) =>
    props.bc !== undefined ? props.bc : '#12000ff0'};
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent !== undefined && props.justifyContent};
`;
/* background-color: #12000ff0; */

const Modal = ({ children, justifContent, bc }) => {
  const {
    sideBarOpen,
    setSideBarOpenFalse,
    dialogCreatTaskIsOpen,
    setdialogCreatTaskClose,
  } = useContext(ComponentContext);

  const handleClickModal = (event) => {
    // event.preventDefault();
    console.log(event);
    if (event.target === event.currentTarget) {
      sideBarOpen ? setSideBarOpenFalse() : '';
      dialogCreatTaskIsOpen ? setdialogCreatTaskClose() : '';
    }
  };
  console.log(bc);
  return (
    <ModalContainer
      onClick={handleClickModal}
      justifyContent={justifContent}
      bc={bc}
    >
      {children}
    </ModalContainer>
  );
};

Modal.prototype = {
  children: PropTypes.element,
};

export default Modal;
