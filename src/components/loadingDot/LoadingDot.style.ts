import styled, {keyframes} from "styled-components";

const dot = keyframes`
    0% { width: 0; margin-right: 1.5em; }
    33% { width: 0.5em; margin-right: 1em; }
    66% { width: 1em; margin-right: 0.5em; }
    100% { width: 1.5em; margin-right: 0;}
`;

export const DotContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.12rem;
    color: color: rgba(255, 255, 255, 0.4);
`;

export const LoadingDotStyle = styled.div`
    margin-left: 0.04rem;
    font-family: simsun;
    display: inline-block;
    width: 0.5em;
    vertical-align: bottom;
    overflow: hidden;
    animation: ${dot} 1.5s infinite step-start;
`;
