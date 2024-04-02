import styled from 'styled-components'

export const AgreementModalStyle = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-gap: 0.28rem;
    height: 65vh;
    padding: 0 0.64rem;
    overflow-y: auto;
    font-size: 0.16rem;
    font-weight: 500;
    line-height: 0.24rem;
    color: #000;
    &::-webkit-scrollbar-thumb {
        border-radius: 0.04rem;
        background-color: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar {
        width: 0.06rem;
        height: 0.06rem;
    }
`;
