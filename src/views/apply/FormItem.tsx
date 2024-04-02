import {useTranslation} from 'react-i18next'
import {HTMLProps, useEffect, useState} from 'react'
import {FormItemStyle, FormLabel, InputStyle, Suffix, WarnBox} from './Apply.style.ts'

type IFormItem = {
  value: string
  placeholder?: string
  onChange?: (value: string) => void
  required?: boolean
  label?: string
  suffix?: string
  hiddenLabel?: boolean
  hiddenWarn?: boolean
} & Omit<HTMLProps<HTMLDivElement>, 'onChange'>
export default function FormItem(props: IFormItem) {
  const {t} = useTranslation()
  const [value, setValue] = useState(props.value)
  const [showWarn, setShowWarn] = useState(false)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return <FormItemStyle style={props.style}>
    {
      props.hiddenLabel
        ? null
        : <FormLabel>{props.label}</FormLabel>
    }
    <div style={{position: 'relative'}}>
      <InputStyle
        placeholder={props.placeholder}
        value={value}
        onBlur={() => {
          if (props.required && !value) {
            setShowWarn(true)
          } else {
            setShowWarn(false)
          }
        }}
        onChange={(event) => {
          setValue(event.target.value)
          props.onChange?.(event.target.value)
          if (props.required && !event.target.value) {
            setShowWarn(true)
          } else {
            setShowWarn(false)
          }
        }} />
      {
        props.suffix ? <Suffix>{props.suffix}</Suffix> : null
      }
    </div>
    {
      props.hiddenWarn
        ? null
        : <WarnBox>{showWarn ? t(`This field is required`) : null}</WarnBox>
    }
  </FormItemStyle>
}
