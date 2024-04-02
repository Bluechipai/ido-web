import {
  AccessButton,
  AccessText,
  BannerStyle,
  HomeStyle,
  LaunchpadButton,
  ModalRadio
} from './home.style.ts'
import {useTranslation} from 'react-i18next'
import {FlexRow} from '../../components/flex/Flex.tsx'
import ChainList from './ChainList.tsx';
import DataPanel from './DataPanel.tsx';
import Placement from './Placement.tsx';
import ProgressData from './ProgressData.tsx';
import Invest from './Invest.tsx'
import Progress from './Process.tsx'
import CreateProject from './CreateProject.tsx'
import FAQS from './FAQS.tsx';
import Footer from '../../components/footer/Footer.tsx'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

export default function Home() {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)
  const [show, setShow] = useState(true)

  return (
    <HomeStyle>
      <BannerStyle onMouseMove={(event) => {
        if (event.clientY > 200) {
          setClientX(event.clientX)
          setClientY(event.clientY)
          setShow(true)
        } else {
          setShow(false)
        }
      }}>
        <div className={'absolute top-[2.4rem] left-[1.68rem]'}>
          <div className={'relative'}>
            <div className={'futura uppercase text-[1.28rem]'}>{t(`Accessible to `)}</div>
            <FlexRow>
              <div className={'futura uppercase mr-[0.28rem] text-[1.28rem]'}>{t(`the`)}</div>
              <AccessButton className={'futura uppercase text-[1.28rem]'}>
                <AccessText>{t(`Untouchable`)}</AccessText>
              </AccessButton>
            </FlexRow>
          </div>
          <div className={'mt-[2.16rem]'}>
            <div className={'w-[7.83rem] text-[0.24rem] mb-[0.4rem]'}>{t(`The advanced approach to early-stage projects with AI modeling and capturing them before others`)}</div>
            <div>
              <LaunchpadButton
                className={'relative z-[1] mr-[0.24rem]'}
                onClick={() => navigate('/launchpad/index')}>{t(`Launchpad`)}</LaunchpadButton>
              <LaunchpadButton
                className={'relative z-[1]'}
                onClick={() => navigate('/staking')}>{t(`Subscribe`)}</LaunchpadButton>
            </div>
          </div>
        </div>
        <div className={'w-full absolute bottom-0 left-1/2 -translate-x-1/2 text-center pointer-events-none'}>
          <div className={'opacity-[0.04] text-[3.2rem] AllertaStencil'}>{t(`BLUECHIPAI`)}</div>
          <ChainList />
        </div>
        <ModalRadio style={{left: `${clientX}px`, top: `${clientY}px`, opacity: show ? 1 : 0}} />
      </BannerStyle>
      <DataPanel />
      <Placement />
      <ProgressData />
      <Invest />
      <Progress />
      <CreateProject />
      <FAQS />
      <Footer style={{marginTop: '-1.28rem'}} />
    </HomeStyle>
  )
}
