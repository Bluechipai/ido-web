import {TabItemStyle, TabStyle} from './Tab.style'
import {CSSProperties} from 'react'

type IOptions<O> = {
  label: string
  value: O
}
interface IProps<T> {
  value: T
  options: IOptions<T>[]
  onChange: (value: T, selected: IOptions<T>) => void
  style?: CSSProperties
}
export default function Tab<T>(props: IProps<T>) {

  return (
    <TabStyle style={props.style}>
      {
        props.options.map((item, index) => {
          return <TabItemStyle
            key={index}
            active={props.value === item.value} onClick={() => props.onChange(item.value, item)}>
            {item.label}
          </TabItemStyle>
        })
      }
    </TabStyle>
  )
}
