import React, {useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SvgIcon from '../svgIocn/SvgIcon.tsx'
import {arrowIcon, ExitIcon, PortfolioIcon, walletIcon} from '../../utils/svgManage.ts'
import useModal from '../../hooks/useModal.ts'
import ConnectWalletModal, {
  IConnectWalletModal,
} from '../connectWalletModal/ConnectWalletModal.tsx'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store'
import {formatAddress, formatUSDT, getEventParentElement} from '../../utils/tools.ts'
import { useMemo, useState } from 'react'
import { useDomcumentOnClick } from '../../hooks/useDomcumentOnClick.ts'
import Language from '../language/Language.tsx'
import useWidthChange from '../../hooks/useWidthChange.ts'
import { userSlice } from '../../store/usersReducer.ts'
import { useWalletTools } from '../../hooks/useWalletTools.ts'
import ThemeButton from '../themeButton/ThemeButton.tsx'
import Logo from '../logo/Logo.tsx'
import { FlexBox, FlexRow, FlexSb } from '../flex/Flex.tsx'
import { useTheme } from '../../hooks/useTheme.ts'
import { useMessage } from '../../hooks/useMessage.ts'
import styled from 'styled-components'
import chipIcon from 'src/assets/img/chipIcon.png';
import dropdownIcon from 'src/assets/img/dropdown.png';
import ReactDOM from 'react-dom'
import UserPanel from '../userPanel/UserPanel.tsx'
import {HeaderStyle, NavAnchorStyle, NavLinkStyle, NavPanelItemStyle, UserNavPanel} from './Header.style.ts'
import {tokenPrecision} from '../../config.ts'
import SwapPanel from '../swapPanel/SwapPanel.tsx'

export const MiniButton = styled.button<{isGray?: boolean}>`
    height: 0.2rem;
    padding: 0 0.1rem;
    background: linear-gradient(270deg, #7BEBFF 0%, #FFECA0 100%);
    border-radius: 0.1rem;
    font-size: 0.12rem;
    font-weight: 400;
    color: #000;
    cursor: pointer;
    border: none;
    outline: none;
`;

type INavs = {
  to?: string
  href?: string
  text: string
}
export default function Header() {
  const { t, i18n } = useTranslation()
  const { isH5 } = useWidthChange()

  const navs = useMemo(() => {
    return [
      { text: t(`Home`), to: '/' },
      { text: t(`Launchpad`), to: '/launchpad/index' },
      { text: t(`Staking`), to: '/staking' },
      { text: t(`Referral System`), to: '/rewards' },
      { text: t(`Documents`), href: 'https://docs.bluechipai.co/bluechipai' },
    ]
  }, [i18n.language])

  return isH5 ? <RenderH5 navs={navs}/> : <RenderWeb navs={navs}/>
}

type IRenderProps = {
  navs: INavs[]
}

function RenderWeb(props: IRenderProps) {
  const userData = useAppSelector((state) => state.users)
  const { deactivate } = useWalletTools()
  const dispatch = useAppDispatch()
  const { openModal } = useModal()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [panelStatus, setPanelStatus] = useState(false)
  const [userNavStatus, setUserNavStatus] = useState(false)
  const [swapPanelStatus, setSwapPanelStatus] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [filter, setFilter] = useState(0)
  const [active, setActive] = useState(true)

  useEffect(() => {
    window.addEventListener('scroll', docElementScroll)
    document.documentElement.addEventListener('wheel', handleWheel)
  }, [])

  useDomcumentOnClick((event) => {
    // @ts-ignore
    if (!event.target || !getEventParentElement(event.target, 'userPanel')) {
      setUserNavStatus(false)
    }
    // @ts-ignore
    if (!event.target || !getEventParentElement(event.target, 'swapPanel')) {
      setSwapPanelStatus(false)
    }
  })

  function docElementScroll() {
    const max = 300;
    const opacityVal = document.documentElement.scrollTop > max ? 0.5 : (document.documentElement.scrollTop / max * 0.5)
    const filterVal = document.documentElement.scrollTop > max ? 32 : (document.documentElement.scrollTop / max * 32)
    setOpacity(opacityVal)
    setFilter(filterVal)
  }

  function handleWheel(event: WheelEvent) {
    if (document.documentElement.scrollTop > 300 && event.deltaY > 0) {
      setActive(false)
    } else {
      setActive(true)
    }
  }

  return (
    <HeaderStyle active={active} style={{background: `rgba(255, 255, 255, ${opacity})`, backdropFilter: `blur(${filter}px)`}}>
      <FlexRow className={'mr-[0.5rem]'}>
        <Logo/>
      </FlexRow>
      <FlexRow>
        <nav
          className={
            'flex items-center child-n-l:mr-[0.72rem]'
          }>
          {props.navs.map((item, index) => {
            return (
              <>
                {item.to ? (
                  <NavLinkStyle
                    key={index}
                    to={item.to}
                    className={(renderProps) => {
                      return `${
                        renderProps.isActive
                          ? 'active'
                          : ''
                      }`
                    }}>
                    {item.text}
                  </NavLinkStyle>
                ) : (
                  <NavAnchorStyle
                    href={item.href}
                    target={'_blank'}>
                    {item.text}
                  </NavAnchorStyle>
                )}
              </>
            )
          })}
        </nav>
      </FlexRow>
      <FlexRow>
        <FlexRow id={'nav-box'}>
          <FlexBox
            id={'swapPanel'}
            className={
              'relative ml-[0.1rem] h-[0.32rem] pl-[0.06rem] pr-[0.1rem] cursor-pointer rounded-[0.24rem] bg-button text-[#fff]'
            }
            onClick={() => {
              setSwapPanelStatus(true)
            }}>
            <MiniButton style={{marginRight: '0.04rem'}}>${formatUSDT(userData.chipRadio, tokenPrecision)}</MiniButton>
            <FlexRow>
              <span className={'text-[0.12rem]'}>Buy CHIP</span>
              <img src={chipIcon} style={{width: '0.1rem', height: '0.1rem', marginLeft: '0.04rem'}} alt="" />
            </FlexRow>
            <img src={dropdownIcon} style={{width: '0.1rem', height: '0.08rem', marginLeft: '0.12rem'}} alt="" />
            {
              swapPanelStatus
                ? <SwapPanel href={import.meta.env.VITE_swapURL} target={'_blank'} />
                : null
            }
          </FlexBox>
          <div
            className={'relative'}
            id={'userPanel'}>
          {userData.address ? (
              <FlexBox
                className={
                  'ml-[0.12rem] h-[0.28rem] w-[1.4rem] cursor-pointer rounded-[0.04rem] bg-active text-[0.14rem]'
                }
                onClick={() => {
                  setUserNavStatus(!panelStatus)
                }}>
                <span className={'mr-[0.04rem]'}>
                  {formatAddress(userData.address)}
                </span>
                <img src={dropdownIcon} style={{width: '0.1rem', height: '0.08rem', marginLeft: '0.12rem'}} alt="" />
              </FlexBox>
          ) : (
            <FlexBox
              className={
                  'ml-[0.1rem] h-[0.32rem] w-[1.4rem] cursor-pointer rounded-[0.24rem] bg-button text-[#fff]'
                }
                onClick={() => {
                  openModal<IConnectWalletModal>(ConnectWalletModal)
                }}>
                <div className={''}>
                  {t(`Connect Wallet`)}
                </div>
              </FlexBox>
            )}
            {
              userNavStatus
                ? <UserNavPanel>
                    <NavPanelItem
                      icon={PortfolioIcon}
                      text={t(`My Portfolio`)}
                      onClick={() => {
                        setPanelStatus(!panelStatus)
                        setUserNavStatus(false)
                      }} />
                    <NavPanelItem
                      icon={ExitIcon}
                      text={t(`Disconnect`)}
                      onClick={() => {
                        deactivate()
                        dispatch(userSlice.actions.setAddress(''))
                        setUserNavStatus(false)
                        navigate('/')
                      }} />
                  </UserNavPanel>
                : null
            }
            {/*{panelStatus ? (
              <div
                className={
                  'absolute right-0 top-0 translate-y-[0.4rem] whitespace-nowrap rounded-[0.1rem] bg-box-light px-[0.4rem] py-[0.12rem] child-n-l:mb-[0.2rem] dark:bg-box2 dark:shadow-box'
                }>
                <FlexRow
                  className={'h-[0.6rem] cursor-pointer'}
                  onClick={() => setPanelStatus(false)}>
                  <Link
                    to={'/launchpad/participated'}
                    className={
                      'text-baseColor_light dark:text-baseColor dark:hover:text-active'
                    }>
                    {t(`Launchpad I participated in`)}
                  </Link>
                </FlexRow>
                <FlexRow
                  className={'h-[0.6rem]'}
                  onClick={() => setPanelStatus(false)}>
                  <Link
                    to={'/orders'}
                    className={
                      'text-baseColor_light dark:text-baseColor dark:hover:text-active'
                    }>
                    {t(`Contract resale order`)}
                  </Link>
                </FlexRow>
                <FlexRow
                  className={'h-[0.6rem] cursor-pointer hover:text-[#5DD796]'}
                  onClick={() => {
                    deactivate()
                    dispatch(userSlice.actions.setAddress(''))
                    setPanelStatus(false)
                    navigate('/')
                  }}>
                  {t(`Broken link`)}
                </FlexRow>
              </div>
            ) : null}*/}
            {

            }
          </div>
        </FlexRow>
      </FlexRow>
      {
        userData.address
          ? ReactDOM.createPortal(<UserPanel active={panelStatus} onClose={() => {
            setPanelStatus(false)
          }} />, document.getElementById('root')!)
          : null
      }
    </HeaderStyle>
  )
}

function RenderH5(props: IRenderProps) {
  const { t } = useTranslation()
  const userData = useAppSelector((state) => state.users)
  const { isH5 } = useWidthChange()
  const { deactivate } = useWalletTools()
  const dispatch = useAppDispatch()
  const { openModal } = useModal()
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const { showMessage } = useMessage()
  const [navStatus, setNavStatus] = useState(false)

  useDomcumentOnClick((event) => {
    // @ts-ignore
    if (
      !event.target ||
      // @ts-ignore
      (!getEventParentElement(event.target, 'nav-box') && isH5)
    ) {
      setNavStatus(false)
    }
  })

  return (
    <FlexSb className={'absolute top-0 z-20 h-[0.56rem] w-[100vw] px-[0.12rem]'}>
      <Logo
        imgStyle={{ width: '1.16rem' }}
        fontStyle={{ fontSize: '0.14rem', fontWeight: 700 }}
      />
      <div className={'flex items-center'}>
        <Language/>
        <div
          className={
            'bg-menu-icon_light ml-[0.12rem] h-[0.24rem] w-[0.24rem] bg-cover dark:bg-menu-icon'
          }
          onClick={(event) => {
            setNavStatus(!navStatus)
            event.stopPropagation()
          }}></div>
      </div>
      {navStatus ? (
        <div
          style={{ background: isDark ? '#1C2230' : '#fff' }}
          className={
            'z-modal absolute right-0 top-[0.6rem] w-[2.54rem] rounded-[0.12rem] px-[0.3rem] pb-[0.3rem] pt-[0.1rem]'
          }>
          <FlexRow className={'h-[0.46rem] w-max'}>
            <ThemeButton className={''}/>
          </FlexRow>
          {props.navs.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.to ? (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={(renderProps) => {
                      return `h-[0.46rem] items-center font-[0.18rem] dark:hover:text-active md:flex ${
                        renderProps.isActive
                          ? 'text-active'
                          : 'text-baseColor_light dark:text-baseColor'
                      }`
                    }}>
                    {item.text}
                  </NavLink>
                ) : (
                  <FlexRow
                    className={'h-[0.46rem] cursor-pointer hover:text-active'}
                    onClick={() => showMessage(t(`Stay tuned`))}>
                    {item.text}
                  </FlexRow>
                )}
              </React.Fragment>
            )
          })}
          <div>
            <div
              className={
                'items-center font-[0.18rem] md:mx-auto md:flex md:h-[0.46rem]'
              }
              onClick={() => {
                if (userData.address) {
                  navigate('/launchpad/participated')
                }
              }}>
              {t(`Launchpad I participated in`)}
            </div>
            <div
              className={
                'items-center font-[0.18rem] md:mx-auto md:flex md:h-[0.46rem]'
              }
              onClick={() => {
                if (userData.address) {
                  navigate('/orders')
                }
              }}>
              {t(`Contract resale order`)}
            </div>
            <div
              className={
                'items-center font-[0.18rem] md:mx-auto md:flex md:h-[0.46rem]'
              }
              onClick={() => {
                deactivate()
                dispatch(userSlice.actions.setAddress(''))
                navigate('/')
                // setPanelStatus(false)
              }}>
              {t(`Broken link`)}
            </div>
          </div>
          <div className={'mt-[0.16rem]'}>
            {userData.address ? (
              <FlexBox
                className={
                  'h-[0.52rem] w-[100%] rounded-[0.04rem] bg-active text-[0.14rem]'
                }>
                <span className={'mr-[0.04rem]'}>
                  {formatAddress(userData.address)}
                </span>
                {!isH5 ? (
                  <SvgIcon
                    dangerouslySetInnerHTML={arrowIcon}
                    style={{ transform: 'rotate(90deg)' }}
                    fillColor={isDark ? '#fff' : '#333'}
                  />
                ) : null}
              </FlexBox>
            ) : (
              <FlexBox
                className={
                  'h-[0.52rem] w-[100%] rounded-[0.04rem] bg-active text-[0.14rem] font-normal text-[#fff] outline-none'
                }
                onClick={() => {
                  openModal<IConnectWalletModal>(ConnectWalletModal)
                }}>
                <SvgIcon dangerouslySetInnerHTML={walletIcon}/>
                <div className={'ml-[0.16rem] font-semibold text-[#16432B]'}>
                  {t(`Link Wallet`)}
                </div>
              </FlexBox>
            )}
          </div>
        </div>
      ) : null}
    </FlexSb>
  )
}


type IProps = {
  icon: string
  text: string
  onClick: () => void
}
function NavPanelItem(props: IProps) {
  const [hoverState, setHoverState] = useState(false)

  return <NavPanelItemStyle
    onMouseMove={() => setHoverState(true)}
    onMouseLeave={() => setHoverState(false)}
    onClick={props.onClick}>
    <FlexBox style={{marginRight: '0.08rem'}}>
      <SvgIcon dangerouslySetInnerHTML={props.icon} fillColor={hoverState ? '#fff' : 'rgba(255,255,255,0.6)'} />
    </FlexBox>
    <span>{props.text}</span>
  </NavPanelItemStyle>
}
