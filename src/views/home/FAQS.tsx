import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {useEffect, useMemo, useRef, useState} from 'react'
import {FlexBox, FlexSb} from '../../components/flex/Flex.tsx'
import SvgIcon from '../../components/svgIocn/SvgIcon.tsx'
import {dropdownIcon} from '../../utils/svgManage.ts'
import moreImg from 'src/assets/img/more.png';
import box_bg from 'src/assets/img/box_bg.avif';

export const FAQSStyle = styled.div`
    width: 100vw;
    position: relative;
    padding-top: 1.28rem;
    background: url(${box_bg}) no-repeat left bottom;
    background-size: 100% 11.7rem;
    background-color: #02050A;
`
const FAQItemStyle = styled.div<{active?: boolean, dataHeight?: number}>`
    font-size: 0.2rem;
    font-weight: 500;
    height: ${({dataHeight}) => dataHeight ? `${dataHeight}px` : 0};
    box-sizing: border-box;
    background: rgba(115, 171, 255, 0.4);
    transition: height 0.3s;
    overflow: hidden;
`;

export default function FAQS() {
  const {t} = useTranslation()
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0)
  const [showMore, setShowMore] = useState(false)
  const listData = [
    {
      title: t(`What is BluechipAI?`),
      content: t(`BluechipAI is a decentralized startup investment platform that uses AI and blockchain technology to connect investors with promising early-stage startups from around the world.`)
    },
    {
      title: t(`How does BluechipAI find startups to feature?`),
      content: t(`BluechipAI utilizes AI to actively scour the internet for the most viable early-stage startups. Startups can also apply directly to the platform and undergo a rigorous review process.`),
    },
    {
      title: t(`How do I invest in startups on BluechipAI?`),
      content: t(`You deposit funds using cryptocurrencies on the platform and then commit capital to startups you wish to support. If a startup reaches its funding goal and claimed it, your investment is allocated.`),
    },
    {
      title: t(`What are the risks of investing in startups?`),
      content: t(`Startup investing carries high risks as many ventures fail. Only invest amounts you can afford to lose. BluechipAI evaluates startups to mitigate risks but does not guarantee returns.`),
    },
    {
      title: t(`How do I know which startups to invest in?`),
      content: t(`Browse startup profiles, check founder credentials, read business plans and ask questions. also consider other investors' due diligence.`)
    },
    {
      title: t(`When do I get updates on my investments?`),
      content: t(`You'll receive regular updates from startup through the platform. Track project milestones and liquidate your positions as desired.`)
    },
    {
      title: t(`How do I withdraw my profits?`),
      content: t(`For successful investments that provide returns, profits can be withdrawn back to your account minus any performance fees.`)
    },
    {
      title: t(`Is my investment money safe on BluechipAI?`),
      content: t(`Funds are securely held in insured crypto wallets. BluechipAI maintains security protocols and has never suffered a data breach.`)
    },
    {
      title: t(`What is the $CHIP token and how can I earn it?`),
      content: t(`$CHIP is the platform token used to access features and earn rewards. It can be obtained via purchasing, liquidity mining or investing.`)
    },
    {
      title: t(`What fees does BluechipAI charge?`),
      content: t(`Standard fees include investment commissions and performance bonuses charged to funded startups. VIP levels get fee discounts for long term supporters.`)
    }
  ]

  const currentListData = useMemo(() => {
    if (showMore) {
      return listData
    } else {
      return listData.slice(0, 6)
    }
  }, [showMore])

  return (
    <FAQSStyle id={'FAQ'}>
      <div className={'pl-[1.68rem] text-[0.96rem] font-medium mb-[2rem]'}>{t(`FAQS`)}</div>
      <div>
        {
          currentListData.map((item, index) => {
            return <FAQSItem
              key={index}
              itemData={item}
              active={activeIndex === index}
              onSelect={() => {
                if (activeIndex === index) {
                  setActiveIndex(undefined)
                } else {
                  setActiveIndex(index)
                }
              }} />
          })
        }
      </div>
      <div
        style={{height: '4rem', display: 'flex', justifyContent: 'center', paddingTop: '0.56rem', boxSizing: 'border-box'}}
       onClick={() => {
        setShowMore(!showMore)
      }}>
        <img src={moreImg} style={{width: '0.96rem', height: '0.96rem', cursor: 'pointer', transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s'}} alt="" />
      </div>
    </FAQSStyle>
  )
}

type ItemProps = {
  itemData: {
    title: string
    content: string
  }
  active: boolean
  onSelect(): void
}
function FAQSItem(props: ItemProps) {
  const contentRef=  useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    setContentHeight(contentRef.current?.clientHeight || 0)
  }, [])

  useEffect(() => {
    const contentEL = document.createElement('div')
    contentEL.style.cssText = `padding: 0.48rem 1.68rem;font-size: 0.2rem;`;
    contentEL.innerHTML = props.itemData.content;
  }, [])

  return (
    <div className={'flex flex-col border-b border-[rgba(255,255,255,0.24)]'}>
      <FlexSb
        className={'h-[1.28rem] px-[1.68rem] cursor-pointer'}
        style={props.active ? {background: 'linear-gradient(90deg, #94EFFF 4.22%, #FFF0B2 99%)'} : {}}
        onClick={props.onSelect}>
        <div className={'text-[0.32rem] font-medium flex-1 mr-[0.6rem] overflow-ellipsis'} style={{color: props.active ? '#000' : '#fff'}}>{props.itemData.title}</div>
        <FlexBox style={{transform: props.active ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}}>
          <SvgIcon dangerouslySetInnerHTML={dropdownIcon} width={'0.2rem'} fillColor={props.active ? '#000' : '#fff'} />
        </FlexBox>
      </FlexSb>
      <FAQItemStyle
        active={props.active}
        dataHeight={props.active ? contentHeight : 0}>
        <div ref={contentRef}
             style={{padding: '0.48rem 1.68rem'}}>{props.itemData.content}</div>
      </FAQItemStyle>
    </div>
  )
}
