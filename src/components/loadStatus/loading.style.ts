import styled, {keyframes} from 'styled-components'

const loadingRotate = keyframes`
	to {
		transform: rotate(1turn)
	}
`
const loadingDash = keyframes`
	0% {
		stroke-dasharray: 1,200;
		stroke-dashoffset: 0
	}

	50% {
		stroke-dasharray: 90,150;
		stroke-dashoffset: -0.4rem
	}

	to {
		stroke-dasharray: 90,150;
		stroke-dashoffset: -1.2rem
	}
`

export const LoadingMask = styled.div`
  position: absolute;
  z-index: 2000;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  backdrop-filter: blur(0.02rem);
  &.inline {
    position: initial;
    background-color: unset;
  }
`
export const LoadingSpinner = styled.div`
  top: 50%;
  width: 100%;
  text-align: center;
  position: absolute;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  &.inline {
    position: initial;
    transform: none;
  }
  .circular {
    height: 0.4rem;
    width: 0.4rem;
    animation: ${loadingRotate} 2s linear infinite;
    vertical-align: middle;
  }
  .path {
    animation: ${loadingDash} 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #5dd796;
    stroke-linecap: round;
  }
`
