import React from 'react';
import '../style/Card.scss';
const Card = ({ title, content }) => {
  return (
    <div className='card'>
      <h2 className='card__title'>{title}</h2>
      <div className='card__body'>{content}</div>
    </div>
  );
};

export default Card;
