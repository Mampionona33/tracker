import React, { useContext } from 'react';
import styled from 'styled-components';
import { TaskTypeContext } from '../../context/taskTypeContext';

const StyledTaskTypeOption = styled.option`
  display: flex;
  justify-content: flex-end;
`;
const TaskTypeOptions = () => {
  const { taskTypeList } = useContext(TaskTypeContext);
  return (
    <>
      {taskTypeList
        ? [...taskTypeList].map((item) => (
            <StyledTaskTypeOption value={item.name} key={item.id}>
              {item.name}
            </StyledTaskTypeOption>
          ))
        : ''}
    </>
  );
};

export default TaskTypeOptions;
