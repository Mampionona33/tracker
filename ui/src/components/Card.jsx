import React, { Children } from 'react';
import '../style/Card.scss';
export default function Card({ Children }) {
  return <div className='card'>{Children}</div>;
}
