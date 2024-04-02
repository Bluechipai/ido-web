import {CSSProperties} from 'react'
import {useTranslation} from 'react-i18next'
import CopyToClipboard from 'react-copy-to-clipboard'
import {useMessage} from '../../hooks/useMessage.ts'
import SvgIcon from '../svgIocn/SvgIcon.tsx'
import {copyIcon} from '../../utils/svgManage.ts'

type IProps = {
  text: string
  callback?(): void
  style?: CSSProperties
  iconColor?: string
  fillColor?: string
}
export default function Copy(props: IProps) {
  const {t} = useTranslation()
  const {showMessage} = useMessage()

  function onCopy() {
    if (props.callback) {
      props.callback()
    } else if (props.text) {
      showMessage(t(`Copy success`))
    }
  }

  return (
    <CopyToClipboard
      text={props.text}
      onCopy={onCopy}>
      <div style={{display: 'inline-block'}}>
        <SvgIcon
          style={Object.assign({}, {cursor: 'pointer'}, props.style)}
          color={props.iconColor}
          fillColor={props.fillColor}
          dangerouslySetInnerHTML={copyIcon}
        />
      </div>
      {/*<CopyStyle style={props.style} src={require("src/assets/images/copy_2.png")}>
            </CopyStyle>*/}
    </CopyToClipboard>
  )
}
