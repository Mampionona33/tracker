import React from 'react';
import Card from '../components/Card';
import Pending from '../components/Pending';
import Processing from '../components/Processing';
import '../style/Dashboard.scss';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Card title={'Pending'} content={<Pending />} />
      <Card title={'Processing'} content={<Processing />} />
    </div>
  );
}
