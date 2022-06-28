import React from 'react';
import '../style/ProgressBar.scss';

/* use this progress bar with ProgressBar.scss */
export default function ProgressBar(props) {
  const { completed } = props;

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
        <span className='progressbar__label'>{`${completed}%`}</span>
      </div>
    </div>
  );
}
