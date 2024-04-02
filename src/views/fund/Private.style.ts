import styled from 'styled-components'
import private_banner_bg from 'src/assets/img/private/private_banner_bg.png';
import {FlexBox, FlexCol, FlexSb} from '../../components/flex/Flex.tsx'
import buttonMiniBorder from 'src/assets/buttonMiniBorder.svg';

const contentWidth = '14.4rem';
export const PrivateStyle = styled.div`
    min-height: 100vh;
    background: #000;
`;
export const PrivateBanner = styled.div`
    height: 8.68rem;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%) no-repeat left top/19.2rem 3.2rem, 
                url(${private_banner_bg}) no-repeat center/19.2rem 8.68rem;
    padding-top: 1.6rem;
    box-sizing: border-box;
`;
export const PrivateContent = styled(FlexSb)`
    width: ${contentWidth};
    margin: 0 auto;
`;
export const Introduction = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 1.68rem;
    overflow: hidden;
`;
export const IntroductionTitle = styled.h2`
    text-transform: uppercase;
    font-size: 0.96rem;
    font-weight: 500;
    margin: 0 0 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const IntroductionDesc = styled.p`
    font-size: 0.2rem;
    font-weight: 400;
`;
export const LinerBorderButton = styled(FlexBox)`
    width: 1.3rem;
    height: 0.36rem;
    background: url(${buttonMiniBorder});
    background-size: 100% 100%;
    cursor: pointer;
`;


export const Information = styled.div`
    width: 5.92rem;
    flex-shrink: 0;
    border-radius: 0.28rem;
    background: rgba(6, 6, 6, 0.60);
    backdrop-filter: blur(0.4rem);
`;
export const InformationTitle = styled.h2`
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.36rem;
    font-weight: 600;
    margin: 0;
    border-bottom: 0.01rem dashed rgba(255, 255, 255, 0.2);
    text-align: left;
    padding-left: 0.56rem;
`;
export const InformationContent = styled.div`
    padding: 0.48rem 0.56rem 0.58rem;
`;

export const ContentBox = styled.div`
    width: ${contentWidth};
    margin: 0 auto;
    padding: 1.28rem 0 0;
    
`;
export const TitleStyle = styled.h2`
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 1.68rem;
    text-transform: uppercase;
`;
export const LabelStyle = styled.span`
    font-size: 0.28rem;
    font-weight: 600;
`;

export const DescList = styled.ul`
    list-style: disc;
    margin-left: 0.18rem;
    li{
        margin-bottom: 0.16rem;
        div{
            font-size: 0.16rem;
            color: rgba(255,255,255,0.64);
        }
    }
`;

export const DropdownContainer = styled(FlexCol)`
    border-bottom: 0.01rem solid rgba(255,255,255,0.2);
`;
