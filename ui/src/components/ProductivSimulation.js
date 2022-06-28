import React from 'react';
import TiteledCard from './TiteledCard';

const ProductivSimulation = () => {
  return (
    <div className='prodSimulation'>
      <div className='prodSimulation__radio'>
        <div className='prodSimulation__radio__element'>
          <input
            type='radio'
            name='simulationMethode'
            id='byElapstedTime'
            value={'By_Elapsted_Time'}
          />
          <label htmlFor='byElapstedTime'>By Elapsted Time</label>
        </div>
        <div className='prodSimulation__radio__element'>
          <input
            type='radio'
            name='simulationMethode'
            id='byEndingTime'
            value={'By_Ending_time'}
          />
          <label htmlFor='byEndingTime'>By Ending Time</label>
        </div>
      </div>
      <p>placeholder prod simul</p>
    </div>
  );
};

export default ProductivSimulation;
