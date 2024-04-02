import {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import * as style from './DropDown.style'
import * as styleH5 from './DropDown.style.h5'
import {useEffectState} from '../../hooks/useEffectState'
import Toggle from '../Toggle/Toggle'
import {useDomcumentOnClick} from '../../hooks/useDomcumentOnClick'
import useWidthChange from '../../hooks/useWidthChange'
import SvgIcon from '../svgIocn/SvgIcon.tsx'
import {dropdownIcon} from '../../utils/svgManage.ts'
import {getEventParentElement} from '../../utils/tools.ts'
import {useTheme} from '../../hooks/useTheme.ts'
import {FlexSb} from '../flex/Flex.tsx'

export type IDropDownOption<T> = {
  text: string
  selectText?: ReactNode
  value: T
  render?(text: ReactNode, value: T, selectText?: ReactNode): ReactNode
  originData?: any
  [key: string]: any
}
export type IDropDownFunc = {toggleOptions(show: boolean): void}
export interface IDropDownProps<T> {
  options: IDropDownOption<T>[]
  valStr?: string
  keyStr?: string
  defaultIndex?: number
  defaultValue?: T
  onChange(selectd: IDropDownOption<T>): void
  style?: CSSProperties
  menuStyle?: CSSProperties
  menuClassName?: string
  triggerStyle?: CSSProperties
  optionStyle?: CSSProperties
  optionItemStyle?: CSSProperties
  fieldStyle?: CSSProperties
  unstopPropagation?: boolean
  label?: string
  labelStyle?: CSSProperties
  icon?: ReactNode
  isH5?: boolean
  color?: string
  childRef?: MutableRefObject<IDropDownFunc | undefined>
  disabled?: boolean
  customerRender?(selectd: IDropDownOption<T>): ReactNode
  optionBgColor?: string
  optionHoverBgColor?: string
}
export default function DropDown<T>(props: IDropDownProps<T>) {
  const {isH5} = useWidthChange()
  const {isDark} = useTheme()
  const [hoverStatus, setStatus] = useState(false)
  const {DropDownStyle, Option, OptionContainer} = isH5 ? styleH5 : style
  const state = useEffectState({
    selected: null as null | IDropDownOption<T>,
    showOption: false,
    calcStyle: {} as CSSProperties,
    statusColor: '',
  })

  useEffect(() => {
    console.log(isDark)
    console.log(hoverStatus)
  }, [])

  useEffect(() => {
    if (typeof props.defaultValue !== 'undefined') {
      let selected
      props.options.some((item) => {
        if (item.value === props.defaultValue) {
          selected = item
          return true
        }
        return false
      })
      if (selected) {
        state.selected = selected
        return
      }
    }
    state.selected = props.options[props.defaultIndex ?? 0] || null
  }, [props.defaultIndex, props.defaultValue, props.options])

  /*function getDefaultSelected() {
        if (props.defaultValue) {
            let selected;
            props.options.some((item) => {
                if (item.value === props.defaultValue) {
                    selected = item;
                    return true;
                }
                return false;
            });
            if (selected) {
                console.log(selected)
                console.log("-----------")
                return selected;
            }
        }
        return props.options[props.defaultIndex ?? 0] || {};
    }*/

  useImperativeHandle(props.childRef, () => ({
    toggleOptions: (show: boolean) => {
      state.showOption = show
    },
  }))

  const nodeId = useMemo(() => Math.random().toString(), [])
  useDomcumentOnClick((event) => {
    // @ts-ignore
    if (!event.target || !getEventParentElement(event.target, nodeId)) {
      state.showOption = false
      state.calcStyle = {}
    }
  })

  useEffect(() => {
    let include = false
    props.options.some((item) => {
      if (item.value === state.selected?.value) {
        include = true
        return true
      }
      return false
    })
    if (!include) {
      state.selected = props.options[props.defaultIndex ?? 0] || null
    }
  }, [props.options, props.defaultIndex])

  useEffect(() => {
    if (state.selected) {
      props.onChange(state.selected)
    }
  }, [state.selected])

  useEffect(() => {
    state.statusColor = state.showOption ? '#fff' : ''
  }, [state.showOption])

  const currentSelected = useMemo(() => {
    if (typeof state.selected?.render === 'function') {
      return state.selected.render(
        state.selected.text,
        state.selected.value,
        state.selected.selectText
      )
    }
    return state.selected?.selectText || state.selected?.text
  }, [state.selected])

  return (
    <DropDownStyle
      id={nodeId}
      style={props.style}
      color={state.statusColor || props.color || ''}
      disabled={props.disabled}
      onClick={() => {
        /*if (!props.unstopPropagation) {
                    event.stopPropagation();
                }*/
        if (!props.disabled && props.options.length > 0) {
          state.showOption = !state.showOption
        }
      }}
      /*onMouseOver={() => {
                if (!isH5 && !props.disabled) {
                    state.showOption = true;
                    state.statusColor = theme.colors.baseColor;
                }
            }}
            onMouseLeave={() => {
               if (!isH5) {
                   state.showOption = false;
                   state.statusColor = "";
               }
            }}*/
    >
      <div
        className={`dropdownTrigger flex items-center ${
          props.disabled ? 'disabled' : ''
        }`}
        style={props.triggerStyle}>
        <Toggle flag={!!props.label}>
          <div className={'label'}>{props.label}</div>
        </Toggle>
        <FlexSb
          style={Object.assign({}, {width: '100%'}, props.fieldStyle)}
          onMouseEnter={() => setStatus(true)}
          onMouseLeave={() => setStatus(false)}>
          <div className={'text hover:text-active'}>
            {typeof props.customerRender === 'function' && state.selected
              ? props.customerRender(state.selected)
              : currentSelected}
          </div>
          <div
            className={`icon-box flex items-center justify-center ${
              state.showOption ? 'active' : ''
            }`}>
            <Toggle flag={typeof props.icon === 'undefined'}>
              {/*<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00008 10.4754L12.0067 6.46872L11.0647 5.52539L8.00008 8.59206L4.93607 5.52539L3.99341 6.46806L8.00008 10.4754Z" fill="#3E403F"/>
                            </svg>*/}
              <SvgIcon
                width={'0.24rem'}
                height={'0.24rem'}
                dangerouslySetInnerHTML={dropdownIcon}
              />
              {props.icon}
            </Toggle>
          </div>
        </FlexSb>
      </div>
      <Toggle flag={state.showOption}>
        <OptionContainer
          className={props.menuClassName}
          style={Object.assign({}, state.calcStyle, props.menuStyle)}>
          <Option
            style={Object.assign(
              {background: 'rgba(6, 6, 6, 1)'},
              props.optionStyle
            )}
            optionBgColor={props.optionBgColor}
            optionHoverBgColor={props.optionHoverBgColor}>
            {props.options.map((item, index) => {
              return (
                <li
                  className={`OptionItem text-baseColor_light dark:text-baseColor ${
                    state.selected && item.value === state.selected.value
                      ? 'active'
                      : ''
                  }`}
                  key={index}
                  style={props.optionItemStyle}
                  onClick={(event) => {
                    event.stopPropagation()
                    // if (isH5) {
                    //     event.stopPropagation();
                    // }
                    state.selected = item
                    state.statusColor = ''
                    state.showOption = false
                  }}>
                  {typeof item.render === 'function'
                    ? item.render(item.text, item.value, item.selectText)
                    : item.text}
                </li>
              )
            })}
          </Option>
        </OptionContainer>
      </Toggle>
    </DropDownStyle>
  )
}
