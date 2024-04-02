import styled, {css} from 'styled-components'
import useWidthChange from '../../hooks/useWidthChange.ts'
import {HTMLProps, useMemo, useState} from 'react'

const LinerButtonStyle = styled.div<{disabled?: boolean, radiusRound?: number, disabledHover?: boolean}>`
    position: relative;
    cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
    font-size: 0.18rem;
    font-weight: 600;
    ${({disabledHover, radiusRound}) => disabledHover 
            ? null 
            : css`
                &:hover{
                    background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
                    color: #000;
                    border-radius: ${radiusRound}px;
                    svg{
                        display: none;
                    }
                }
            `
    }
`

const ButtonContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

type ILinerButton = {
  radius: number
  percent?: number
  disabled?: boolean
  width: number
  height: number
  linerStart?: number
  disabledHover?: boolean
} & HTMLProps<HTMLDivElement>
export default function LinerButton(props: ILinerButton) {
  const {width: windowWidth} = useWidthChange();
  const [el_id] = useState(Math.random)
  const {
    onClick,
    radius,
    width,
    height,
    style,
    disabledHover,
    ...rest
  } = props;

  const radiusRound = useMemo(() => {
    const percent = props.percent || 0.65
    return Math.floor(windowWidth/1865*(props.radius * percent))
  }, [windowWidth, props.radius, props.percent])

  const cw = useMemo(() => {
    return Math.floor(windowWidth/1920*(props.width))
  }, [windowWidth, props.width])

  const ch = useMemo(() => {
    return Math.floor(windowWidth/1920*(props.height))
  }, [windowWidth, props.height])

  const computedStyle = useMemo(() => {
    return {
      width: `${cw}px`,
      height: `${ch}px`,
      ...props.style
    }
  }, [cw, ch, props.style])

  const x1 = useMemo(() => {
    if (typeof props.linerStart === 'number') {
      return Math.floor(windowWidth/1920*(props.linerStart))
    }
    return cw - 2
  }, [props.linerStart, windowWidth, cw])

  return (
    <LinerButtonStyle
      {...rest}
      style={computedStyle}
      radiusRound={radiusRound}
      disabledHover={props.disabledHover}
      onClick={(event) => {
         if (!props.disabled) {
           props.onClick && props.onClick(event)
         }
      }}>
      <svg width={cw} height={ch} viewBox={`0 0 ${cw} ${ch}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width={cw - 2} height={ch - 2} rx={radiusRound} stroke={`url(#paint0_linear_${el_id})`} stroke-width="2" />
        <defs>
          <linearGradient id={`paint0_linear_${el_id}`} x1={x1} y1={ch - 2} x2="1.844954" y2="33.6275"
                          gradientUnits="userSpaceOnUse">
            <stop stop-color="#3BF1F1" />
            <stop offset="1" stop-color="#FCEDA3" />
          </linearGradient>
        </defs>
      </svg>
      <ButtonContent>
        {props.children}
      </ButtonContent>
    </LinerButtonStyle>
  )
}
