import React, {CSSProperties, ReactNode} from 'react';
import { Submit, Loading } from './loadingButton.style';
import {usePluginModel} from "../../hooks/usePluginModel";

interface IProps {
    loading:boolean,
    text?:string,
    loadingText?:string,
    children?:ReactNode,
    onClick?(event?:React.MouseEvent<HTMLButtonElement>):void,
    style?:CSSProperties,
    className?: string
    disabledValid?: boolean
}
export default function LoadButton(props: IProps) {
    const {Provider} = usePluginModel();

    async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        /*const [isValid] = props.disabledValid ? [true] : await awaitWrap(validToken());
        if (!isValid) {
            event.preventDefault();
        } else if(props.onClick) {
            props.onClick(event);
        }*/
        console.log(Provider)
        props.onClick?.(event);
    }

    return (
        <Submit className={`flex-box ${props.loading?'loading':''} ${props.className || ''}`} style={props.style}
                disabled={props.loading}
                onClick={onSubmit}>
            {/*{
                props.loading?<Loading inline={true} width={"10"} color={"#fff"}></Loading>:null
            }*/}
            <Loading>{(props.loading && typeof props.loadingText !== 'undefined')?props.loadingText:props.text}</Loading>
            { !props.text ? props.children : null }
        </Submit>
    )
}
