import styled from 'styled-components'
import history_bg from '../../assets/img/history/history_bg.png'
import {FlexCol, FlexRow} from '../../components/flex/Flex.tsx'

export const contentWidth = '82.5vw';
export const minWidth = '14.4rem';
export const ApplyStyle = styled.div`
    min-height: 100vh;
    background: url(${history_bg});
    background-size: cover;
    padding-bottom: 2.2rem;
`;

export const ApplyContentStyle = styled.div`
    margin: 0 auto;
    padding-top: 2.16rem;
`;

export const Title = styled.h2`
    font-size: 0.48rem;
    font-weight: 500;
    margin: 0 auto 0.48rem;
    text-transform: uppercase;
    text-align: center;
`;
export const GroupLabel = styled.div`
    font-size: 0.28rem;
    font-weight: 700;
    margin-bottom: 0.32rem;
    color: #000;
    text-transform: uppercase;
`;
export const FormContainer = styled.div`
    width: ${contentWidth};
    min-width: ${minWidth};
    margin: 0.96rem auto 0;
    display: grid; 
    grid-template-columns: repeat(2, 1fr);
    padding: 0.8rem 0 0;
    background: rgba(255, 255, 255, 0.90);
    backdrop-filter: blur(1rem);
    border-radius: 0.16rem;
    overflow: hidden;
`;
export const FormGird = styled.div`
    padding: 0 1.2rem;
`;
export const FormItemStyle = styled(FlexCol)`
    &:not(:last-child){
        /*margin-bottom: 0.12rem;*/
    }
`;
export const InputStyle = styled.input`
    width: 100%;
    height: 0.56rem;
    border-bottom: 0.01rem solid rgba(0,0,0,0.2);
    font-size: 0.16rem;
    font-weight: 500;
    color: #333;
    outline: none;
    background: transparent;
`;
export const FormLabel = styled(FlexRow)`
    min-height: 0.12rem;
    font-size: 0.12rem;
    color: rgba(0,0,0,0.57);;
`;
export const Suffix = styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.16rem;
    font-weight: 500;
    color: rgba(0,0,0,0.3);;
`;
export const WarnBox = styled(FlexRow)`
    height: 0.32rem;
    color: crimson;
`;


export const ImageGroup = styled(FlexCol)`
    
`;
export const ImageLabel = styled(FlexRow)`
    font-size: 0.16rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: #000;
`;
export const ImageDesc = styled.div`
    font-size: 0.12rem;
    font-weight: 400;
    line-height: 0.24rem;
    color: rgba(0,0,0,0.57);;
`;

export const SubmitBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 1.04rem;
    background: #fff;
    padding-right: 0.32rem;
`;

export const SubmitBtn = styled.button<{isGray?: boolean}>`
    height: 0.52rem;
    padding: 0 0.5rem;
    background: ${({isGray}) => isGray ? 'rgba(0, 0, 0, 0.20)' : 'linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%)'};
    border-radius: 0.5rem;
    font-size: 0.18rem;
    font-weight: 600;
    color: ${({isGray}) => isGray ? '#fff' : '#000'};
    cursor: pointer;
    border: none;
    outline: none;
`;
export const MiniButton = styled.button<{isGray?: boolean}>`
    height: 0.4rem;
    padding: 0 0.3rem;
    background: ${({isGray}) => isGray ? 'rgba(0, 0, 0, 0.20)' : 'linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%)'};
    border-radius: 0.4rem;
    font-size: 0.18rem;
    font-weight: 600;
    color: ${({isGray}) => isGray ? '#fff' : '#000'};
    cursor: pointer;
    border: none;
    outline: none;
`;
