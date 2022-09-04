import { createGlobalStyle } from 'styled-components';
// import bodyBackGround from '../public/background_curve.svg';

import { bodyBackGround } from './img/bodyBackGround.svg';

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Ubuntu;
        background-image: ${bodyBackGround};
    }
    .cursPointer{
        cursor: pointer;
    }
    .darkAubergine{
       background-color : #2c001e;
    }
    .canonicalAubergine{        
        background-color : #772953;
    }
    .midAubergine{        
        background-color : #5e2750;
    }
    .lightAubergine{        
        background-color : #77216f;
    }
    .coolGrey{
        background-color : #333333;
    }
    .navBarBtn{
        background-color : #2c001e;
        cursor: pointer;
        height: 2rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0 0.2rem;
        :hover{
            background-color : #5e2750;
        }
    }


    @media screen and (max-width: 445px ) { 
        .navBarBtn{
            font-size: small;
        }
    }
    @media screen and (max-width: 315px ) { 
        .navBarBtn{
            font-size: x-small;
        }
    }
`;

export default GlobalStyle;
