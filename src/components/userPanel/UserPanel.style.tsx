import styled from 'styled-components'
import {FlexBox, FlexRow} from '../flex/Flex.tsx'

export const UserPanelStyle = styled.div<{active?: boolean}>`
    min-width: 5.12rem;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    transform: translateX(${({active}) => active ? '0' : '100%'});
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    padding: 0.4rem;
    color: #000;
    display: grid;
    grid-auto-flow: row;
    grid-gap: 0.48rem;
    grid-template-rows: auto auto auto 1fr;
    border-radius: 0.16rem;
    background: rgba(225, 225, 225, 0.80);
    backdrop-filter: blur(1.6rem);
    z-index: 900;
`;

export const Title = styled.h1`
    font-size: 0.32rem;
    font-weight: 700;
    margin-bottom: 0.08rem;
`;
export const Subtitle = styled.h2`
    font-size: 0.2rem;
    font-weight: 700;
`;
export const FieldBox = styled(FlexRow)`
    height: 0.48rem;
    border-radius: 0.08rem;
    opacity: 0.8;
    background: rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(0.4rem);
    padding-left: 0.16rem;
`;

export const BalanceBox = styled.div`
    display: flex;
    padding: 0.28rem 0;
    border-radius: 0.08rem;
    opacity: 0.8;
    background: rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(0.4rem);
`;
export const BalanceItem = styled(FlexBox)`
    flex: 1;
    flex-direction: column;
    overflow: hidden;
`;
export const BalanceSplit = styled.div`
    width: 0.01rem;
    height: 0.88rem;
    background: rgba(255, 255, 255, 0.2);
`;

export const CloseButton = styled(FlexBox)`
    position: absolute;
    right: 0.32rem;
    top: 0.32rem;
    width: 0.48rem;
    height: 0.48rem;
    cursor: pointer;
`;
