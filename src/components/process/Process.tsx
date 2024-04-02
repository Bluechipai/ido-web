import {ProcessStyle} from './Process.style'

type IProps = {
  percent: number
}
export default function Process(props: IProps) {
  return (
    <ProcessStyle style={{background: 'rgba(0,0,0,1)'}}>
      <div
        className={'val'}
        style={{width: `${props.percent}%`}}></div>
    </ProcessStyle>
  )
}
