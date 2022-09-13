import React from 'react';
import { LoadingCont } from './Loading.styled';

const Loading = ({
  firstColor = '#aea79f',
  seconColor = '#5e2750',
  zIndex = 'auto',
}) => {
  return (
    <LoadingCont
      firstColor={firstColor}
      seconColor={seconColor}
      zIndex={zIndex}
    ></LoadingCont>
  );
};

export default Loading;
