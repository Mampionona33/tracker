import React from 'react';
import '../style/ManageNavBar.scss';

const ManageNavBar = () => {
  return (
    <div className='manageNavBar'>
      <ul className='manageNavBar__list'>
        <li className='manageNavBar__list__el'>TASK TYPE</li>
        <li className='manageNavBar__list__el'>USERS</li>
      </ul>
    </div>
  );
};

export default ManageNavBar;
