import React from 'react';
import Card from './Card';
import '../style/Timing.scss';

export default function Timing(props) {
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
      </div>
    </div>
  );
}
