import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BtnIconText from '../BtnIconText/BtnIconText';
import Modal from '../Modal/Modal';
import { SideBarContainer, SideBarList } from './SideBar.style';
import { AuthConext } from '../../context/authContext';
import { ComponentContext } from '../../context/componentContext';

function SideBar() {
  const navigate = useNavigate();
  const { userRole } = useContext(AuthConext);
  const { sideBarOpen, setSideBarOpenFalse } = useContext(ComponentContext);
  const handleClickDashboardBtn = (event) => {
    event.preventDefault();
    navigate('dashboard');
    sideBarOpen && setSideBarOpenFalse();
  };

  const handleScroll = () => {
    const postionY = window.scrollY;
    setSideBarScrollY(postionY);
  };

  const [sideBarScrollY, setSideBarScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll());
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <SideBarContainer>
        <SideBarList sideBarScrollY={sideBarScrollY}>
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
          {userRole && userRole.match(/admin/gi) && (
            <BtnIconText title={'MANAGE'} className='sideBarElement'>
              <span className='material-icons-round'>admin_panel_settings</span>
            </BtnIconText>
          )}
        </SideBarList>
      </SideBarContainer>
      <Modal />
    </>
  );
}

export default SideBar;
