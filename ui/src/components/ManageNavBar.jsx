import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/ManageNavBar.scss';
import FloatingButton from './FloatingButton';

const ManageNavBar = () => {
  const navigate = useNavigate();
  const { manage_tab } = useParams();

  useEffect(() => {
    navigate('task_type');
  }, []);

  const tabComponents = [
    {
      label: 'TASK TYPE',
      params: 'task_type',
    },
    {
      label: 'USERS',
      params: 'users',
    },
    {
      label: 'TASKS',
      params: 'tasks',
    },
  ];


  const TabList = tabComponents.map((item, keys) => {
    return (
      <li
        key={keys}
        onClick={(ev) => onClickTab(ev, item.params)}
        className={`manageNavBar__list__el ${
          manage_tab === item.params ? 'tab_active' : ''
        }`}
      >
        {item.label}
      </li>
    );
  });

  const onClickTab = (event, param) => {
    event.preventDefault();
    navigate(param);
  };

  return (
    <div className='manageNavBar'>
      <ul className='manageNavBar__list'>{TabList}</ul>
    </div>
  );
};

export default ManageNavBar;
