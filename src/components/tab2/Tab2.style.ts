import styled from 'styled-components'

type Itab = {len: number; isH5: boolean}
export const Tab2Style = styled.div<Itab>`
  display: grid;
  grid-template-columns: repeat(${(props: Itab) => props.len}, 1fr);
  border-radius: 0.12rem;
  .button {
    height: 0.48rem;
    font-size: ${({isH5}) => (isH5 ? '0.14rem' : '0.18rem')};
    font-weight: 400;
    background: transparent;
    border-radius: 0.12rem;
    padding: ${({isH5}) => (isH5 ? '0.1rem' : '0')};
    white-space: nowrap;
    &.active {
      background: #5dd796;
    }
  }
`
