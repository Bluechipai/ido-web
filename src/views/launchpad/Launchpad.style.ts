import styled from 'styled-components'
import page_bg from 'src/assets/img/page_bg.avif';
export const LaunchpadStyle = styled.div`
    min-height: 100vh;
    background: #080808 url(${page_bg}) no-repeat left bottom;
    background-size: 100% 15.68rem;
    backdrop-filter: blur(0.02rem);
`;

export const LaunchpadContentStyle = styled.div`
    width: 14.4rem;
    margin: 0 auto;
    padding-top: 2.24rem;
`;

export const TitleStyle = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
    color: #fff;
    margin-bottom: 1.28rem;
    text-transform: uppercase;
`;
