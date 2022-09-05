import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
`;

const AnimatedCard = ({ children }) => {
  return <CardContainer className='AnimatedCard'>{children}</CardContainer>;
};

export default AnimatedCard;
