import styled from 'styled-components'

export const DropDownStyle = styled.div<{color: string; disabled?: boolean}>`
  position: relative;
  height: 100%;
  box-sizing: border-box;
  .dropdownTrigger {
    height: 100%;
    line-height: 0.16rem;
    cursor: pointer;
    .label {
      width: 100%;
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
        fill: ${({color}) => color};
      }
    }
    &.active {
      color: #fff;
      @media screen and (max-width: 9rem) {
        transform: rotate(180deg);
      }
      svg {
        path {
          fill: #fff;
        }
      }
    }
  }
  &:hover {
    &.icon-box {
      @media screen and (min-width: 9rem) {
        transform: rotate(180deg);
      }
      svg {
        path {
          fill: #fff;
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
  bottom: 0;
  transform: translate(-50%, 100%);
  z-index: 100;
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
  border-radius: 0.04rem;
  padding: 0.06rem 0;
  white-space: nowrap;
  background: #252c29;
  text-align: left;
  /*visibility: hidden;*/
  .OptionItem {
    font-size: 0.14rem;
    font-weight: 400;
    line-height: 0.18rem;
    padding: 0.06rem 0.12rem;
    margin: 0 0.08rem;
    cursor: pointer;
    border-bottom: none !important;
    border-radius: 0.04rem;
    &.active {
    }
    &:hover {
      color: #5dd796;
    }
    &:not(:last-child) {
    }
  }
`
