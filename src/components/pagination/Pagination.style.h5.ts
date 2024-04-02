import styled from "styled-components";

export const PaginationStyle = styled.div`
    text-align: right;
    margin-top: 0.3rem;
`;

export const ArrowIcon = styled.img`
    width: 6.0.43rem;
    height: 11.0.43rem;
    cursor:pointer;
    /*padding: 0.06rem;
    background-origin: content-box;
    background-size: 100% 100%;
    background-repeat: no-repeat;*/
    &.arrowLeft{
        margin-right: 0.15rem;
    }
    &.arrowRight{
        margin-left: 0.15rem;
        transform: rotate(180deg);
    }
`;

export const PageItem = styled.span`
    display: inline-block;
    min-width: 0.28rem;
    line-height: 0.28rem;
    text-align: center;
    padding: 0 0.04rem;
    box-sizing: border-box;
    font-size: 0.12rem;
    font-weight: 400;
    cursor:pointer;
    color: #252C29;
    border-radius: 0.08rem;
    &.active{
        background: red;
        color: #252C29;
    }
    &:not(:last-child){
        margin-right: 0.04rem;
    }
`;

export const More = styled.span`
    display: inline-block;
    width: 0.28rem;
    height: 0.28rem;
    text-align: center;
    cursor:pointer;
    user-select: none;
    padding-top: 0.06rem;
    box-sizing: border-box;
    color: #fff;
`;
