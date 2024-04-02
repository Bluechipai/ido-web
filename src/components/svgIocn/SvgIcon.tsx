import {CSSProperties, ReactNode} from 'react'
import Toggle from '../Toggle/Toggle'
import styled, {css} from 'styled-components'

type IProps = {
  children?: ReactNode
  style?: CSSProperties
  color?: string
  fillColor?: string
  hoverColor?: string
  dangerouslySetInnerHTML?: string
  className?: string
  width?: string
  height?: string
}

const SvgBox = styled.span<{
  color?: string
  fillColor?: string
  hoverColor?: string
  width?: string
  height?: string
}>`
  svg {
    path {
      fill: ${({fillColor}) => fillColor};
      stroke: ${({color}) => color};
    }
    &:hover {
      path {
        fill: ${({hoverColor}) => hoverColor};
        stroke: ${({hoverColor}) => hoverColor};
      }
    }
    ${({width}) =>
      width
        ? css`
            width: ${width};
          `
        : null}
    ${({height}) =>
      height
        ? css`
            height: ${height};
          `
        : null}
  }
`

export default function SvgIcon(props: IProps) {
  return (
    <Toggle flag={!!props.dangerouslySetInnerHTML}>
      <SvgBox
        className={`${props.className} flex items-center justify-center child-svg:w-[${props.width}] child-svg:h-[${props.height}]`}
        style={props.style}
        color={props.color}
        fillColor={props.fillColor}
        hoverColor={props.hoverColor}
        width={props.width}
        height={props.height}
        dangerouslySetInnerHTML={{__html: props.dangerouslySetInnerHTML || ''}}
      />
      <SvgBox
        className={`${props.className} flex items-center justify-center child-svg:w-[${props.width}] child-svg:h-[${props.height}]`}
        style={props.style}
        color={props.color}
        fillColor={props.fillColor}
        hoverColor={props.hoverColor}
        width={props.width}
        height={props.height}>
        {props.children}
      </SvgBox>
    </Toggle>
  )
}
