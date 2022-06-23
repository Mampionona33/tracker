import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Processing.scss';

export default function Processing() {
  return (
    <div className='processing'>
      <div className='row'>
        <h4 className='row__element'>BOOTH NUMBER</h4>
        <p className='row__element row__element--r'>15545</p>
      </div>

      <div className='row'>
        <h4 className='row__element'>TASK TYPE</h4>
        <p className='row__element row__element--r'>Contenu</p>
      </div>

      <div className='row'>
        <h4 className='row__element'>BOOTH URL</h4>
        <a
          target='_blank'
          className='row__element row__element--r'
          href='http://www.directindustry.com/restricted/FicheSociete.php?&s=13783&w=69458ONTiNo4Hs6tZmC5l2D56Z41Y1Z2l2V7pzgri52S4p3T3&droit=on'
        >
          http://www.directindustry.com/restricted/FicheSociete.php?&s=13783&w=69458ONTiNo4Hs6tZmC5l2D56Z41Y1Z2l2V7pzgri52S4p3T3&droit=on
        </a>
      </div>

      <div className='row'>
        <h4 className='row__element'>CATEGORY</h4>
        <p className='row__element row__element--r'>Electronic Component</p>
      </div>

      <div className='row'>
        <h4 className='row__element'>STATUS IVPN</h4>
        <p className='row__element row__element--r'>I</p>
      </div>

      <div className='row'>
        <h4 className='row__element'>NB BEFORE</h4>
        <p className='row__element row__element--r'>0</p>
      </div>

      <div className='row'>
        <h4 className='row__element'>NB AFTER</h4>
        <p className='row__element row__element--r'>100</p>
      </div>

      <div className='row'>
        <h4 className='row__element'>COMMENT</h4>
        <p className='row__element row__element--r'>
          This is hard coded component fqsdf dfqsfqsdfdfsqfqsfd dfqsdf
        </p>
      </div>
    </div>
  );
}
