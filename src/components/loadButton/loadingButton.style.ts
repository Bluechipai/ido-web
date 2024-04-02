import styled from 'styled-components'
export const Loading = styled.div``

export const Submit = styled.button`
  min-width: max-content;
  padding: 0 0.28rem;  
  height: 0.4rem;
  border-radius: 0.4rem;
  cursor: pointer;
  background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
  font-size: 0.18rem;  
  font-weight: 600;
  color: #000;
  box-sizing: border-box;
  &:hover:not(:disabled) {
    
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
