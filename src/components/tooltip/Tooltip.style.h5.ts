import styled from 'styled-components'

export const TooltipStyle = styled.div`
  display: inline-block;
`

export const QuestionStyle = styled.div`
  width: 0.16rem;
  height: 0.16rem;
  padding: 0.02rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-origin: content-box;
`

export const QuestionContent = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  padding: 0.08rem 0.16rem;
  border-radius: 0.16rem;
  //background: #3A4B45;
  //color: #fff;
  opacity: 0;
`
