import {useTranslation} from 'react-i18next'
import {
  FormContainer,
  FormGird,
  GroupLabel,
  SubmitBox,
  SubmitBtn
} from './Apply.style.ts'
import FormItem from './FormItem.tsx'
import {HTMLProps, MutableRefObject, useImperativeHandle, useMemo} from 'react'
import {useEffectState} from '../../hooks/useEffectState.ts'
import {ChildImperativeHandle} from './Apply.tsx'
import {useMessage} from '../../hooks/useMessage.ts'
import LinerButton from '../../components/linerButton/LinerButton.tsx'

export type IStep3State = {
  applyName: string
  contactWay: string
}
export const Step3Default = {
  applyName: '',
  contactWay: ''
}

type IRule = {
  field: keyof IStep3State,
  required?: boolean,
  message?: string
}

type IProps = {
  onCancel(): void
  onConfirm(formData: IStep3State): void
  childrenRef?: MutableRefObject<ChildImperativeHandle | undefined>
} & HTMLProps<HTMLDivElement>
export default function Step3(props: IProps) {
  const {t, i18n} = useTranslation()
  const {showMessage} = useMessage();
  const state: IStep3State = useEffectState({...Step3Default})

  useImperativeHandle(props.childrenRef, () => {
    return {
      reset: () => {
        resetData()
      }
    }
  })

  const rules: IRule[] = useMemo(() => {
    return [
      {
        field: 'applyName',
        required: true,
        message: t('Please enter the name')
      },
      {
        field: 'contactWay',
        required: true,
        message: t('Please enter Email')
      }
    ]
  }, [i18n.language])

  function resetData() {
    (Object.keys(Step3Default) as Array<keyof IStep3State>).forEach((key) => {
      state[key] = Step3Default[key]
    })
  }

  return (
    <FormContainer style={props.style}>
      <FormGird>
        <div style={{marginBottom: '0.48rem'}}>
          <GroupLabel>{t(`Contact information`)}</GroupLabel>
          <FormItem
            placeholder={t(`Name *`)}
            value={state.applyName}
            required={true}
            onChange={(value) => {
              state.applyName = value
            }} />
          <FormItem
            placeholder={t(`Business Email *`)}
            value={state.contactWay}
            required={true}
            onChange={(value) => {
              state.contactWay = value
            }} />
        </div>
      </FormGird>
      <FormGird>

      </FormGird>
      <SubmitBox style={{gridColumn: 'span 2', marginTop: '1.76rem'}}>
        <SubmitBtn isGray={true} onClick={props.onCancel}>{t(`Cancel`)}</SubmitBtn>
        <LinerButton
          width={187}
          height={52}
          radius={50}
          percent={0.5}
          style={{marginLeft: '0.16rem', color: '#000'}}
          onClick={() => {
            let validate = true;
            let msg = '';
            rules.some((item) => {
              if (item.required && !state[item.field]) {
                validate = false;
                msg = item.message || t('Please enter the required field')
                return true
              }
              return false
            })
            if (validate) {
              props.onConfirm(state)
            } else {
              showMessage(msg)
            }
          }}>{t(`Submit`)}</LinerButton>
      </SubmitBox>
    </FormContainer>
  )
}
