import React from 'react';
import TiteledCard from '../components/TiteledCard';
import Pending from '../components/Pending';
import Processing from '../components/Processing';
import '../style/Dashboard.scss';
import Timing from '../components/Timing';
import ProductivSimulation from '../components/ProductivSimulation';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <TiteledCard title={'Pending'} content={<Pending />} />
      <TiteledCard title={'Processing'} content={<Processing />} />
      <TiteledCard title={'Timing'} content={<Timing />} />
      <TiteledCard
        title={'Prod Simulation'}
        content={<ProductivSimulation />}
      />
    </div>
  );
}
