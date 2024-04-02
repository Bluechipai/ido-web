import styled from 'styled-components'
import {FlexBox, FlexCol, FlexRow} from '../flex/Flex.tsx'
import upload from '../../assets/img/upload.png'

export const UploadFileStyle = styled(FlexCol)`
    
`;

export const ImageLabel = styled(FlexRow)`
    font-size: 0.16rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: #000;
`;
export const UploadBox = styled.div`
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background: url(${upload});
    background-size: 100% 100%;
    margin-bottom: 0.24rem;
`;
export const ImageBox = styled.div`
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    margin-bottom: 0.24rem;
`;
export const CloseBox = styled(FlexBox)`
    position: absolute;
    right: 0.08rem;
    top: 0.08rem;
    width: 0.24rem;
    height: 0.24rem;
    cursor: pointer;
`;
export const Uploader = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
`;
export const ImageDesc = styled.div`
    font-size: 0.12rem;
    font-weight: 400;
    line-height: 0.24rem;
    color: rgba(0,0,0,0.57);;
`;
