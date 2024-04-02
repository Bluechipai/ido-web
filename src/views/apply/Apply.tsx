import {useTranslation} from 'react-i18next'
import {ApplyContentStyle, Title} from './Apply.style'
import RSlider from '../../components/slider/RSlider.tsx'
import {FlexCol} from '../../components/flex/Flex.tsx'
import {LinerText, StepLabelTitle} from '../../global.style.ts'
import Step1, {Step1Default} from './Step1.tsx'
import Step2 from './Step2.tsx'
import Step3 from './Step3.tsx'
import {useEffect, useRef, useState} from 'react'
import {awaitWrap} from '../../utils/tools.ts'
import axios from 'axios'
import {useAppSelector} from '../../store'
import {useMessage} from '../../hooks/useMessage.ts'

export type ChildImperativeHandle = {reset(): void}

export default function Apply() {
  const {t} = useTranslation()
  const userData = useAppSelector((state) => state.users)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({...Step1Default})
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()
  const step1Ref = useRef<ChildImperativeHandle>()
  const step2Ref = useRef<ChildImperativeHandle>()
  const step3Ref = useRef<ChildImperativeHandle>()

  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [currentStep])
  async function submit(reqFormData: any) {
    if (loading) {
      return;
    }
    if (!userData.address) {
      showMessage(t('Please connect wallet'))
      return;
    }
    setLoading(true)
    const [resData] = await awaitWrap(axios.post(`/plg/ido/iuser/apply`, {
      ...reqFormData,
      applyAddr: userData.address,
    }))
    setLoading(false)
    if (resData) {
      showMessage(t(`Apply success!`))
      step1Ref.current?.reset()
      step2Ref.current?.reset()
      step3Ref.current?.reset()
      setCurrentStep(1)
    }
  }

  return (
    <ApplyContentStyle>
      <Title>{t(`Apply to create a private sale`)}</Title>
      <div style={{width: '9.6rem', margin: '0 auto'}}>
        <RSlider
          disabled={false}
          value={(currentStep - 1) * 50}
          height={'0.02rem'}
          labelStyle={{transform: 'translate(-50%, calc(100% + 0.02rem))'}}
          stepItemStyle={{
            background: 'rgba(255,255,255,0.48)',
            borderColor: 'rgba(255,255,255,0.48)',
            backgroundClip: 'content-box',
            fontSize: '0.16rem',
            fontWeight: 700
          }}
          marks={[
            {
              value: 0,
              label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                <StepLabelTitle>{t(`Fundraising Information`)}</StepLabelTitle>
              </FlexCol>,
              rowRender(): React.ReactNode {
                return <LinerText style={{fontFamily: 'futura'}}>1</LinerText>
              }
            },
            {
              value: 50,
              label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                <StepLabelTitle>{t(`Project Introduction`)}</StepLabelTitle>
              </FlexCol>,
              rowRender(): React.ReactNode {
                return <LinerText>2</LinerText>
              }
            },
            {
              value: 100,
              label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                <StepLabelTitle>{t(`Contact Information`)}</StepLabelTitle>
              </FlexCol>,
              rowRender(): React.ReactNode {
                return <LinerText>3</LinerText>
              }
            }
          ]}
          onChange={() => {
          }} />
      </div>
      <Step1
        childrenRef={step1Ref}
        style={ currentStep === 1 ? {} : { display: 'none'}}
        onConfirm={(formInfo) => {
          console.log(formInfo)
          setFormData(Object.assign({}, formData, {...formInfo}))
          setCurrentStep(2)
          // step1Ref.current?.reset()
        }} />
      <Step2
        childrenRef={step2Ref}
        style={ currentStep === 2 ? {} : { display: 'none'}}
        onCancel={() => {
          setCurrentStep(1)
        }}
        onConfirm={(formInfo) => {
          console.log(formInfo)
          setFormData(Object.assign({}, formData, {...formInfo}))
          setCurrentStep(3)
        }} />
      <Step3
        childrenRef={step3Ref}
        style={ currentStep === 3 ? {} : { display: 'none'}}
        onCancel={() => {
          setCurrentStep(2)
        }}
        onConfirm={(formInfo) => {
          const reqFormData = Object.assign({}, formData, {...formInfo});
          setFormData({...reqFormData})
          submit(reqFormData);
        }} />
      {/*<Step2 />
      <Step3 />*/}
    </ApplyContentStyle>
  )
}
