import {useCallback, useRef, useEffect, useState, ReactNode, CSSProperties} from 'react';
import {SliderStyle, StepIconBox, StepItem, StepLabel} from './slider.style'
import DecimalTool from 'src/utils/DecimalTool';

export type IMarksItem = {
    value: number,
    label?: ReactNode,
    markIcon?: ReactNode
    hidden?: boolean, rowRender?(): ReactNode
};
interface ISlider {
    marks: Array<IMarksItem>,
    disabled?: boolean,
    value?:number,
    onChange(value:number):void,
    tipFormatter?(value:number): ReactNode,
    stepClassName?: string
    style?: CSSProperties
    stepItemStyle?: CSSProperties
    labelStyle?: CSSProperties
    height?: string
    size?: string
    lineActiveColor?: string
}

export default function RSlider(props:ISlider) {
    const sliderRef = useRef<HTMLDivElement>(null);
    //const [parentX, setParentX] = useState(0);
    //const [clientX, setClientX] = useState(0);
    // const [parentWidth, setParentWidth] = useState(0);
    const [percen, setPercen] = useState(props.value || 0);
    //const [value, setValue] = useState( 0);
    // const [hover, setHover] = useState( false);
    // const parentXRef = useRef(0);
    // const parentWidthRef = useRef(0);
    const disableRef = useRef(props.disabled);

    useEffect(() => {
        disableRef.current = props.disabled;
    }, [props.disabled]);

    const getStepItemPosition = useCallback((value: number) => {
        let position = 0;
        if (props.marks.length > 0) {
            const min = props.marks[0].value;
            const max = props.marks[props.marks.length - 1].value;
            position = Number(DecimalTool.div(value - min, max - min).mul(100).toFixed());
        }
        if (position < 0) {
            position = 0;
        }
        if (position > 100) {
            position = 100;
        }
        return position;
    }, [props.marks]);

    useEffect(() => {
        if (typeof props.value === 'number' && !props.disabled) {
            setPercen(getStepItemPosition(props.value));
        }
    }, [props.value, props.disabled, getStepItemPosition]);

    /*useEffect(() => {
        parentXRef.current = parentX;
    }, [parentX]);
    useEffect(() => {
        parentWidthRef.current = parentWidth;
    }, [parentWidth]);*/

    /*useEffect(() => {
        props.onChange(value);
    }, [value]);*/
    /*useEffect(() => {
        getParentParams();
        document.addEventListener("click", documentClick);
        return () => {
            //removeMouseEvent();
            document.removeEventListener("click", documentClick);
        };
    }, []);*/
    /*Drag the mouse*/
    /*function handleMouse (event:MouseEvent|React.MouseEvent<HTMLSpanElement>|TouchEvent, left?:number) {
        // @ts-ignore
        const mouseX = left || event.clientX || (event.changedTouches && event.changedTouches[0].pageX);
        //setClientX(mouseX);
        let value = (mouseX - parentXRef.current)/parentWidthRef.current*100;
        if (value >= 100) {
            value = 100;
        }else if(value <= 0) {
            value = 0;
        }
        setPercen(value);
        props.onChange(getPercenvalue(value));
    }*/
    /*Mouse down*/
    /*function handleHold(event:React.MouseEvent<HTMLSpanElement> | React.TouchEvent) {
        if (disableRef.current) {
            return;
        }
        setHover(true);
        addMouseEvent();
        getParentParams();
        event.stopPropagation();
        event.preventDefault();
    }*/
    /*function getParentParams() {
        if (!sliderRef.current) {
            return;
        }
        const paren_x = sliderRef.current.getBoundingClientRect().left;
        const paren_width = sliderRef.current.offsetWidth;
        setParentX(paren_x);
        setParentWidth(paren_width);
    }*/
    /*Click on the progress bar*/
    /*function clickProcess(event:React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        if (disableRef.current) {
            return;
        }
        setHover(true);
        getParentParams();
        const left = event.clientX;
        setTimeout(() => {
            handleMouse(event, left);
        }, 0);
    }*/
    /*Click to separate*/
    /*function clickItem(event:React.MouseEvent<HTMLSpanElement>, item:IMarksItem) {
        if (!disableRef.current) {
            setPercen(getStepItemPosition(item.value));
            props.onChange(item.value);
        }
        event.stopPropagation();
    }*/
    /*Adding event listeners*/
    /*function addMouseEvent() {
        window.addEventListener("mousemove", handleMouse);
        window.addEventListener("mouseup", removeMouseEvent);

        document.addEventListener("touchmove", handleMouse);
        document.addEventListener("touchend", removeTouchEvent);
    }*/
    /*Remove event listeners*/
    /*function removeMouseEvent(event: MouseEvent) {
        window.removeEventListener("mousemove", handleMouse);
        event.stopPropagation();
    }
    function removeTouchEvent(event: TouchEvent) {
        document.removeEventListener("touchmove", handleMouse);
        event.stopPropagation();
    }*/

    /*function documentClick() {
        setHover(false);
    }*/

    const getPercenvalue = useCallback((percer: number) => {
        const min = props.marks[0].value;
        const max = props.marks[props.marks.length - 1].value - min;
        return Number(DecimalTool.div(percer, 100).mul(max).add(min).toFixed());
    }, [props.marks]);

    const activeColor = props.lineActiveColor || '#88EE7E';

    return (
        <SliderStyle
          style={Object.assign(
            {},
          {background: `linear-gradient(90deg, ${activeColor} 0,${activeColor} ${percen}%,rgba(255, 255, 255, 0.16) ${percen}%,rgba(255, 255, 255, 0.16) 100%)`},
            props.style)}
         height={props.height}
         size={props.size}
        /*<SliderStyle style={Object.assign({}, {background: theme.colors.inputBgColor}, props.style)}*/
             showLabel={props.marks.some((item) => !!item.label)}
             ref={sliderRef}>
            {
                props.marks.map((item, index) => {
                    if (item.hidden) {
                      return null
                    }
                    return (
                        <StepItem
                              className={`${getPercenvalue(percen)>=item.value?"active":""}`}
                              key={index}
                              height={props.height}
                              size={props.size}
                              style={{left: `${getStepItemPosition(item.value)}%`, ...props.stepItemStyle}}>
                                {
                                    item.rowRender
                                  ? item.rowRender()
                                  : null
                                }
                                {item.label
                                  ? <StepLabel
                                    index={index}
                                    style={props.labelStyle}
                                    active={getPercenvalue(percen)>=item.value}
                                    isLast={index === props.marks.length - 1}>{item.label}</StepLabel>
                                  : null}
                                {
                                    item.markIcon ? <StepIconBox>{item.markIcon}</StepIconBox> : null
                                }
                        </StepItem>
                    )
                })
            }
        </SliderStyle>
    )
}
