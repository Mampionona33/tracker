import React, { useContext } from 'react';
import Card from './Card';
import '../style/Timing.scss';
import ProgressBar from './ProgressBar';
import FloatingButton from './FloatingButton';
import { TaskContext } from '../context/taskContext';

export default function Timing(props) {
  const taskContext = useContext(TaskContext);
  console.log(taskContext.userTaskPlay);

  return (
    <div className='timing'>
      <div className='timing__elapsted'>
        <h4 className='timing__elapsted --l'>Elapsted</h4>
        <div className='timing__elapsted --r clock'>
          <div className='clock__item'>
            <Card Children={'00'} />
            Day
          </div>
          <div className='clock__item'>
            <Card Children={'12'} />
            Hrs
          </div>
          <div className='clock__item'>
            <Card Children={'14'} />
            Min
          </div>

          <div className='clock__item'>
            <Card Children={'20'} />
            Sec
          </div>
        </div>
      </div>
      <hr className='timing__hr' />
      <div className='timing__actualProd'>
        <h4 className='timing__actualProd --l'>Actual Pro</h4>
        <div className='timing__actualProd --r progressbar'>
          <ProgressBar completed={60} />
        </div>
        <div className='timing__button'>
          <FloatingButton
            icon={taskContext.userTaskPlay.length > 0 ? 'pause' : 'play_arrow'}
            handleClickButton={(e) => {
              e.preventDefault();
              alert('play clicked');
            }}
          />
        </div>
      </div>
    </div>
  );
}
