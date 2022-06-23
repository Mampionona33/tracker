import React from 'react';
import Card from '../components/TiteledCard';
import Pending from '../components/Pending';
import Processing from '../components/Processing';
import '../style/Dashboard.scss';
import Timing from '../components/Timing';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Card title={'Pending'} content={<Pending />} />
      <Card title={'Processing'} content={<Processing />} />
      <Card title={'Timing'} content={<Timing />} />
    </div>
  );
}
