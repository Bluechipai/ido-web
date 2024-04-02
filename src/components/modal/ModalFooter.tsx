import {CSSProperties} from 'react'
import {useTranslation} from 'react-i18next'
import {ButtonGroup, ModalFooterStyle} from './ModalFooter.style'
import LoadButton from '../loadButton/LoadButton'
import LinerButton from '../linerButton/LinerButton.tsx'

type IProps = {
  onCancel?(): void
  onConfirm?(): void
  loading?: boolean
  style?: CSSProperties
  cancelText?: string
  confirmText?: string
}
export default function ModalFooter(props: IProps) {
  const {t} = useTranslation()

  return (
    <ModalFooterStyle style={props.style}>
      <ButtonGroup className={'grid grid-cols-2 text-[0.16rem]'}>
        <LoadButton
          className={'cancel'}
          style={{height: '0.52rem'}}
          disabledValid={false}
          loading={false}
          onClick={props.onCancel}>
          {props.cancelText || t(`Cancel`)}
        </LoadButton>
        <LinerButton
          width={246}
          height={52}
          radius={40}
          disabled={!!props.loading}
          onClick={props.onConfirm}>
          {props.confirmText || t(`Confirm`)}
        </LinerButton>
      </ButtonGroup>
    </ModalFooterStyle>
  )
}
