import styled from 'styled-components'

export const ModalBox = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  top: 0;
  height: 100vh;
  z-index: 5000;
  background: rgb(13, 13, 13, 0.4);
  white-space: normal;
  .modal_content_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 6.08rem;
    padding: 0.56rem 0.52rem;
    box-sizing: border-box;
    border-radius: 0.1rem;
    .close {
      position: absolute;
      right: 0.32rem;
      top: 0.32rem;
      padding: 0.08rem;
      cursor: pointer;  
      .closeIcon {
        width: 0.32rem;
        height: 0.32rem;
        cursor: pointer;
        vertical-align: initial;
      }
    }
  }
  .modal-title {
    font-size: 0.28rem;
    font-weight: 700;
    text-align: left;
    line-height: 0.3rem;
  }
`
