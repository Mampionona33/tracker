import React from 'react';
import styled from 'styled-components';

const StyledOptionStatCom = styled.option`
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

const StatComOption = [
  '---',
  'Abandon',
  'Abonné',
  'Dégradé',
  'DégradéDefinitif',
  'Essai',
  'EssaiNouveau',
  'EssaiPayant',
  'Retiré',
].map((item, index) => (
  <StyledOptionStatCom
    style={{ textTransform: 'none' }}
    value={item}
    key={index}
  >
    {item}
  </StyledOptionStatCom>
));

const StatComListOptions = () => {
  return <>{StatComOption}</>;
};

export default StatComListOptions;
