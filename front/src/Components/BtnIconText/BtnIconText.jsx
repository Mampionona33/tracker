import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const BtnIconTextContainer = styled.button`
  display: flex;
  align-items: center;
  border: none;
  padding: 0 0.5rem;
  color: ${(props) => (props.iconColor ? props.iconColor : '#fff')};
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'black')};
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  :hover {
    box-shadow: ${(props) =>
      props.hoverBgColor
        ? 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
        : ''};
  }
  ::after {
    content: '${(props) => props.title}';
    text-transform: uppercase;
    font-size: 0.8rem;
    color: ${(props) => (props.textColor ? props.textColor : 'white')};
  }
`;

const BtnIconText = ({
  children,
  title,
  className,
  onClick,
  textColor,
  bgColor,
  hoverBgColor,
  iconColor,
  type = 'button',
}) => {
  return (
    <BtnIconTextContainer
      id={title}
      title={title}
      className={className}
      onClick={onClick}
      bgColor={bgColor}
      textColor={textColor}
      hoverBgColor={hoverBgColor}
      iconColor={iconColor}
      type={type}
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
  hoverBgColor: PropTypes.bool,
};

export default BtnIconText;
