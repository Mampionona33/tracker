import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Ubuntu;
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
    .sideBarElement{
        display: flex;
        background-color: #2c001e;
        gap: 0.2rem;
        :hover{
            cursor: pointer;
            background-color: #333333;
        }
    }


    .AnimatedCard::before{
        content: '';
        position: absolute;
        width: 113%;
        height: 75%;
        background: linear-gradient(#00ccff, #d400d4);
        animation: cardAnimation 5s alternate-reverse infinite;
    }

    .AnimatedCard::after{
        content: '';
        position: absolute;
        inset: 2px;
        background: #fff;
        border-radius: 0.5rem;
    }
    @keyframes cardAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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
