import {CSSProperties, ReactNode, useEffect, useRef} from 'react'
import * as style from './Tooltip.style'
import * as styleH5 from './Tooltip.style.h5'
import {useEffectState} from '../../hooks/useEffectState'
import ReactDOM from 'react-dom'

type IProps = {
  icon?: ReactNode
  children?: ReactNode
  style?: CSSProperties
  panelStyle?: CSSProperties
  dir?: string
  calc_left?: number
  calc_top?: number
  calc_right?: number
  isH5?: boolean
  contentStyle?: CSSProperties
}
export default function Tooltip(props: IProps) {
  const iconRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const {QuestionContent, QuestionStyle, TooltipStyle} = props.isH5
    ? styleH5
    : style
  const state = useEffectState({
    left: 0,
    top: 0,
    showTip: false,
    panelStyle: {} as CSSProperties,
  })

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    setTimeout(() => {
      calcPosition()
    }, 0)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [state.showTip])

  function handleScroll() {
    state.showTip = false
  }

  function calcPosition() {
    if (iconRef.current) {
      state.left = iconRef.current.getBoundingClientRect().left
    }
    if (iconRef.current && iconRef.current) {
      state.top =
        iconRef.current.getBoundingClientRect().top +
        iconRef.current.clientHeight
    }

    if (iconRef.current && panelRef.current) {
      const left = iconRef.current.getBoundingClientRect().left
      let _top = iconRef.current.getBoundingClientRect().top
      // const width = iconRef.current.offsetWidth;
      const height = iconRef.current.offsetHeight

      if (
        window.innerHeight - _top - height - 20 <
        panelRef.current.offsetHeight
      ) {
        _top = _top - panelRef.current.offsetHeight
      } else {
        _top = _top + height
      }

      if (window.innerWidth - left < panelRef.current.offsetWidth + 10) {
        state.panelStyle = {
          right:
            window.innerWidth -
            left -
            iconRef.current.offsetWidth / 2 +
            (props.calc_right || 0),
          left: 'unset',
          top: _top,
          opacity: 1,
        }
      } else {
        state.panelStyle = {
          left: left + (props.calc_left || 0),
          top: _top + (props.calc_top || 0),
          opacity: 1,
        }
      }
    } else {
      state.panelStyle = {}
    }
  }

  return (
    <TooltipStyle style={props.style}>
      <div
        ref={iconRef}
        onMouseOver={() => (state.showTip = true)}
        onMouseOut={() => (state.showTip = false)}>
        {props.icon ? props.icon : <QuestionStyle />}
      </div>
      {
        state.showTip
          ?
            ReactDOM.createPortal(<QuestionContent
            className={''}
            ref={panelRef}
            style={Object.assign(
              {},
              state.panelStyle,
              props.panelStyle
            )}>
            {props.children}
            </QuestionContent>, document.getElementById('root')!)
          : null
      }
    </TooltipStyle>
  )
}
