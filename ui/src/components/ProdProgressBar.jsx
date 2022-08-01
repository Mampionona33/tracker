import React from 'react';
import ProgressBar from './ProgressBar';

const ProdProgressBar = () => {
  return (
    <div style={{ width: '12rem' }}>
      <ProgressBar completed={60} />
    </div>
  );
};

export default ProdProgressBar;
