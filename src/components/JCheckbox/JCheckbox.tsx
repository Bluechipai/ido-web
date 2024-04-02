import {ReactNode, useState} from 'react'
import checkedIcon from 'src/assets/img/checked.png';
import uncheckedIcon from 'src/assets/img/unchecked.png';
import {FlexRow} from '../flex/Flex.tsx'

type IProps = {
  children?: ReactNode
  onChange?: (checked: boolean) => void
}
export default function JCheckbox(props: IProps) {
  const [checked, setChecked] = useState(false)

  return (
    <FlexRow
      style={{cursor: 'pointer'}}
      onClick={() => {
        setChecked(!checked)
        props.onChange?.(!checked)
      }}>
      <img src={checked ? checkedIcon : uncheckedIcon} style={{width: '0.2rem', height: '0.2rem', marginRight: '0.12rem'}} alt={''} />
      {props.children}
    </FlexRow>
  )
}
