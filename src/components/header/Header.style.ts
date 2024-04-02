import styled, {css} from 'styled-components'
import {FlexSb} from '../flex/Flex.tsx'
import {NavLink} from 'react-router-dom'
export const HeaderStyle = styled(FlexSb)<{active?: boolean}>`
    position: fixed;
    top: 0.16rem;
    left: 0.16rem;
    right: 0.16rem;
    height: 0.96rem;
    padding: 0 0.8rem;
    border-radius: 0.16rem;
    z-index: 20;
    transition: all 0.5s;
    transform: translateY(-1.2rem);
    ${({active}) => active 
            ? css`
                transform: translateY(0);
            ` 
            : null}
`;

export const NavLinkStyle = styled(NavLink)`
    position: relative;
    &:hover{
        &:after{
            content: '';
            position: absolute;
            left: 50%;
            bottom: -0.1rem;
            transform: translateX(-50%);
            width: 0.04rem;
            height: 0.04rem;
            border-radius: 50%;
            background: linear-gradient(90deg, #7BEBFF 4.22%, #FFECA0 90.71%);
        }
    }
`;
export const NavAnchorStyle = styled.a<{active?: boolean}>`
    position: relative;
    cursor: pointer;
    &:hover{
        &:after{
            content: '';
            position: absolute;
            left: 50%;
            bottom: -0.1rem;
            transform: translateX(-50%);
            width: 0.04rem;
            height: 0.04rem;
            border-radius: 50%;
            background: linear-gradient(90deg, #7BEBFF 4.22%, #FFECA0 90.71%);
        }
    }
`;
export const UserNavPanel = styled.div`
    position: absolute;
    top: 0.4rem;
    right: 0;
    border-radius: 0.16rem;
    background: rgba(0, 0, 0, 0.80);
    backdrop-filter: blur(0.2rem);
`;

export const NavPanelItemStyle = styled.div`
    display: flex;
    align-items: center;
    height: 0.48rem;
    margin: 0 0.16rem;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    white-space: nowrap;
    &:not(:last-child) {
        border-bottom: 0.01rem solid rgba(255, 255, 255, 0.2);
    }
    &:hover{
        color: #fff;
    }
`;
