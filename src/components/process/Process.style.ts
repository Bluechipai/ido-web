import styled from 'styled-components'

export const ProcessStyle = styled.div`
  position: relative;
  height: 0.08rem;
  border-radius: 0.05rem;
  overflow: hidden;
  .val {
    position: absolute;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, #7BEBFF 4.22%, #FFECA0 90.71%);
    border-radius: 0.05rem 0 0 0.05rem;
    transition: width 0.25s;
    //&:after{
    //    content: "";
    //    position: absolute;
    //    top: 50%;;
    //    right: 0;
    //    width: 0.14rem;
    //    height: 0.14rem;
    //    transform: translate(50%, -50%);
    //    border-radius: 0.8rem;
    //    background: var(--Linear, linear-gradient(97deg, #4EA869 2%, #94E0AF 113.42%));
    //    box-sizing: border-box;
    //}
  }
`
