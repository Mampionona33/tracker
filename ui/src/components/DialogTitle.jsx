import React from 'react';
import '../style/DialogTitle.scss';

const DialogTitle = ({ children }) => {
  return <h2 className='dialog__title'>{children}</h2>;
};

export default DialogTitle;
