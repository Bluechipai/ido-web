import {CSSProperties, ReactNode, useEffect} from 'react'
import {useTranslation, withTranslation} from 'react-i18next'
import * as style from './MessageBox.style'
import * as styleH5 from './MessageBox.style'
import ReactDOM from 'react-dom'
import Toggle from '../Toggle/Toggle'
import LoadButton from '../loadButton/LoadButton'
import {CSSTransition} from 'react-transition-group'
import {useEffectState} from '../../hooks/useEffectState'
import {store} from '../../store'
import {Provider} from 'react-redux'
import useWidthChange from '../../hooks/useWidthChange'
import {useTheme} from '../../hooks/useTheme.ts'

// const success_icon = require("src/assets/images/success.png");
// const fail_icon = require("src/assets/images/fail.png");
// const warn_icon = require("src/assets/images/icon_tips.png");
// const icons = [success_icon, fail_icon, warn_icon];

interface IParams {
  title: string
  content?: ReactNode
  type?: any
  displayBtn?: boolean
  confirmText?: string
  cancelText?: string
  callback?(): void
  onConfirm?(): void
  titleStyle?: CSSProperties
}

export interface IMessageBox extends IParams {
  className?: string
  style?: CSSProperties
  destoryComponent(): void
}
export function MessageBox(props: IMessageBox) {
  const {t} = useTranslation()
  const {isH5} = useWidthChange()
  const {isDark} = useTheme()
  const {BtnGroup, MessageBoxStyle} = isH5 ? styleH5 : style
  const state = useEffectState({
    active: false,
  })

  useEffect(() => {
    state.active = true
  }, [])

  useEffect(() => {
    setTimeout(() => {
      state.active = false
    }, 3 * 1000)
  }, [])

  return (
    <CSSTransition
      in={state.active}
      timeout={200}
      unmountOnExit
      onExited={() => {
        props.destoryComponent()
      }}>
      <MessageBoxStyle style={{background: isDark ? '#060c0a' : '#D2D5D4'}}>
        <h3
          className={'title flex-row whitespace-nowrap text-baseColor_light dark:text-baseColor'}
          style={props.titleStyle}>
          {/*<img src={props.type ? icons[props.type] : icons[MsgStatus.success]} className={"icon"} alt="" />*/}
          <div>{props.title}</div>
        </h3>
        {props.content ? (
          <div className={'content text-baseColor_light dark:text-baseColor'}>
            {props.content}
          </div>
        ) : null}
        <Toggle flag={!!props.displayBtn}>
          <BtnGroup className={'grid-2'}>
            <LoadButton
              loading={false}
              className={'btn'}
              onClick={props.onConfirm}>
              {props.confirmText || t(`confirm`)}
            </LoadButton>
            <LoadButton
              loading={false}
              className={'btn cancel'}
              onClick={props.destoryComponent}>
              {props.cancelText || t(`cancel`)}
            </LoadButton>
          </BtnGroup>
        </Toggle>
      </MessageBoxStyle>
    </CSSTransition>
  )
}

const WrapMessageBox = withTranslation()(MessageBox)

export default function OpenMessageBox(params: IParams) {
  const className = 'message-box'
  const messageBox = document.createElement('div')
  messageBox.dataset.title = params.title
  messageBox.className = className
  messageBox.style.cssText = `position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 4000`
  //document.body.appendChild(messageBox);
  const boxs = document.getElementsByClassName(className)
  const titleList: string[] = []
  Array.from(boxs).forEach((item: any) => {
    titleList.push(item.dataset.title)
  })
  if (!titleList.includes(params.title)) {
    // document.getElementById("messageContainer")!.style.zIndex = `${zIndex.modal}`;
    //document.getElementById("messageContainer")!.appendChild(messageBox);
    document.body.appendChild(messageBox)
  } else {
    destoryComponent()
  }

  function destoryComponent() {
    if (messageBox) {
      ReactDOM.unmountComponentAtNode(messageBox)
      document.body.removeChild(messageBox)
      /*if (messageBox.parentElement?.id === "messageContainer") {
                document.getElementById("messageContainer")!.removeChild(messageBox);
            }*/
    }
  }
  ReactDOM.render(
    <Provider store={store}>
      <WrapMessageBox
        destoryComponent={destoryComponent}
        {...params}></WrapMessageBox>
    </Provider>,
    messageBox
  )
}
