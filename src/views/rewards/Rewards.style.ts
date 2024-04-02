import styled from 'styled-components'
import banner_bg from '../../assets/img/rewards/banner_bg.avif'

const contentWidth = '14.4rem';
export const RewardsStyle  = styled.div`
    min-height: 100vh;
    background: #000;
`;

export const BannerStyle = styled.div`
    width: 100vw;
    height: 7.02rem;
    position: relative;
    background: url(${banner_bg}) no-repeat;
    background-size: cover;
    padding-top: 1.68rem;
    box-sizing: border-box;
`;
export const BannerContent = styled.div`
    position: relative;
    width: ${contentWidth};
    margin: 0 auto;
`;

export const ShareContainer = styled.div`
    min-width: 4.4rem;
    position: absolute;
    right: 0;
    top: 2.18rem;
    border-radius: 0.16rem;
    background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
    padding: 0.28rem 0.28rem 0.36rem;
    color: #000;
`;
export const InviteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.04rem;
    height: 0.4rem;
    border-radius: 0.4rem;
    background: #000;
    font-size: 0.18rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    border: none;
    &:disabled{
        opacity: 0.65;
    }
`;

export const ContentBox = styled.div`
    width: ${contentWidth};
    margin: 0 auto;
    padding: 1.28rem 0 0;
    
`;
export const TitleStyle = styled.h2`
    font-size: 0.28rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
`;
