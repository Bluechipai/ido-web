import styled from "styled-components";

export const MessageBoxStyle = styled.div`
    /*position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);*/
    width: 3.58rem;
    padding: 0.16rem 0.16rem 0.16rem 0.2rem;
    background: ${({theme}) => theme.colors.boxBgColor};
    box-shadow: 0 0.16rem 0.64rem ${({theme}) => theme.colors.backgroundColor};
    border-radius: 0.16rem;
    margin-top: 0.08rem;
    /*border: 0.01rem solid ${({theme}) => theme.colors.modalBorderColor};*/
    box-sizing: border-box;
    &.bottomRight{
        left: initial;
        top: initial;
        transform: none;
    }
    .title{
        font-size: 0.16rem;
        font-weight: 600;
        line-height: 130%;
        color: ${({theme}) => theme.colors.baseColor};
        word-break: break-word;
    }
    .icon{
        width: 0.2rem;
        height: 0.2rem;
        margin-right: 0.14rem;
    }
    .content{
        font-size: 0.18rem;
        font-weight: 400;
        color: ${({theme}) => theme.colors.labelColor};
        line-height: 0.2rem;
        padding-left: 0.24rem;
        margin-top: 0.08rem;
        word-break: break-word;
        max-height: 70vh;
        overflow-y: hidden;
    }
    .label{
        color: ${({theme}) => theme.colors.labelColor};
    }
`;


export const BtnGroup = styled.div`
    grid-column-gap: 0.12rem;
    margin-top: 0.2rem;
    .btn{
        font-weight: 400;
    }
    .cancel{
        background: transparent;
        border: 0.01rem solid ${({theme}) => theme.colors.borderColor};
        color: ${({theme}) => theme.colors.activeColor};
    }
`;
