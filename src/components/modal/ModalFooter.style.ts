import styled from 'styled-components'

export const ModalFooterStyle = styled.div`
  object-fit: contain;
`

export const ButtonGroup = styled.div`
  grid-column-gap: 0.12rem;
  margin-top: 0.4rem;
  .cancel {
    background: #d2d5d4;
    color: #fff;
    font-weight: bold;
    &:hover {
      background: #d2d5d4;
    }
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
