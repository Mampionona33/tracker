import React from 'react';
import BtnIconText from '../BtnIconText/BtnIconText';
import Modal from '../Modal/Modal';
import { SideBarContainer, SideBarList } from './SideBar.style';

function SideBar() {
  return (
    <Modal>
      <SideBarContainer>
        <SideBarList>
          <BtnIconText title={'DASHBOARD'} className='sideBarElement'>
            <span className='material-icons-round'>dashboard</span>
          </BtnIconText>
          <BtnIconText title={'DASHBOARD'} className='sideBarElement'>
            <span className='material-icons-round'>dashboard</span>
          </BtnIconText>
        </SideBarList>
      </SideBarContainer>
    </Modal>
  );
}

export default SideBar;
