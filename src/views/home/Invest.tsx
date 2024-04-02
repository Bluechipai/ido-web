import styled from 'styled-components'
import investBg from '../../assets/img/home/investBg.png'
import {FlexRow} from '../../components/flex/Flex.tsx'
import {useTranslation} from 'react-i18next'
import {LinerText} from '../../global.style.ts'
import {useMemo} from 'react'
import invest1 from 'src/assets/img/home/invest1.png';
import invest2 from 'src/assets/img/home/invest2.png';
import invest3 from 'src/assets/img/home/invest3.png';
import invest4 from 'src/assets/img/home/invest4.png';
import invest5 from 'src/assets/img/home/invest5.png';
import LinerButton from '../../components/linerButton/LinerButton.tsx'

const InvestStyle = styled.div`
    width: 100vw;
    background: #02050A;
    // background: #02050A url(${investBg}) no-repeat left bottom;
    background-size: 100% 11.28rem;
    padding: 1.68rem 0 1.6rem;
`;
export const NumberText = styled.div`
    font-size: 2.4rem;
    font-weight: 700;
    background: linear-gradient(172deg, rgba(255, 255, 255, 0.80) 14.37%, rgba(255, 255, 255, 0.36) 90.55%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export default function Invest() {
  const {t, i18n} = useTranslation()

  const contentList = useMemo(() => {
    return [
      {
        title: t(`The Launchpad Pool`),
        icon: invest1,
        content: t(`The Launchpad Pool allows entrepreneurs to introduce ideas and prototypes to global investors on the BluechipAI platform. Investors back promising projects with $CHIP tokens, which then fund the most compelling startups through a fair randomized process. This decentralized model funds innovation regardless of founders' background.`),
      },
      {
        title: t(`Exclusive Private Sales`),
        icon: invest2,
        content: t(`The more investment amounts contributed through $CHIP token can level up the user's VIP level. Higher VIP levels offer preferential terms like lower investment fees percentage when backing private startup offerings from BluechipAI's portfolio. This dynamic system incentivizes long-term commitments supporting the platform and its projects.`),
      },
      {
        title: t(`Democratic Governance`),
        icon: invest3,
        content: t(`Token stakers participate in governance through community voting on proposals. This consensus guides how BluechipAI evolves its mission open source innovation globally.`)
      },
      {
        title: t(`Aligned Incentives`),
        icon: invest4,
        content: t(`Members earn rewards for valuable contributions like staking, referrals and moderation that strengthen the platform and shared vision of equal funding opportunities. Activities are incentivized that benefit all stakeholders.`)
      },
      {
        title: t(`Rigorous Evaluation`),
        icon: invest5,
        content: t(`BluechipAI rigorously assesses each startup's viability and risk-mitigation before funding to ensure only ventures with strong potential and fundamentals receive support. A secure review process gives confidence to investors.`)
      }
    ]
  }, [i18n.language]);

  return (
    <InvestStyle>
      <div className={'mx-[1.68rem]'}>
        <FlexRow className={'mb-[1.68rem] futura'}>
          <span className={'text-[0.96rem] font-medium mr-[0.48rem] uppercase'}>{t(`we invest`)}</span>
          <LinerButton
            radius={100}
            width={650}
            height={128}
            linerStart={593}
            disabledHover={true}
            style={{cursor: 'default'}}>
            <LinerText className={'uppercase text-[0.96rem]'}>{t(`Deffrently`)}</LinerText>
          </LinerButton>
        </FlexRow>
        <div className={'flex flex-col mb-[1rem]'}>
          <div className={'uppercase text-[0.48rem] font-bold mb-[0.24rem]'}>{t(`Discover new tokens`)}</div>
          <div
            className={'w-[7.88rem] text-[0.2rem]'}>{t(`By combining advanced robotics and algorithms, we are able to obtain the latest token information for upcoming presale projects in advance.`)}</div>
        </div>
        <div className={'flex items-start justify-between'}>
          <div className={'grid'} style={{gridTemplateColumns: `repeat(${contentList.length + 1}, auto)`, rowGap: '1.8rem'}}>
            {
              contentList.map((item, index) => {
                return <>
                  <NumberText style={{position: 'sticky', top: '2.2rem', gridArea: `${index+1}/${index+1}/${index+2}/${index+2}`}}>{index+1}</NumberText>
                  <div
                    className={'w-[5.6rem] min-h-[3.24rem] ml-[2.18rem]'}
                    key={index}
                    style={{position: 'sticky', top: '2.5rem', background: '#02050A', gridArea: `${index+1}/${contentList.length + 1}/${index+2}/${contentList.length + 2}`}}>
                    <div className={'flex justify-between items-start mb-[0.4rem]'}>
                      <div className={'w-[4.1rem] text-[0.4rem] font-bold'}>{item.title}</div>
                      <img src={item.icon} className={'w-[1.4rem] h-[1.4rem]'} alt="" />
                    </div>
                    <div className={'text-[0.18rem] leading-[0.24rem]'}>{item.content}</div>
                  </div>
                </>
              })
            }
          </div>
        </div>
      </div>
    </InvestStyle>
  )
}
