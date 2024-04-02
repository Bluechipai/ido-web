import styled, { css } from 'styled-components'

export const TabStyle = styled.div`
    display: flex;
    padding-bottom: 0.12rem;
`;

export const TabItemStyle = styled.div<{active: boolean}>`
    position: relative;
    cursor: pointer;
    font-size: 0.28rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    &:not(:last-child){
        margin-right: 0.88rem;
    }
    ${({active}) => active 
        ? css`
            color: rgba(255, 255, 255, 1);
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 0.04rem;
                background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
                bottom: -0.08rem;
                left: 0;
                border-radius: 0.01rem;
            }
        ` 
        : null}
`;
