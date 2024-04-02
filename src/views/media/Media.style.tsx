import styled from 'styled-components'
import history_bg from '../../assets/img/history/history_bg.png'
import {LinerText} from '../../global.style.ts'
import {FlexBox, FlexCol} from '../../components/flex/Flex.tsx'
export const MediaStyle = styled.div`
    min-height: 15.68rem;
    background: url(${history_bg});
    background-size: cover;
    padding-bottom: 4.2rem;
`;

export const MediaContentStyle = styled.div`
    width: 14.4rem;
    margin: 0 auto;
    padding-top: 2.16rem;
`;
export const DownloadButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 3.16rem;
    height: 0.52rem;
    border-radius: 0.4rem;
    cursor: pointer;
    background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
    font-size: 0.18rem;
    font-weight: 600;
    color: #000;
    &:hover{
        color: #000;
    }
`;

export const MediaTitle = styled(LinerText)`
    font-size: 0.68rem;
    font-weight: 500;
    margin-bottom: 0.48rem;
    text-transform: uppercase;
`;
export const MediaDesc = styled.div`
    width: 7.18rem;
    font-size: 0.2rem;
`;

export const MediaContent = styled.div`
    width: 14.4rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.36rem;
`;
export const MediaItem = styled(FlexCol)`
    
`;
export const MediaItemBox = styled(FlexBox)`
    height: 2rem;
    border-radius: 0.16rem;
    margin-bottom: 0.16rem;
`;
export const MediaButton  = styled(FlexBox)`
    width: 0.64rem;
    height: 0.32rem;
    font-size: 0.16rem;
    font-weight: 400;
    border-radius: 0.04rem;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(0.04rem);
    color: rgba(255, 255, 255, 0.60);
`;
