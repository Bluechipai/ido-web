import {CSSProperties, useEffect, useMemo} from 'react'
import {Tab2Style} from './Tab2.style'
import {useEffectState} from '../../hooks/useEffectState'

type IOption<T> = {text: string; value: T; className?: string}
type IProps<T = number> = {
  options: IOption<T>[]
  onChange(value: T, selected: IOption<T>): void
  value: T
  unUseDefault?: boolean
  style?: CSSProperties
  isH5: boolean
}
export default function Tab2<T = number>(props: IProps<T>) {
  const state = useEffectState({
    active: getActiveIndex(props.value),
  })

  function getActiveIndex(value: T | undefined) {
    let selectIndex = -1
    props.options.some((item, index) => {
      if (item.value === value) {
        selectIndex = index
        return true
      }
      return false
    })
    return selectIndex
  }

  useEffect(() => {
    state.active = getActiveIndex(props.value)
  }, [props.value])

  const selected = useMemo(() => {
    return props.options[state.active]
  }, [state.active])
  useEffect(() => {
    props.onChange(selected && selected.value, selected)
  }, [selected])

  return (
    <Tab2Style
      className={'borderRadius bg-tab_light dark:bg-tab'}
      isH5={props.isH5}
      len={props.options.length}
      style={props.style}>
      {props.options.map((item, index) => {
        return (
          <button
            className={`button text-tab dark:text-baseColor ${
              selected && selected.value === item.value
                ? 'active dark:text-button'
                : ''
            } ${item.className}`}
            key={index}
            onClick={() => {
              state.active = index
            }}>
            {item.text}
          </button>
        )
      })}
    </Tab2Style>
  )
}
