import React,{useContext} from 'react';
import '../style/Modale.scss';
import {componentContext} from '../context/componentContext'

const Modale = () => {
  const ComponentContext = useContext(componentContext);
  const handleClickModale = (event) => {
    event.preventDefault();
    ComponentContext.closeSideBar();
    ComponentContext.closeDialogCreateNewTask();
    ComponentContext.closeDialogEditHistory();
  }

  return <div onClick={handleClickModale} className='modale'></div>;
};

export default Modale;
