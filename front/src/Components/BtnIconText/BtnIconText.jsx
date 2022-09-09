import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const BtnIconTextContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  ::after {
    content: '${(props) => props.title}';
    text-transform: uppercase;
    font-size: 0.8rem;
  }
`;

const BtnIconText = ({ children, title, className, onClick }) => {
  return (
    <BtnIconTextContainer
      id={title}
      title={title}
      className={className}
      onClick={onClick}
    >
      {children}
    </BtnIconTextContainer>
  );
};

BtnIconText.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

export default BtnIconText;
