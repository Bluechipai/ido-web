import Input, {IdefalutProps} from '../form/Input'
import {NUMBER_REG} from '../../utils/regExp.ts'
import {isUserNumber} from '../../utils/tools.ts'

interface IProps extends IdefalutProps {
  decimal?: number
  regStr?: string
}
export default function InputNumber(props: IProps) {
  const {simpleBorder, inputStyle, hideTips, ...rest} = props
  return (
    <Input
      label={props.label}
      right={props.right}
      inputStyle={props.inputStyle}
      {...rest}
      /*placeholder={state.placeholder}*/
      type={props.type || 'number'}
      hideTips={true}
      regex={[{regStr: props.regStr || NUMBER_REG, tips: ''}]}
      /*onFocus={() => state.placeholder = ""}
               onBlur={(event) => {
                   state.placeholder = props.placeholder || "";
                   props.onBlur && props.onBlur(event);
               }}*/
      onWheel={(event) => event.currentTarget.blur()}
      onChange={(value) => {
        if (
          props.onChange &&
          (value === '' || isUserNumber(props.regStr || NUMBER_REG, value))
        ) {
          //state.price = value;
          props.onChange(value)
        }
      }}
    />
  )
}
