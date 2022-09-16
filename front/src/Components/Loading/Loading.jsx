import React from 'react';
import { LoadingCont } from './Loading.styled';

const Loading = ({
  firstColor = '#aea79f',
  seconColor = '#5e2750',
  zIndex = 'auto',
  width = '3rem',
  height = '3rem',
}) => {
  return (
    <LoadingCont
      firstColor={firstColor}
      seconColor={seconColor}
      zIndex={zIndex}
      width={width}
      height={height}
    ></LoadingCont>
  );
};

export default Loading;
