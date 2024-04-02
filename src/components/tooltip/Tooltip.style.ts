import styled from 'styled-components'

export const TooltipStyle = styled.div`
  display: inline-block;
`

export const QuestionStyle = styled.div`
  width: 0.16rem;
  height: 0.16rem;
  padding: 0.04rem;
  background-image: url(${({theme}) =>
    theme.isDark
      ? require('src/assets/images/dark/question.png')
      : require('src/assets/images/light/question.png')});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-origin: content-box;
`

export const QuestionContent = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  padding: 0.16rem;
  border-radius: 0.12rem;
  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(1rem);
  color: #000;
  font-size: 0.16rem;
  font-weight: 400;
  line-height: 0.16rem;
  white-space: normal;
  text-align: left;
  opacity: 0;
`
