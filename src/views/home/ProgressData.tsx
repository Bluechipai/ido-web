import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import placementBg from 'src/assets/img/home/placementBg.avif'
import Progress from '../launchpad/Progress.tsx'
import {useNavigate} from 'react-router-dom'
import {IFundType} from '../../utils/types.ts'
import MoreArrow from '../../components/moreArrow/MoreArrow.tsx'

export const PlacementStyle = styled.div`
    width: 100vw;
    position: relative;
    background: url(${placementBg}) no-repeat;
    background-size: cover;
`;
export default function ProgressData() {
  const {t} = useTranslation()
  const navigator = useNavigate();

  return (
    <PlacementStyle className={'py-[1.28rem]'}>
      <div className={'w-[15.84rem] mx-auto mb-[1.68rem] text-[0.96rem] font-medium futura'}>
        <div className={'uppercase mb-[0.16rem]'}>{t(`Launchpad`)}</div>
        <div className={'uppercase'}>{t(`in progress`)}</div>
      </div>
      <MoreArrow
        style={{position: 'absolute', right: '1.68rem', top: '3.08rem', cursor: 'pointer'}}
        onClick={() => {
          navigator(`/launchpad/index?type=${1}`)
        }} />
      <div className={'w-[15.84rem] mx-auto'}>
        <Progress
          fundType={IFundType.Public}
          isGrid={false}
          state={1}
          listLen={undefined}
          hidePagination={true}
        />
      </div>
    </PlacementStyle>
  )
}
