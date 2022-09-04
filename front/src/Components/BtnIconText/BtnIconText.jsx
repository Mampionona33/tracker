import React from 'react';
import styled from 'styled-components';

const BtnIconTextContainer = styled.div`
  display: flex;
`;

const BtnIconText = ({ children, title, className, onClick }) => {
  return (
    <BtnIconTextContainer className={className} onClick={onClick}>
      {children}
      {title}
    </BtnIconTextContainer>
  );
};

export default BtnIconText;
