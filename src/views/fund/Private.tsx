import {useTranslation} from 'react-i18next'
import {
  ContentBox,
  DescList,
  Introduction,
  IntroductionDesc,
  IntroductionTitle, LabelStyle,
  PrivateBanner,
  PrivateContent,
  PrivateStyle, TitleStyle,
} from './Private.style'
import Footer, {CommunityIcon} from '../../components/footer/Footer.tsx'
import {FlexCol, FlexRow, FlexSb} from '../../components/flex/Flex.tsx'
import label_icon_1 from 'src/assets/img/private/label_icon_1.png';
import label_icon_2 from 'src/assets/img/private/label_icon_2.png';
import label_icon_3 from 'src/assets/img/private/label_icon_3.png';
import Screenshot1 from 'src/assets/img/private/Screenshot1.png';
import Screenshot2 from 'src/assets/img/private/Screenshot2.png';
import Screenshot3 from 'src/assets/img/private/Screenshot3.png';
import RSlider from '../../components/slider/RSlider.tsx'
import {StepLabelSubtitle, StepLabelTitle} from '../../global.style.ts'
import PrivatePanel from './PrivatePanel.tsx'
import {useParams} from 'react-router-dom'
import {useQueryLaunchpadDetail} from '../../api/system.tsx'
import {formatAddress} from '../../utils/tools.ts'
import project from 'src/contract/project.json'
import {useMemo, useState} from 'react'
import PublicPanel from './PublicPanel.tsx'
import {useChainIcon} from '../../hooks/useChainIcon.ts'

export default function Private() {
  const {t} = useTranslation()
  const {id} = useParams()
  const {data} = useQueryLaunchpadDetail(id)
  const chainInfo =  useChainIcon()
  const [showSubscription, setShowSubscription] = useState(false)

  const networks = useMemo(() => {
    if (data) {
      return data.network.split(',')
    } else {
      return []
    }
  }, [data])

  return (
    <PrivateStyle>
      <PrivateBanner>
        <PrivateContent>
          <Introduction>
            <FlexRow style={{marginBottom: '0.32rem'}}>
              <img src={data?.logoUrl} style={{width: '0.96rem', height: '0.96rem', marginRight: '0.18rem', borderRadius: '50%'}} alt="" />
              <IntroductionTitle>{data?.projName}</IntroductionTitle>
            </FlexRow>
            <IntroductionDesc dangerouslySetInnerHTML={{__html: data?.content || ''}}></IntroductionDesc>
            <FlexSb style={{marginTop: '1.5rem'}}>
              <div style={{ display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: '0.16rem', columnGap: '0.16rem', maxWidth: '70%',flexWrap: 'wrap'}}>
                {
                  networks.map((item, index) => {
                    // @ts-ignore
                    return <img src={chainInfo[item.toLowerCase()]} key={index} style={{width: '1.3rem'}} alt="" />
                  })
                }
              </div>
              <FlexRow className={'child-n-l:mr-[0.16rem] md:mb-[0.2rem]'}>
                {
                  data?.communitys.map((item) => {
                    return <CommunityIcon
                      key={item.id}
                      name={item.name}
                      url={item.url}
                      isLight={true}
                      iconStyle={{width: '0.32rem', height: '0.32rem'}}
                    />
                  }
                )
                }
              </FlexRow>
            </FlexSb>
          </Introduction>
          {
            showSubscription
              ? <PrivatePanel
                  projectInfo={data}
                  onReload={() => {

                  }}
                  onCancel={() => {
                    setShowSubscription(false)
                  }} />
              : <PublicPanel
                projectInfo={data}
                onConfirm={() => {
                  setShowSubscription(true)
                }} />
          }
        </PrivateContent>
      </PrivateBanner>
      <ContentBox>
        <TitleStyle>{t(`details`)}</TitleStyle>
        <FlexCol style={{marginBottom: '1.28rem'}}>
          <FlexRow style={{marginBottom: '0.24rem'}}>
            <img src={label_icon_1} style={{width: '0.24rem', marginRight: '0.12rem'}} alt="" />
            <LabelStyle>{t(`Screenshot`)}</LabelStyle>
          </FlexRow>
          <FlexSb>
            <img src={Screenshot1} style={{width: '4.64rem'}} alt="" />
            <img src={Screenshot2} style={{width: '4.64rem'}} alt="" />
            <img src={Screenshot3} style={{width: '4.64rem'}} alt="" />
          </FlexSb>
        </FlexCol>
        <FlexCol style={{marginBottom: '1.68rem'}}>
          <FlexSb style={{marginBottom: '0.48rem'}}>
            <FlexRow style={{marginBottom: '0.24rem'}}>
              <img src={label_icon_2} style={{width: '0.18rem', marginRight: '0.16rem'}} alt="" />
              <LabelStyle>{t(`Financing progress`)}</LabelStyle>
            </FlexRow>
            <FlexRow style={{fontSize: '0.12rem', fontWeight: 500}}>
              <span>Contract address:</span>
              <span style={{color: '#3E96E7', marginLeft: '0.16rem'}}>{formatAddress(project.contracts.IDO.address)}</span>
            </FlexRow>
          </FlexSb>
          <RSlider
            style={{marginTop: '0.08rem'}}
            disabled={false}
            value={data?.state === 1 ? 25 : 75}
            marks={[
              {
                value: 0,
                label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                  <StepLabelTitle>{t(`Subscription in progress`)}</StepLabelTitle>
                  <StepLabelSubtitle>{t(`User subscription in progress`)}</StepLabelSubtitle>
                </FlexCol>
              },
              {
                value: 25,
                label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                  <StepLabelTitle>{t(`In Financing`)}</StepLabelTitle>
                  <StepLabelSubtitle>{t(`The subscription fund pool has been completed, waiting for the project party to inject tokens`)}</StepLabelSubtitle>
                </FlexCol>
              },
              {value: 50, label: "50%", hidden: true},
              {
                value: 75,
                label: <FlexCol style={{whiteSpace: 'nowrap'}}>
                  <StepLabelTitle>{t(`Financing Completion`)}</StepLabelTitle>
                  <StepLabelSubtitle>{t(`The project party has injected coins and tokens can be extracted`)}</StepLabelSubtitle>
                </FlexCol>
              },
              {value: 100, label: ""}
            ]}
            onChange={() => {}} />
        </FlexCol>
        <FlexCol style={{marginBottom: '1.28rem'}}>
          <FlexRow style={{marginBottom: '0.4rem'}}>
            <img src={label_icon_3} style={{width: '0.2rem', marginRight: '0.16rem'}} alt="" />
            <LabelStyle>{t(`Rule Description`)}</LabelStyle>
          </FlexRow>
          <div>
            <DescList>
              <li>
                <div>{(`Subscription currency: USDT;`)}</div>
              </li>
              <li>
                <div>{(`Rewards obtained: platform coins and project tokens;`)}</div>
              </li>
              <li>
                <div>
                  <div>{t(`Early redemption: Cancel the pledge to obtain interest income, but the agreement penalty needs to be deducted 5-10% of the original pledge amount `)}</div>
                  <div>{t(`(the shorter the subscription time, the higher the deduction fee, with a 10% cap);`)}</div>
                </div>
              </li>
              <li>
                <div>
                  <div>{t(`Contract resale: If the current pledged shares are full (depending on the quality of the project, the upper limit of pool creation will be classified to avoid user risk, ranging from 10k-1M), `)}</div>
                  <div>{t(`user A can resell to user B, and the platform will charge a transfer fee of 5-10%;`)}</div>
                </div>
              </li>
              <li>
                <div>
                  <div>{t(`Whitelist address: The currency subscribed by users, allowing whitelist addresses to be extracted, and helping users earn the maximum profit of risk-free arbitrage through external market makers `)}</div>
                  <div>{t(`(approximately 6-8% annualized), which high-risk users can choose on their own;`)}</div>
                </div>
              </li>
              <li>
                <div>{t(`Withdrawal of coins: If the financing is successful, the platform will draw a commission according to a certain proportion;`)}</div>
              </li>
              <li>
                <div>{t(`Redemption: If financing fails, users will withdraw their tokens and receive platform token rewards;`)}</div>
              </li>
              <li>
                <div>{t(`Risk assessment: High risk projects will be automatically delisted and allow users to extract assets`)}</div>
              </li>
            </DescList>
          </div>
        </FlexCol>
      </ContentBox>
      <Footer style={{marginTop: '1.68rem'}} />
    </PrivateStyle>
  )
}
