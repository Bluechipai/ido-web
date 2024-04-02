import styled from 'styled-components'

export const PaginationStyle = styled.div`
    text-align: right;
    margin-top: 0.3rem;
    @media screen and (max-width: 9rem) {
        margin-top: 0.16rem;
    }
`

export const ArrowIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0.66rem;
    height: 0.44rem;
    border-radius: 0.04rem;
    background: rgba(115, 171, 255, 0.20);
    backdrop-filter: blur(0.4rem);
    cursor: pointer;
    font-size: 0.16rem;
    color: #fff;
    /*padding: 0.06rem;
      background-origin: content-box;
      background-size: 100% 100%;
      background-repeat: no-repeat;*/

    &.arrowLeft {
        margin-right: 0.08rem;
    }

    &.arrowRight {
        // margin-left: 0.08rem;
        // transform: rotate(180deg);
    }
`

export const PageItem = styled.span`
    display: inline-block;
    min-width: 0.4rem;
    line-height: 0.44rem;
    text-align: center;
    padding: 0 0.04rem;
    box-sizing: border-box;
    font-size: 0.16rem;
    font-weight: 400;
    cursor: pointer;
    border-radius: 0.04rem;
    // border: 0.01rem solid transparent;
    background: rgba(0, 0, 0, 0.30);
    color: rgba(255,255,255,0.5);
    &.active {
        // border: 0.01rem solid #5dd796;
        background: #fff;
        color: #000;
    }

    margin-right: 0.08rem;
    //&:not(:last-child) {
    //  margin-right: 0.04rem;
    //}
`

export const More = styled.span`
  display: inline-block;
  width: 0.28rem;
  height: 0.28rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  padding-top: 0.06rem;
  box-sizing: border-box;
`

export const PageSizeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.3rem;
  border-radius: 0.04rem;
`
