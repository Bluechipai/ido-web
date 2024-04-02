import styled, {keyframes} from 'styled-components'

const rotateAnimate = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const transformAnimate = keyframes`
    0% {
        transform: translate(-50%, -50%);
    }
    50% {
        transform: translate(calc(-50% + 0.1rem), -50%);
    }
    100% {
        transform: translate(-50%, -50%);
    }
`;

export const MoreArrowStyle = styled.div`
    position: relative;
    &:hover{
        .arrow{
            animation: ${transformAnimate} 0.5s 2 linear;
        }
    }
`;

export const MoreBgImg = styled.img`
    width: 1.36rem;
    height: 1.36rem;
    border-radius: 50%;
    animation: ${rotateAnimate} 6s infinite linear;
`;

export const MoreArrowImg = styled.img`
    width: 0.36rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;
