import { Link } from 'react-router-dom'
import { CSSProperties } from 'react'
import logo_dark from 'src/assets/img/logo.svg';

type IProps = {
  imgStyle?: CSSProperties
  fontStyle?: CSSProperties
}
export default function Logo(props: IProps) {
  return (
    <Link
      to={'/'}
      className={'flex items-center'}>
      <img
        src={logo_dark}
        style={props.imgStyle}
        className={'w-[1.32rem] md:w-[0.24rem]'}
        alt=""
      />
      {/*<div*/}
      {/*  style={props.fontStyle}*/}
      {/*  className={*/}
      {/*    'text-important_light dark:text-important ml-[0.16rem] text-[0.22rem] font-bold'*/}
      {/*  }>*/}
      {/*  BlueChip AI*/}
      {/*</div>*/}
    </Link>
  )
}
