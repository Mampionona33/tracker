import React from 'react';
import { Outlet,useParams } from 'react-router-dom';
import ManageTabTaskType from './ManageTabTaskType'
import ManageTabUser from './ManageTabUser'
import ManageTabTasks from './ManageTabTasks'

function ManageTabContainer() {
  const {manage_tab} = useParams()

  return (
    <div>
      {manage_tab === 'task_type' ? 
      <ManageTabTaskType/> : 
      manage_tab === 'users' ? 
      <ManageTabUser/> :
      manage_tab === 'tasks' ? 
      <ManageTabTasks/> :
       '' }
    </div>
  );
}

export default ManageTabContainer;
