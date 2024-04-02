import styled from 'styled-components'

export const MessageBoxStyle = styled.div`
  /*position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);*/
  min-width: 2.6rem;
  max-width: 3.58rem;
  padding: 0.16rem;
  background: #060c0a;
  border-radius: 0.08rem;
  margin-top: 0.08rem;
  box-sizing: border-box;
  &.bottomRight {
    left: initial;
    top: initial;
    transform: none;
  }
  .title {
    font-size: 0.16rem;
    font-weight: 600;
    line-height: 0.24rem;
    word-break: break-word;
  }
  .icon {
    width: 0.2rem;
    height: 0.2rem;
    flex-shrink: 0;
    margin-right: 0.14rem;
  }
  .content {
    font-size: 0.14rem;
    font-weight: 400;
    line-height: 0.2rem;
    padding-left: 0.34rem;
    margin-top: 0.04rem;
    word-break: break-word;
    max-height: 70vh;
    overflow-y: hidden;
  }
  .label {
  }
`

export const BtnGroup = styled.div`
  grid-column-gap: 0.12rem;
  margin-top: 0.2rem;
  .btn {
    font-weight: 400;
  }
  .cancel {
    background: transparent;
    border: 0.01rem solid ${({theme}) => theme.colors.borderColor};
  }
`
