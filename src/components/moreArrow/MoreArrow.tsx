import {MoreArrowImg, MoreArrowStyle, MoreBgImg} from './MoreArrow.style'
import moreArrowBg from 'src/assets/moreArrowBg.svg'
import moreArrow from 'src/assets/moreArrow.svg'
import {HTMLProps} from 'react'

export default function MoreArrow(props: HTMLProps<HTMLDivElement>) {

  return (
    <MoreArrowStyle {...props}>
        <MoreBgImg src={moreArrowBg} />
        <MoreArrowImg className={'arrow'} src={moreArrow} />
    </MoreArrowStyle>
  )
}
