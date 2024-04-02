import styled from "styled-components";

export const SliderStyle = styled.div<{showLabel?: boolean, height?: string, size?: string}>`
    position: relative;
    height: ${({height}) => height || "0.04rem"};
    background:  linear-gradient(90deg, ${({theme}) => theme.isDark ? "#DFE1E0" : "#83998D"} 0,${({theme}) => theme.isDark ? "#DFE1E0" : "#83998D"} 0.55rem,${({theme}) => theme.isDark ? "#DFE1E0" : "#2F3532"} 0.55rem,${({theme}) => theme.isDark ? "#DFE1E0" : "#2F3532"} 1.1rem);
    //background:  red;
    margin: 0 0.04rem;
    margin-bottom: ${({showLabel}) => showLabel ? "0.18rem" : "0"};
    .step{
        display: inline-block;
        width: ${({size}) => size || "0.1rem"};
        height: ${({size}) => size || "0.1rem"};
        border-radius: 50%;
        background-color: ${({theme}) => theme.isDark ? "#2F3532" : "#DFE1E0"};
        border: 0.01rem solid ${({theme}) => theme.isDark ? "#DFE1E0" : "#83998D"};
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        cursor: pointer;
        box-sizing: border-box;
        z-index: 20;
        &.disabled{
            filter: grayscale(1);
            cursor: not-allowed;
        }
        &.hover{
            // box-shadow: 0 0 0 0.05rem rgb(66,72,94,0.7);
        }
        .tip{
            display: inline-block;
            position: absolute;
            left: 50%;
            bottom: ${({showLabel}) => showLabel ? "-0.28rem" : "-0.08rem"};
            transform: translate(-50%, 100%);
            color: #fff;
            &:after{
                content: "";
                display: inline-block;
                position: absolute;
                bottom: -0.04rem;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
`;

type ISlider = {
    borderColor?: string
    height?: string
    size?: string
}
export const StepItem = styled.div<ISlider>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({size}) => size || "0.24rem"};
    height: ${({size}) => size || "0.24rem"};
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: ${({theme}) => theme.isDark ? "#2F3532" : "#DFE1E0"};
    border-radius: 50%;
    border: 0.06rem solid rgba(255,255,255,0.48);
    background-clip: content-box;
    backdrop-filter: blur(0.02rem);
    &.active{
        background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
        background-clip: content-box;
    }
    /*&:before{
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 0.24rem;
        height: 0.24rem;
        background: rgba(255,255,255,0.48);
        border-radius: 50%;
        backdrop-filter: blur(0.5rem);
        z-index: -1;
    }*/
`;

export const StepLabel = styled.div<{index: number, isLast: boolean, active?: boolean}>`
    position: absolute;
    left: 50%;
    bottom: -0.16rem;
    transform: translate(-0.12rem, calc(100% + 0.02rem));
    font-size: 0.12rem;
    font-weight: 400;
    line-height: 0.16rem;
    opacity: ${({active}) => active ? 1 : 0.48};
    &:first-child{

    }
`;
export const StepIconBox = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-0.12rem, calc(-100% - 0.2rem));
`;
export const SliderTipStyle = styled.div`
    white-space: nowrap;
    line-height: 0.16rem;
    padding: 0.12rem;
    border-radius: 0.08rem;
    background-color: ${({theme}) => theme.isDark ? "#2F3532" : "#FFFFFF"};
    box-shadow: 0rem 0.04rem 0.04rem rgba(0, 0, 0, 0.25);
    color: ${({theme}) => theme.isDark ? "#A6ACA9" : "#57625C"}
`;
