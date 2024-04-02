import {CSSProperties} from 'react';
import {LdsRipple} from './Spin.style';

interface IProps {
    inline?: boolean
    area?:boolean,
    color?:string,
    width?:string,
    style?: CSSProperties
}
export default function Spin(props:IProps) {
    return (
        <LdsRipple bgColor={props.color}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </LdsRipple>
    )
}
