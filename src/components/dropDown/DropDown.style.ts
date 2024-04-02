import styled from 'styled-components'

export const DropDownStyle = styled.div<{color: string; disabled?: boolean}>`
  position: relative;
  height: 100%;
  box-sizing: border-box;
  &:hover {
  }
  .dropdownTrigger {
    height: 100%;
    cursor: pointer;
    &.disabled {
      cursor: default;
      opacity: 0.7;  
    }
    .label {
      // width: 100%;
      color: #c1c1c1;
    }
    .text {
      flex: 1;
      margin-right: 0.08rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .icon-box {
    transition: all 0.1s;
    svg {
      path {
        // fill: ${({color}) => color};
      }
    }
    &.active{
        transform: rotate(180deg);
    }  
  }
  &:hover {
    &.icon-box {
      @media screen and (min-width: 9rem) {
        transform: rotate(180deg);
      }
      svg {
        path {
          // fill: #fff;
        }
      }
    }
  }
  .icon {
    width: 0.16rem;
    height: 0.16rem;
    margin-left: 0.06rem;
  }
`
export const OptionContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: -0.04rem;
  transform: translate(-50%, 100%);
  z-index: 100;
  width: 100%;
  &.right {
    right: 0;
    left: unset;
    transform: translate(0, 100%);
  }
`
export const Option = styled.ul<{
  optionBgColor?: string
  optionHoverBgColor?: string
}>`
    list-style: none;
    min-width: max-content;
    width: 100%;
    padding: 0.04rem 0.24rem;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.14rem;
    font-weight: 400;
    text-align: left;
    border-radius: 0.08rem;
    box-sizing: border-box;

    .OptionItem {
        height: 0.8rem;
        display: flex;
        align-items: center;
        padding: 0.06rem 0;
        cursor: pointer;

        &:not(:last-child) {
            border-bottom: 0.01rem solid rgba(255, 255, 255, 0.2);
        }
    }
`
