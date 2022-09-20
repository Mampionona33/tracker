import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ComponentContext } from '../../context/componentContext';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  background-color: ${(props) =>
    props.bc !== undefined ? props.bc : '#12000ff0'};
  /* height: ${(props) => `calc(100% + ${props.scrollY}px)`}; */
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  z-index: 1;
  justify-content: ${(props) =>
    props.justifyContent !== undefined && props.justifyContent};
`;

const Modal = ({ children, justifContent, bc }) => {
  const {
    sideBarOpen,
    dialogEditTask,
    dialogCreatTaskIsOpen,
    dialogConfirmSubmit,
    setDialogConfirmSubmitClose,
    setSideBarOpenFalse,
    setDialogEditTaskClose,
    setdialogCreatTaskClose,
  } = useContext(ComponentContext);

  const handleClickModal = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      sideBarOpen ? setSideBarOpenFalse() : '';
      dialogCreatTaskIsOpen ? setdialogCreatTaskClose() : '';
      dialogEditTask ? setDialogEditTaskClose() : '';
      dialogConfirmSubmit && setDialogConfirmSubmitClose();
    }
  };

  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    const positionY = window.scrollY;
    setScrollY((prev) => positionY);
  };

  useEffect(() => {
    // Prevent scroling when modal is open
    document.body.style.overflowY = 'hidden';
    window.addEventListener('scroll', handleScroll());
    return () => {
      document.body.style.overflowY = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ModalContainer
      onClick={handleClickModal}
      justifyContent={justifContent}
      bc={bc}
      scrollY={scrollY}
    >
      {children}
    </ModalContainer>
  );
};

Modal.prototype = {
  children: PropTypes.element,
};

export default Modal;
