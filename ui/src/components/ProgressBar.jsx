import React from 'react';
import '../style/ProgressBar.scss';

/* use this progress bar with ProgressBar.scss */
export default function ProgressBar({ completed }) {
  // const { completed } = props;

  const fillerStyles = {
    width: `${completed}%`,
  };

  return (
    <div className='progressbar'>
      <div
        className={
          completed >= 95
            ? 'progressbar__exelent'
            : completed >= 85
            ? 'progressbar__good'
            : 'progressbar__warning'
        }
        style={fillerStyles}
      >
        <span
          className={
            'progressbar__label' +
            (completed < 18 && completed >= 10
              ? ' inf32'
              : completed < 10
              ? ' inf10'
              : '')
          }
        >{`${completed}%`}</span>
      </div>
    </div>
  );
}
