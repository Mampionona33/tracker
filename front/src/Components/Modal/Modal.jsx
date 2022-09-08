import React, { useContext } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ComponentContext } from '../../context/componentContext';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  background-color: #12000ff0;
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
`;

const Modal = ({ children }) => {
  const {
    sideBarOpen,
    setSideBarOpenFalse,
    dialogCreatTaskIsOpen,
    setdialogCreatTaskClose,
  } = useContext(ComponentContext);

  const handleClickModal = (event) => {
    event.preventDefault();
    sideBarOpen ? setSideBarOpenFalse() : '';
    dialogCreatTaskIsOpen && setdialogCreatTaskClose();
  };

  return <ModalContainer onClick={handleClickModal}>{children}</ModalContainer>;
};

Modal.prototype = {
  children: PropTypes.element,
};

export default Modal;
