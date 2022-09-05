import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

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

BtnIconText.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default BtnIconText;
