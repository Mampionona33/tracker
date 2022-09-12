import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ComponentContext } from '../../context/componentContext';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  background-color: ${(props) =>
    props.bc !== undefined ? props.bc : '#12000ff0'};
  height: 100%;
  width: 100%;
  z-index: 1000;
  display: flex;
  overflow: hidden;
  justify-content: ${(props) =>
    props.justifyContent !== undefined && props.justifyContent};
`;

const Modal = ({ children, justifContent, bc }) => {
  const {
    sideBarOpen,
    setSideBarOpenFalse,
    dialogCreatTaskIsOpen,
    setdialogCreatTaskClose,
  } = useContext(ComponentContext);

  const handleClickModal = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      sideBarOpen ? setSideBarOpenFalse() : '';
      dialogCreatTaskIsOpen ? setdialogCreatTaskClose() : '';
    }
  };

  useEffect(() => {
    // Prevent scroling when modal is opan
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

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
