import React, { useContext } from 'react';
import styled from 'styled-components';
import { TaskTypeContext } from '../../context/taskTypeContext';

const StyledTaskTypeOption = styled.option`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;
const TaskTypeOptions = () => {
  const { taskTypeList } = useContext(TaskTypeContext);
  console.log(taskTypeList);
  return (
    <>
      {taskTypeList
        ? Array.from(taskTypeList).map((item) => (
            <StyledTaskTypeOption value={item.name} key={item.id}>
              {item.name}
            </StyledTaskTypeOption>
          ))
        : ''}
    </>
  );
};

export default TaskTypeOptions;
