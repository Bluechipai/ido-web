import styled, {css} from 'styled-components'

const $height = 'calc(0.5rem - 0.02rem)'
export const InputBox = styled.div<{isH5?: boolean, placeholderColor?: string}>`
  position: relative;
  display: flex;
  align-items: center;
  //padding: 0 0.08rem 0 0.12rem;
  padding: 0 0.12rem;
  font-size: ${({isH5}) => (isH5 ? '0.14rem' : '0.16rem')};
  height: ${$height};
  border-radius: 0.08rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.10);
  background: rgba(255, 255, 255, 0.50);
  transition:
    width,
    flex 0.25s;
  box-sizing: border-box;
  .label {
    display: inline-block;
    color: #fff;
    text-align: left;
    white-space: nowrap;
    margin-right: 0.04rem;
  }
  .input {
    width: 100%;
    background-color: transparent;
    font-size: ${({isH5}) => (isH5 ? '0.14rem' : '0.16rem')};
    height: 100%;
    text-align: left;
    outline: none;
    font-family: Inter;
    /*padding-right: 0.04rem;*/
    box-sizing: border-box;
    //font-family: NHaas, Helvetica, Montserrat-Regular, PingFang SC, Microsoft YaHei, SourceHanSerifCN-Medium, robotoregular, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, Helvetica, Arial, monospace, serif;
    &::-webkit-input-placeholder {
        ${({placeholderColor}) => {
            return placeholderColor 
                    ? css`
                        color: ${placeholderColor}
                      ` 
                    :null
        }}
    }

    &::-moz-input-placeholder {
        ${({placeholderColor}) => {
            return placeholderColor 
                    ? css`
                        color: ${placeholderColor}
                      ` 
                    :null
        }}
    }
    &::-ms-input-placeholder {
        ${({placeholderColor}) => {
            return placeholderColor 
                    ? css`
                        color: ${placeholderColor}
                      ` 
                    :null
        }}
    }
    &:hover:not(:disabled) {
      //&::-webkit-input-placeholder {
      //    color: red;
      //}
      //&::-moz-input-placeholder {
      //    color: red;
      //}
      //&::-ms-input-placeholder {
      //    color: red;
      //}
    }
  }
  .inputWarn {
    display: inline-block;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: red;
    padding: 0.04rem 0.06rem;
    border-radius: 0.04rem;
    bottom: ${$height};
    font-size: 0.16rem;
    font-weight: normal;
    white-space: nowrap;
    pointer-events: none;
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0.1rem;
      bottom: -0.06rem;
      border-left: 0.06rem solid transparent;
      border-top: 0.06rem solid rgba(0, 0, 0, 0.5);
      border-right: 0.06rem solid transparent;
    }
  }
`
