import styled from 'styled-components'


const WaitingStyle = styled.div`
    display: inline-block;
    position: relative;
    width: 0.8rem;
    height: 0.3rem;
    div {
        position: absolute;
        top: 0.1rem;
        width: 0.13rem;
        height: 0.13rem;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    div:nth-child(1) {
        left: 0.08rem;
        animation: lds-ellipsis1 0.6s infinite;
    }
    div:nth-child(2) {
        left: 0.08rem;
        animation: lds-ellipsis2 0.6s infinite;
    }
    div:nth-child(3) {
        left: 0.32rem;
        animation: lds-ellipsis2 0.6s infinite;
    }
    div:nth-child(4) {
        left: 0.56rem;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(0.24rem, 0);
        }
    }
`
export default function Waiting() {

  return (
    <WaitingStyle>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </WaitingStyle>
  )
}
