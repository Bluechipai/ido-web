import {useTranslation} from 'react-i18next'
import {
  FormContainer,
  FormGird,
  ImageDesc,
  ImageGroup,
  ImageLabel,
  SubmitBox
} from './Apply.style.ts'
import FormItem from './FormItem.tsx'
import {useEffectState} from '../../hooks/useEffectState.ts'
import {HTMLProps, MutableRefObject, useImperativeHandle, useMemo} from 'react'
import UploadFile from '../../components/upload/UploadFile.tsx'
import {useMessage} from '../../hooks/useMessage.ts'
import {ChildImperativeHandle} from './Apply.tsx'
import LinerButton from '../../components/linerButton/LinerButton.tsx'


export type IStep1State = {
  projName: string,
  quantity: string,
  tokenSymbol: string,
  tokenPrice: string,
  network: string,
  marketTime: string,
  projType: string,
  logoUrl: string
}
export const Step1Default: IStep1State = {
  projName: '',
  quantity: '',
  tokenSymbol: '',
  tokenPrice: '',
  network: '',
  marketTime: '',
  projType: '',
  logoUrl: ''
}

type IRegExp = {
  pattern: RegExp
  message: string
}
type IRule = {
  field: keyof IStep1State,
  required?: boolean,
  message?: string
  regExpArr?: IRegExp[]
}

type IProps = {
  onConfirm(formData: IStep1State): void
  childrenRef?: MutableRefObject<ChildImperativeHandle | undefined>
} & HTMLProps<HTMLDivElement>
export default function Step1(props: IProps) {
  const {t, i18n} = useTranslation()
  const {showMessage} = useMessage();
  const state: IStep1State = useEffectState({...Step1Default})

  useImperativeHandle(props.childrenRef, () => {
    return {
      reset: () => {
        resetData()
      }
    }
  })

  function resetData() {
    (Object.keys(Step1Default) as Array<keyof IStep1State>).forEach((key) => {
      state[key] = Step1Default[key]
    })
  }

  const rules: IRule[] = useMemo(() => {
    return [
      {
        field: 'projName',
        required: true,
        message: t('Please enter the project name')
      },
      {
        field: 'quantity',
        required: true,
        message: t('Please enter the number of tokens'),
        regExpArr: [
          {
            pattern: new RegExp(/^-?[0-9]+(\.[0-9]+)?$/),
            message: t('Amount of funds raised must be a number'),
          }
        ]
      },
      {
        field: 'tokenSymbol',
        required: true,
        message: t('Please enter Subscription currency')
      },
      {
        field: 'tokenPrice',
        required: true,
        message: t('Please enter Token price')
      },
      {
        field: 'network',
        required: true,
        message: t('Please enter Network')
      },
      {
        field: 'marketTime',
        required: true,
        message: t('Please enter Time to market')
      },
      {
        field: 'projType',
        required: true,
        message: t('Please enter Type')
      },
      {
        field: 'logoUrl',
        required: true,
        message: t('Please select logo')
      }
    ]
  }, [i18n.language])

  function validateParams() {
    let validate = true;
    let msg = '';
    rules.some((item) => {
      const validError = item.regExpArr?.some((regItem) => {
        if (!regItem.pattern.test(state[item.field])) {
          msg = regItem.message
          return true;
        } else {
          return false;
        }
      })
      if (validError) {
        validate = false;
        return true;
      }
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
  }

  return (
    <FormContainer style={props.style}>
      <FormGird>
        <FormItem
          placeholder={t(`Project name *`)}
          value={state.projName}
          required={true}
          onChange={(value) => {
            state.projName = value
          }} />
        {/*<FormItem
          placeholder={t(`Fund raising currency *`)}
          value={''}
          required={true}
          onChange={(value) => {

          }} />*/}
        <FormItem
          placeholder={t(`Amount of funds raised *`)}
          value={state.quantity}
          required={true}
          onChange={(value) => {
            state.quantity = value
          }} />
        <FormItem
          placeholder={t(`Subscription currency *`)}
          required={true}
          value={state.tokenSymbol}
          onChange={(value) => {
            state.tokenSymbol = value
          }} />
        <FormItem
          label={t(`Token price *`)}
          suffix={'USDT'}
          placeholder={t(`Price`)}
          required={true}
          value={state.tokenPrice}
          onChange={(value) => {
            state.tokenPrice = value
          }} />
        <FormItem
          placeholder={t(`Network (zkSync, Arbitrum...) *`)}
          required={true}
          value={state.network}
          onChange={(value) => {
            state.network = value
          }} />
        <FormItem
          placeholder={t(`Time to market *`)}
          required={true}
          value={state.marketTime}
          onChange={(value) => {
            state.marketTime = value
          }} />
        <FormItem
          placeholder={t(`Type *`)}
          required={true}
          value={state.projType}
          onChange={(value) => {
            state.projType = value
          }} />
      </FormGird>
      <FormGird>
        <ImageGroup>
          <ImageLabel>
            <span>{t(`Project logo`)}</span>
            <span style={{marginLeft: '0.06rem', color: 'rgba(0,0,0,0.57)'}}>*</span>
          </ImageLabel>
          <UploadFile
            fileURL={state.logoUrl}
            hideRemove={true}
            onUpload={(fileURL) => {
              state.logoUrl = fileURL
            }} />
          <ImageDesc
            style={{width: '4.84rem'}}>{t(`No more than 1 file should be uploaded. It is recommended to upload files of 640*400 and no more than 2Mb in size. PNG, JPG, and JPEG formats are supported.`)}</ImageDesc>
        </ImageGroup>
      </FormGird>
      <SubmitBox style={{gridColumn: 'span 2', marginTop: '0.56rem'}}>
        <LinerButton
          width={187}
          height={52}
          radius={50}
          percent={0.5}
          style={{marginLeft: '0.16rem', color: "#000"}}
          onClick={validateParams}>{t(`Next Step`)}</LinerButton>
      </SubmitBox>
    </FormContainer>
  )
}
