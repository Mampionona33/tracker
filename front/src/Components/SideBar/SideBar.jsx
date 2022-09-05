import React from 'react';
import { useNavigate } from 'react-router-dom';
import BtnIconText from '../BtnIconText/BtnIconText';
import Modal from '../Modal/Modal';
import { SideBarContainer, SideBarList } from './SideBar.style';

function SideBar() {
  const navigate = useNavigate();
  const handleClickDashboardBtn = (event) => {
    event.preventDefault();
    navigate('dashboard');
  };
  return (
    <Modal>
      <SideBarContainer>
        <SideBarList>
          <BtnIconText
            title={'DASHBOARD'}
            className='sideBarElement'
            onClick={handleClickDashboardBtn}
          >
            <span className='material-icons-round'>dashboard</span>
          </BtnIconText>

          <BtnIconText title={'HISTORY'} className='sideBarElement'>
            <span className='material-icons-round'>work_history</span>
          </BtnIconText>

          <BtnIconText title={'SUBMITED TASKS'} className='sideBarElement'>
            <span className='material-icons-round'>task</span>
          </BtnIconText>
        </SideBarList>
      </SideBarContainer>
    </Modal>
  );
}

export default SideBar;
