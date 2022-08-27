import React from 'react';
import ManageBtnCreateTaskType from './ManageBtnCreateTaskType'
import ManageTabTaskTypeTable from './ManageTabTaskTypeTable'
import styled from 'styled-components'


function ManageTabTaskType() {

const ManageTabTaskTypeContainer = styled.div`
  display : flex;
  padding : 1rem;
`

  return (
    <ManageTabTaskTypeContainer>
      <ManageBtnCreateTaskType/>
      <ManageTabTaskTypeTable/>      
    </ManageTabTaskTypeContainer>
  );
}

export default ManageTabTaskType;
