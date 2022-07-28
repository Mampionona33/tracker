import React, { Children } from 'react';
import '../style/Card.scss';
export default function Card({ Children, styles }) {
  return <div className='card'>{Children}</div>;
}
