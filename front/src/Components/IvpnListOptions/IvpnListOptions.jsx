import React from 'react';
import styled from 'styled-components';

const StyledOption = styled.option`
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

const Ivpn = ['i', 'v', 'p', 'n'].map((item, index) => (
  <StyledOption value={item} key={index}>
    {item.toUpperCase()}
  </StyledOption>
));

const IvpnListOptions = () => {
  return <>{Ivpn}</>;
};

export default IvpnListOptions;
