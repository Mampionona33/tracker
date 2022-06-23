import React from 'react';
import '../style/TiteledCard.scss';

const TiteledCard = ({ title, content }) => {
  return (
    <div className='titledCard'>
      <h2 className='titledCard__title'>{title}</h2>
      <div className='titledCard__body'>{content}</div>
    </div>
  );
};

export default TiteledCard;
