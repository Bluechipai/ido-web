import styled from 'styled-components'
import buttonBorder from 'src/assets/buttonBorder.svg';

export const content_width = '82.5vw';

export const LinerButtonBorder = styled.div`
    display: inline-block;
    background: url(${buttonBorder});
    background-size: 100% 100%;
    padding: 0 0.56rem;
`;
export const LinerText = styled.div`
    display: inline-block;
    background: linear-gradient(272deg, #62FEFF -1.59%, #FFECA0 96.82%);
    background-size: 100% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const StepLabelTitle = styled.div`
    font-size: 0.16rem;
    font-weight: 500;
    color: #fff;
    margin-bottom: 0.08rem;
`;
export const StepLabelSubtitle = styled.div`
    font-size: 0.12rem;
    font-weight: 500;
    color: rgba(255,255,255,0.48);
    margin-bottom: 0.08rem;
`;

export const MiniButton = styled.button<{isGray?: boolean}>`
    height: 0.4rem;
    padding: 0 0.3rem;
    background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
    border-radius: 0.4rem;
    font-size: 0.18rem;
    font-weight: 600;
    color: #000;
    cursor: pointer;
    outline: none;
    border: none;
`;

export const EllipsisText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const MulEllipsisText = styled.div<{row: number}>`
    display: -webkit-box;
    -webkit-line-clamp: ${({row}) => row};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;
