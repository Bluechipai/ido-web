import { useTranslation } from 'react-i18next'
import { useTheme } from '../../hooks/useTheme.ts'
import {CSSProperties, HTMLProps, ReactNode, useMemo, useState} from 'react'
import { Link } from 'react-router-dom'
import useWidthChange from '../../hooks/useWidthChange.ts'
import { FlexRow, FlexSb } from '../flex/Flex.tsx'
import SvgIcon from '../svgIocn/SvgIcon.tsx'
import { ExpandIcon } from '../../utils/svgManage.ts'
import Toggle from '../Toggle/Toggle.tsx'
import { useCommunityIcon } from '../../hooks/useCommunityIcon.ts'
import Involved from './Involved.tsx'
import {content_width, LinerText} from '../../global.style.ts'


import email_liner from 'src/assets/img/email_liner.png';
import footer_logo from 'src/assets/img/footer_logo.png';

type IMenuChild = {
  text: string
  path?: string
  href?: string
  target?: string
}
type IMenu = {
  label: string
  child: IMenuChild[]
  bottomContent?: ReactNode
}
interface IProps extends HTMLProps<HTMLDivElement>{

}
export default function Footer(props: IProps) {
  const { t, i18n } = useTranslation()
  const { isDark } = useTheme()
  const { isH5 } = useWidthChange()

  const menus: IMenu[] = useMemo(() => {
    return [
      {
        label: t(`Company`),
        child: [
          { text: t(`About us`), href: '' },
          { text: t(`FAQs`), href: '#FAQ', target: '_self' },
          { text: t(`Press kit`), path: '/media' },
        ]
      },
      {
        label: t(`Product`),
        child: [
          { text: t(`$CHIP DeAllo`), path: '/launchpad/index' },
          { text: t(`Submit Project`), path: '/apply/index' },
          { text: t(`Staking`), path: '/staking' },
        ]
      },
      {
        label: t(`Help`),
        child: [
          { text: t(`Terms & Conditions`), path: '/doc/service' },
          { text: t(`Privacy Policy`), path: '/doc/privacy' },
          { text: t(`Docs`), href: 'https://docs.bluechipai.co/bluechipai' },
        ],
      },
    ]
  }, [i18n.language])

  return (
    <div
      style={{
        marginTop: '-1.28rem',
        ...props.style
      }}
      className={
        'md:h-auto md:border-t-0 md:border-[#262C27] md:px-0 md:pb-[0.4rem]'
      }>
      <Involved />
      <div style={{background: 'rgba(0, 0, 0, 1)'}}>
        <FlexSb
          style={{width: content_width}}
          className={
            'mx-auto py-[0.56rem] md:mx-[0.15rem] md:w-auto md:flex-col md:pt-[0.4rem]'
          }>
          <div className={`min-w-[6.2rem] md:min-w-full`}>
            <img src={footer_logo} style={{width: '1.76rem', height: '0.32rem'}} alt="" />
            <div
              className={
                'w-[2.88rem] mt-[0.6rem] text-[0.14rem] font-light text-[rgba(255,255,255,0.6)] md:mt-[0.12rem] md:text-[0.16rem]'
              }>
            <span>
              {t(
                `The fully decentralized protocol for early stage AI launching`
              )}
            </span>
            </div>
            <div
              className={
                'mt-[0.32rem] text-[0.2rem] font-light text-subtitle_light dark:text-subtitle md:mt-[0.12rem] md:text-[0.16rem]'
              }>
              <FlexRow className={'child-n-l:mr-[0.5rem] md:mb-[0.2rem]'}>
                <CommunityIcon
                  name={'github'}
                  url={'https://github.com/Bluechipai'}
                />
                <CommunityIcon
                  name={'telegram'}
                  url={'https://t.me/BluechipAI2023'}
                />
                <CommunityIcon
                  name={'twitter'}
                  url={'https://twitter.com/Bluechip_AI'}
                />
              </FlexRow>
            </div>
          </div>
          <div>
            <div
              className={
                'flex child-n-l:mr-[0.92rem] md:mt-[0.4rem] md:flex-col md:child-n-l:mb-[0.32rem] md:child-n-l:mr-0'
              }>
              {menus.map((item, index) => {
                return (
                  <MenuItem
                    isDark={isDark}
                    isH5={isH5}
                    menuInfo={item}
                    key={index}
                  />
                )
              })}
            </div>
            <FlexRow style={{marginTop: '0.44rem'}}>
              <FlexRow>
                <img src={email_liner} style={{width: '0.2rem', height: '0.2rem', marginRight: '0.08rem'}} alt="" />
                <LinerText>{t(`info@bluechipai.co`)}</LinerText>
              </FlexRow>
              <div style={{color: 'rgba(255,255,255,0.6)', marginLeft: '1rem'}}>{t(`© Copyright 2024}. All Rights Reserved.`)}</div>
            </FlexRow>
          </div>
        </FlexSb>
      </div>
    </div>
  )
}

type IMenuItemProps = {
  menuInfo: IMenu
  isH5: boolean
  isDark: boolean
}

function MenuItem(props: IMenuItemProps) {
  const [expandStatus, setExpandStatus] = useState(true)

  return (
    <div style={{minWidth: '1.68rem'}}>
      <FlexSb
        style={expandStatus ? {} : { marginBottom: 0 }}
        className={
          'mb-[0.16rem] text-[0.16rem] font-bold text-important_light dark:text-important md:mb-[0.32rem] md:text-[0.18rem]'
        }>
        <span>{props.menuInfo.label}</span>
        <Toggle flag={props.isH5}>
          <div
            onClick={() => setExpandStatus(!expandStatus)}
            style={{
              transform: expandStatus ? 'rotate(0deg)' : 'rotate(180deg)',
            }}>
            <SvgIcon
              dangerouslySetInnerHTML={ExpandIcon}
              fillColor={props.isDark ? '#fff' : '#666'}
            />
          </div>
        </Toggle>
      </FlexSb>
      <div
        className={'flex flex-col child-n-l:mb-[0.12rem] md:child-n-l:mb-[0.32rem]'}>
        {expandStatus
          ? props.menuInfo.child.map((item, index) => {
            return (
              <div
                key={index}
                className={'flex flex-col child-n-l:mb-[0.4rem]'}>
                {item.path
                  ? (
                      <Link
                        to={item.path}
                        style={{fontWeight: 400}}
                        className={
                          'text-[0.14rem] text-[rgba(255,255,255,0.6)] hover:text-[#fff] md:text-[0.14rem]'
                        }>
                        {item.text}
                      </Link>
                    )
                  : (
                  <a
                    href={item.href}
                    target={item.target || '_blank'}
                    className={
                      'text-[0.14rem] text-[rgba(255,255,255,0.6)] hover:text-[#fff]'
                    }>
                    {item.text}
                  </a>
                )}
              </div>
            )
          })
          : null}
      </div>
    </div>
  )
}

export function CommunityIcon(props: { name: string; url: string, iconStyle?: CSSProperties, isLight?: boolean }) {
  const { getCommunityIconByName } = useCommunityIcon()
  const { isDark } = useTheme()
  const [active, setActive] = useState(false)

  const currentURl = useMemo(() => {
    const iconInfo = getCommunityIconByName(props.name)
    if (active) {
      return iconInfo.icons.active
    } else if (props.isLight) {
      return iconInfo.icons.light
    } else {
      return iconInfo.icons.dark
    }
  }, [active, isDark, getCommunityIconByName, props.name])

  return (
    <a
      href={props.url}
      target={'_blank'}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}>
      <img
        src={currentURl}
        style={props.iconStyle}
        className={'h-[0.4rem] w-[0.4rem] rounded-[50%] md:h-[0.38rem] md:w-[0.38rem]'}
        alt=""
      />
    </a>
  )
}


