import React, { useEffect, useState } from 'react';
import { CircularBtnCont } from './CircularBtn.styled';

function CircularBtn({ icon, backGroundCol, color, width, height }) {
  const [dimension, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleRisize = () => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    };
    window.addEventListener('resize', handleRisize);
  }, []);

  return (
    <CircularBtnCont
      backGroundCol={backGroundCol}
      color={color}
      width={dimension.width > 335 ? '46px' : '36px'}
      height={dimension.width > 335 ? '46px' : '36px'}
    >
      <span
        className='material-icons-round'
        style={{ fontSize: dimension.width > 335 ? 48 : 36 }}
      >
        {icon}
      </span>
    </CircularBtnCont>
  );
}

export default CircularBtn;
