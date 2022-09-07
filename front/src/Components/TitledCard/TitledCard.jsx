import React from 'react';
import {
  TitledCardContainer,
  TitledCardSeconCont,
  TitledCardFirdCont,
  TitleCardFourth,
  TitledCardBody,
} from './TitledCard.style';

const TitledCard = ({ children, icon, iconBackGround, title }) => {
  return (
    <>
      <TitledCardContainer>
        <TitledCardSeconCont>
          <TitledCardFirdCont>
            <TitleCardFourth bc={iconBackGround}>
              <span className='material-icons-round'>{icon}</span>
            </TitleCardFourth>
          </TitledCardFirdCont>
        </TitledCardSeconCont>
        <TitledCardBody title={title}>{children}</TitledCardBody>
      </TitledCardContainer>
    </>
  );
};

export default TitledCard;
