import styled from 'styled-components'

import banner_bg from 'src/assets/img/home/banner_bg.avif';
import buttonBorder from 'src/assets/img/buttonBorder.png';
import borderSvg from 'src/assets/img/border.svg';

export const HomeStyle = styled.div`

`;

export const BannerStyle = styled.div`
    width: 100vw;
    height: 13.06rem;
    position: relative;
    background: url(${banner_bg}) no-repeat;
    background-size: cover;
`;

export const AccessButton = styled.div`
    line-height: 1.5rem;
    background: url(${buttonBorder});
    background-size: 100% 100%;
`;
export const AccessText = styled.div`
    padding: 0 0.56rem;
    background: linear-gradient(272deg, #62FEFF -1.59%, #FFECA0 96.82%);
    background-size: 100% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const LaunchpadButton = styled.button`
    min-width: 1.86rem;
    height: 0.48rem;
    border-radius: 0.4rem;
    background: url(${borderSvg});
    background-size: 100% 100%;
    font-size: 0.2rem;
    font-weight: 500;
    border: none;
    &:hover{
        background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
        color: #000;
    }
`;
export const SubscribeButton = styled.button`
    min-width: 1.86rem;
    height: 0.48rem;
    background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
    color: #000;
    font-size: 0.2rem;
    font-weight: 500;
    border: none;
    border-radius: 0.4rem;
`;

export const ModalRadio = styled.div`
    width: 2.16rem;
    height: 2.16rem;
    position: absolute;
    border: 0.02rem solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.10);
    backdrop-filter: blur(0.05rem);
    transform: translate(-50%, -50%);
    transition: all 0.15s;
`;
