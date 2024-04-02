import React, {
  CSSProperties,
  MouseEventHandler, ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import * as style from './modal.style'
import * as styleH5 from './modal.style.h5'
import {useEffectState} from '../../hooks/useEffectState'
import {CSSTransition} from 'react-transition-group'
import Toggle from '../Toggle/Toggle'
import {Border} from './modal.style.h5'
import {getEventParentElement} from '../../utils/tools.ts'
import SvgIcon from '../svgIocn/SvgIcon.tsx'
import {CloseIcon} from '../../utils/svgManage.ts'

type IProps = {
  title?: ReactNode
  children?: React.ReactNode
  handleClick?(): void
  onClick?: MouseEventHandler
  close?(): void
  closeIcon?: string
  disabledModalClick?: boolean
  disableHead?: boolean
  disabledBorder?: boolean
  style?: CSSProperties
  titleStyle?: CSSProperties
  containerStyle?: CSSProperties
  contentStyle?: CSSProperties
  fullScreen?: boolean
  isH5?: boolean
  active?: boolean
  enableBodyScroll?: boolean
}
export default function Modal(props: IProps) {
  const mouseDownTarget = useRef<EventTarget | null>(null)
  const {ModalBox} = props.isH5 ? styleH5 : style

  const state = useEffectState({
    active: false,
    touchStart: 0,
  })

  useEffect(() => {
    const cssText = document.body.style.cssText
    if (props.isH5 && !props.enableBodyScroll) {
      document.body.style.cssText = 'overflow: hidden;'
    }
    return () => {
      document.body.style.cssText = cssText
    }
  }, [props.isH5])

  useEffect(() => {
    if (typeof props.active === 'boolean') {
      state.active = props.active
      if (!props.active && !props.isH5 && typeof props.close === 'function') {
        props.close()
      }
    } else {
      state.active = true
    }
  }, [props.active, props.isH5])

  const boxStyle = useMemo(() => {
    const style = props.fullScreen ? {overflow: 'auto'} : {}
    return Object.assign({}, style, props.containerStyle)
  }, [props.fullScreen, props.containerStyle])

  const titleStyle = useMemo(() => {
    /*let baseStyle = props.isH5 ? {marginBottom: "0.24rem"} : {marginBottom: "0.16rem"};*/
    const baseStyle = {marginBottom: '0.12rem'}
    return Object.assign({}, baseStyle, props.titleStyle)
  }, [props.isH5, props.titleStyle])

  function handleClick(event: React.MouseEvent) {
    if (!props.disabledModalClick) {
      // @ts-ignore
      // let targetId = event.target.id;
      if (
        !props.isH5 &&
        mouseDownTarget.current === event.currentTarget &&
        typeof props.close === 'function'
      ) {
        props.close()
      }
      // @ts-ignore
      if (props.isH5 && !getEventParentElement(event.target, 'modal_content')) {
        state.active = false
      }
    }
  }

  /*Drag the mouse*/
  function onTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    console.log(event)
    /*const touchEnd = event.changedTouches[0].clientY;
        if (state.touchStart && touchEnd && touchEnd - state.touchStart > 100) {
            state.active = false;
        }
        state.touchStart = 0;*/
  }

  return (
    <ModalBox
      style={boxStyle}
      id={'modal'}
      onMouseDown={(event) => {
        mouseDownTarget.current = event.target
      }}
      onClick={handleClick}>
      <CSSTransition
        in={state.active}
        timeout={200}
        classNames={props.isH5 ? 'my-slider-up' : ''}
        unmountOnExit
        onExited={() => {
          if (props.isH5 && typeof props.close === 'function') {
            props.close()
          }
        }}>
        <div
          className={`modal_content_box bg-[rgba(255,255,255,0.90)] backdrop-blur-[1rem]`}
          style={props.style}
          onTouchStart={(event) => {
            state.touchStart = event.touches[0].clientY
          }}
          onTouchEnd={onTouchEnd}
          onClick={(event) => {
            // event.stopPropagation();
            // @ts-ignore
            if (
              props.isH5 &&
              // @ts-ignore
              !getEventParentElement(event.target, 'modal_content')
            ) {
              state.active = false
            }
            props.onClick && props.onClick(event)
          }}>
          <div className={'close'} onClick={props.close}>
            <SvgIcon dangerouslySetInnerHTML={props.closeIcon || CloseIcon} />
          </div>
          <Toggle flag={!!props.isH5 && !props.disabledBorder}>
            <Border />
          </Toggle>
          {props.disableHead ? null : (
            <h1
              className="modal-title"
              style={titleStyle}>
              {props.title}
            </h1>
          )}
          <div
            className={'modal_content'}
            id={'modal_content'}
            style={props.contentStyle}>
            {props.children}
          </div>
        </div>
      </CSSTransition>
    </ModalBox>
  )
}
