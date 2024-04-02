import styled from 'styled-components'

export const ModalBox = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  top: 0;
  bottom: 0;
  z-index: 5000;
  background: rgb(13, 13, 13, 0.4);
  backdrop-filter: blur(0.02rem);
  white-space: normal;
  .modal_content_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    padding: 0.16rem 0 0.32rem;
    box-sizing: border-box;
    border-radius: 0.1rem;
    .close {
      /*position: absolute;
            right: 0;
            top: 0;
            padding: 0.15rem;*/
      .closeIcon {
        width: 0.16rem;
        height: 0.16rem;
        cursor: pointer;
        vertical-align: initial;
      }
    }
    .modal_content {
      max-height: 70vh;
      overflow: auto;
      padding: 0 0.2rem;
    }
  }
  .modal-title {
    font-size: 0.18rem;
    font-weight: 400;
    line-height: 0.22rem;
    text-align: center;
    padding: 0 0.32rem;
  }
`

export const Border = styled.div`
  width: 0.9rem;
  height: 0.04rem;
  border-radius: 0.24rem;
  margin: 0 auto 0.12rem;
`
