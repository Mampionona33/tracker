import React, { useContext } from 'react';
import { componentContext } from '../context/componentContext';
import FloatingButton from './FloatingButton';

const BtnEdit = ({ dataName }) => {
  const ComponentContext = useContext(componentContext);

  const handleClickBtn = (event) => {
    switch (`${dataName}`) {
      case 'processingTask':
        ComponentContext.openDialogEditProcessingTask();
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <FloatingButton
        icon={'edit'}
        handleClickButton={(e) => handleClickBtn(e)}
      />
    </div>
  );
};

export default BtnEdit;
