import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import placementBg from 'src/assets/img/home/placementBg.png'
// import placement_item_1 from 'src/assets/img/home/placement_item_1.png';
// import placement_item_2 from 'src/assets/img/home/placement_item_2.png';
import {FlexRow} from '../../components/flex/Flex.tsx'
import SvgIcon from '../../components/svgIocn/SvgIcon.tsx'
import Process from '../../components/process/Process.tsx'
import {IPlat, useQueryPrivateList} from '../../api/system.tsx'
import {formatDate} from '../../utils/tools.ts'
import DecimalTool from '../../utils/DecimalTool.ts'
import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {EllipsisText, MulEllipsisText} from '../../global.style.ts'
import questionImg from '../../assets/img/questionImg.png'
import {questionIcon} from '../../utils/svgManage.ts'
import Tooltip from '../../components/tooltip/Tooltip.tsx'
import MoreArrow from '../../components/moreArrow/MoreArrow.tsx'
import LinerButton from '../../components/linerButton/LinerButton.tsx'

export const PlacementStyle = styled.div`
    width: 100vw;
    position: relative;
    background: url(${placementBg}) no-repeat;
    background-size: cover;
`
const PlacementItemStyle = styled.div`
    position: relative;
    min-height: 6rem;
    width: 4.4rem;
    padding: 0.48rem 0.4rem 0.4rem;
    border-radius: 0.28rem;
    flex-shrink: 0;
`
export default function Placement() {
  const {t} = useTranslation()
  const navigator = useNavigate();
  const {data} = useQueryPrivateList({
    page: 1,
    pageSize: 10,
  })

  return (
    <PlacementStyle className={'pl-[1.68rem] py-[1.28rem]'}>
      <div className={'mb-[1.68rem] text-[0.96rem] font-medium futura'}>
        <div className={'uppercase mb-[0.16rem]'}>{t(`private`)}</div>
        <div className={'uppercase'}>{t(`Placement`)}</div>
      </div>
      <div>
        <div
          className={'mb-[0.24rem] text-[rgba(255,255,255,0.64)]'}>{t(`Welcome to the private hunting grounds, hope you find the next bluechip`)}</div>
        <div className={'child:mr-[0.28rem] flex'}>
          {
            data?.list.map((item) => {
              return <PrivateItem item={item} key={item.id} />
            })
          }
        </div>
      </div>
      <MoreArrow
        style={{position: 'absolute', right: '1.68rem', top: '3.08rem', cursor: 'pointer'}}
        onClick={() => {
          navigator(`/launchpad/index?type=${2}`)
        }} />
    </PlacementStyle>
  )
}

type IPrivateItemProps = {
  item: IPlat
}

function PrivateItem(props: IPrivateItemProps) {
  const {t} = useTranslation()
  const navigate = useNavigate()

  const percent = useMemo(() => {
    return DecimalTool.div(props.item.fundedAmount, props.item.project.quantity).mul(100).toFixedZero(2, 1)
  }, [props.item])

  return <PlacementItemStyle
    key={props.item.id}
    style={{background: 'linear-gradient(167deg, rgba(255, 255, 255, 0.15) -0.14%, rgba(0, 0, 0, 0.20) 98.39%)'}}>
    <EllipsisText
      className={'PlusJakartaSans-SemiBold uppercase mb-[0.12rem] text-[0.4rem] text-[#fff]'}>{props.item.project.projName}</EllipsisText>
    <div
      className={'inline-block border border-[#fff] rounded-[1rem] pl-[0.12rem] pr-[0.09rem] leading-[0.28rem] text-[#fff] font-medium'}>{props.item.project.network}</div>
    <MulEllipsisText row={5} className={'mt-[0.48rem] min-h-[0.9rem]'}>
      {t(`Animalia is an independent, free online NFT collectible 
        card game that features crypto inspired memes and gems. With the support of ETH and BNB chains, 
        Animalia gives you complete ownership of your in-game collectibles. Collect...`)}
    </MulEllipsisText>
    <div className={'flex justify-between mt-[0.72rem]'}>
      <div className={'flex flex-col'}>
        <FlexRow>
          <span className={'mr-[0.06rem] font-medium text-[rgba(255, 255, 255, 0.4)]'}>{t(`Award`)}</span>
          <Tooltip
            isH5={false}
            icon={
              <img
                src={questionImg}
                className={'w-[0.14rem] h-[0.14rem]'}
                alt={''}
              />
            }
            calc_top={10}>
            <div>
              <FlexRow className={'mb-[0.16rem]'}>
                <SvgIcon
                  dangerouslySetInnerHTML={questionIcon}
                />
                <span className={'ml-[0.04rem] font-bold'}>{t(`Award`)}</span>
              </FlexRow>
              <div className={'w-[2.78rem] text-subtitle_light dark:text-subtitle leading-[0.2rem]'}>
                <div>
                  {t(`1. If financing is successful, there will be no platform token reward;`)}
                </div>
                <div>
                  {t(`2. If financing fails, the platform will reward the platform with a Chip token reward`)}
                </div>
              </div>
            </div>
          </Tooltip>
        </FlexRow>
        <span className={'PlusJakartaSans-SemiBold text-[0.2rem] mt-[0.12rem]'}>{props.item.pledgeReward}%</span>
      </div>
      <div className={'flex flex-col'}>
        <FlexRow>
          <span className={'mr-[0.06rem] font-medium text-[rgba(255, 255, 255, 0.4)]'}>{t(`Price`)}</span>
        </FlexRow>
        <span className={'PlusJakartaSans-SemiBold text-[0.2rem] mt-[0.12rem]'}>{props.item.subscribePrice} USDT</span>
      </div>
      <div className={'flex flex-col'}>
        <FlexRow>
          <span className={'mr-[0.06rem] font-medium text-[rgba(255, 255, 255, 0.4)]'}>{t(`Time To Market`)}</span>
        </FlexRow>
        <span
          className={'PlusJakartaSans-SemiBold text-[0.2rem] mt-[0.12rem]'}>{formatDate(props.item.createdAt, 'yyyy-MM-dd')}</span>
      </div>
    </div>
    <div className={'mt-[0.4rem]'}>
      <div className={'mb-[0.08rem] flex justify-between PlusJakartaSans-Medium'}>
        <span>{props.item.fundedAmount}/{props.item.project.quantity} USDT</span>
        <span>{percent}%</span>
      </div>
      <Process percent={Number(percent)} />
      <div className={'flex justify-end mt-[0.42rem]'}>
        <LinerButton
          width={152}
          height={40}
          radius={40}
          percent={0.5}
          style={{fontSize: '0.18rem', marginRight: 0}}
          onClick={() => navigate(`/fund/${props.item.id}`)}>{t(`Launchpad`)}</LinerButton>
      </div>
    </div>
  </PlacementItemStyle>
}
