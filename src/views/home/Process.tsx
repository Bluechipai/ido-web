import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import investBg from 'src/assets/img/home/investBg.avif'
import {FlexCol} from '../../components/flex/Flex.tsx'
import {useEffect, useRef, useState} from 'react'
import {StepLabelSubtitle, StepLabelTitle} from '../../global.style.ts'
import RSlider from '../../components/slider/RSlider.tsx'
import process1 from 'src/assets/img/home/process1.svg'
import process2 from 'src/assets/img/home/process2.svg'
import process3 from 'src/assets/img/home/process3.png'
import process4 from 'src/assets/img/home/process4.png'
import process5 from 'src/assets/img/home/process5.png'

export const ProgressStyle = styled.div`
    position: relative;
    width: 100vw;
    background: url(${investBg}) no-repeat;
    background-size: cover;
    background-attachment: fixed;
`

export default function Progress() {
  const {t} = useTranslation()
  const progressRef = useRef<HTMLDivElement>(null)
  const [offsetX, setOffsetX] = useState(0)

  useEffect(() => {
    console.log(progressRef.current?.offsetTop)
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  async function handleScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const offsetTop = progressRef.current?.offsetTop || 0;
    const sub = scrollTop - offsetTop;
    if (sub > 0 && sub < 1200) {
      setOffsetX(sub)
    } else if (sub >= 1200) {
      setOffsetX(1200)
    } else {
      setOffsetX(0)
    }
  }

  /* 1200 is important */
  return (
    <ProgressStyle className={'pt-[1.28rem]'} ref={progressRef}>
      <div className={'sticky top-[1.2rem] w-[15.84rem] mx-auto text-[0.96rem] font-medium futura'}>
        <div className={'uppercase mb-[0.16rem]'}>{t(`Launchpad`)}</div>
        <div className={'uppercase'}>{t(`PARTICIPATION PROCESS`)}</div>
        <div className={'mt-[2rem] pb-[4rem] child-n-l:mr-[2rem]'} style={{width: 'max-content', transform: `translate3d(-${offsetX}px, 0, 0)`}}>
          <div className={'w-[15.76rem] inline-block'}>
            <RSlider
              style={{marginTop: '0.08rem'}}
              disabled={false}
              value={100}
              marks={[
                {
                  value: 0,
                  label: <FlexCol style={{width: '4rem'}}>
                    <StepLabelTitle style={{
                      fontSize: '0.28rem',
                      fontWeight: '700',
                      lineHeight: '0.32rem',
                    }}>{t(`Connect your Wallet`)}</StepLabelTitle>
                    <StepLabelSubtitle style={{
                      fontSize: '0.16rem',
                      fontWeight: '500',
                      lineHeight: '0.24rem',
                      color: 'rgba(255,255,255,0.64)'
                    }}>{t(`1. Connect your wallet to the zkSync network and sign in. Ensure sufficient USDT balance to purchase $CHIP tokens to enjoy fee deduction.`)}</StepLabelSubtitle>
                  </FlexCol>,
                  markIcon: <img src={process1} style={{width: '0.88rem', height: '0.88rem', maxWidth: 'none'}} alt={''} />,
                },
                {
                  value: 35,
                  label: <FlexCol style={{width: '4rem'}}>
                    <StepLabelTitle style={{
                      fontSize: '0.28rem',
                      fontWeight: '700',
                      lineHeight: '0.32rem',
                    }}>{t(`Explore and choose your investment`)}</StepLabelTitle>
                    <StepLabelSubtitle style={{
                      fontSize: '0.16rem',
                      fontWeight: '500',
                      lineHeight: '0.24rem',
                      color: 'rgba(255,255,255,0.64)'
                    }}>{t(`2.  Browse the next rising star startup profiles selected by our AI algorithm. Filter by sector and investment stage to find the best opportunities aligned with your risk tolerance and preferable projects.`)}</StepLabelSubtitle>
                  </FlexCol>,
                  markIcon: <img src={process2} style={{width: '0.88rem', height: '0.88rem', maxWidth: 'none'}} alt={''} />,
                },
                {
                  value: 70,
                  label: <FlexCol style={{width: '4rem'}}>
                    <StepLabelTitle style={{
                      fontSize: '0.28rem',
                      fontWeight: '700',
                      lineHeight: '0.32rem',
                    }}>{t(`Read and Sign the Risk investment terms`)}</StepLabelTitle>
                    <StepLabelSubtitle style={{
                      fontSize: '0.16rem',
                      fontWeight: '500',
                      lineHeight: '0.24rem',
                      color: 'rgba(255,255,255,0.64)'
                    }}>{t(`3. Carefully review investment terms and startup risk disclosures before committing your investment. Receive project tokens after TGE or $CHIP compensation if fundraising fails, depending on project performance and various reasons.`)}</StepLabelSubtitle>
                  </FlexCol>,
                  markIcon: <img src={process3} style={{width: '0.88rem', height: '0.88rem', maxWidth: 'none'}} alt={''} />,
                },
                {value: 100, label: ''},
              ]}
              onChange={() => {
              }} />
          </div>
          <div className={'w-[4rem] inline-block'}>
            <RSlider
              style={{marginTop: '0.08rem'}}
              disabled={false}
              value={100}
              marks={[
                {
                  value: 0,
                  label: <FlexCol style={{width: '4rem'}}>
                    <StepLabelTitle
                      style={{fontSize: '0.28rem', fontWeight: '700', lineHeight: '0.32rem'}}>{t(`Staking`)}</StepLabelTitle>
                    <StepLabelSubtitle style={{
                      fontSize: '0.16rem',
                      fontWeight: '500',
                      lineHeight: '0.24rem',
                      color: 'rgba(255,255,255,0.64)'
                    }}>{t(`4. Stake your $CHIP to earn passive income while awaiting new deals. Choose flexible-yield or fixed-term options. Remain invested to fuel further platform and community growth. (Penalty will be applied for early exit)`)}</StepLabelSubtitle>
                  </FlexCol>,
                  markIcon: <img src={process4} style={{width: '0.88rem', height: '0.88rem', maxWidth: 'none'}} alt={''} />,
                },
                {value: 100, label: ''},
              ]}
              onChange={() => {
              }} />
          </div>
          <div className={'w-[4rem] inline-block'}>
            <RSlider
              style={{marginTop: '0.08rem'}}
              disabled={false}
              value={100}
              marks={[
                {
                  value: 0,
                  label: <FlexCol style={{width: '4rem'}}>
                    <StepLabelTitle
                      style={{
                        fontSize: '0.28rem',
                        fontWeight: '700',
                        lineHeight: '0.32rem',
                      }}>{t(`Participate in BlueChipAi ecosystem governance`)}</StepLabelTitle>
                    <StepLabelSubtitle style={{
                      fontSize: '0.16rem',
                      fontWeight: '500',
                      lineHeight: '0.24rem',
                      color: 'rgba(255,255,255,0.64)'
                    }}>{t(`5. Shape the future as a valued member. $CHIP holders participate in governance to refine processes, suggest startup criteria, and guide AI screening - all to discover more innovative bluechips earlier than ever before.`)}</StepLabelSubtitle>
                  </FlexCol>,
                  markIcon: <img src={process5} style={{width: '0.88rem', height: '0.88rem', maxWidth: 'none'}} alt={''} />,
                },
                {value: 100, label: ''},
              ]}
              onChange={() => {
              }} />
          </div>
        </div>
      </div>
      <div className={'h-[12rem]'}></div>
    </ProgressStyle>
  )
}
