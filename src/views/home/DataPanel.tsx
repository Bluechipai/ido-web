import {FlexRow} from '../../components/flex/Flex.tsx'
import {useTranslation} from 'react-i18next'
import usdImg from 'src/assets/img/usImg.png';
import projectImg from 'src/assets/img/project.png';
import userImg from 'src/assets/img/user.png';
import {useQueryStatistic} from '../../api/system.tsx'
import {useMemo} from 'react'
import { bytesToSize } from 'src/utils/tools.ts';

type IDataColumns = {
  label: string
  field: 'projects' | 'persons' | 'quantity'
  prefix: string
  suffix: string
  icon: string
}

export default function DataPanel() {
  const {t, i18n} = useTranslation()
  const {data} = useQueryStatistic()

  const dataColumns: IDataColumns[] = useMemo(() => {
    return [
      {
        label: t(`Raised Capital`),
        field: 'quantity',
        prefix: '$',
        suffix: '',
        icon: usdImg,
      },
      {
        label: t(`Launched projects`),
        field: 'projects',
        prefix: '',
        suffix: '',
        icon: projectImg
      },
      {
        label: t(`Unique Participants`),
        field: 'persons',
        prefix: '',
        suffix: '',
        icon: userImg
      },
    ]
  }, [i18n.language])

  return (
    <div className={'h-[1.68rem] px-[1.68rem] grid grid-cols-3 text-[#080808]'}
         style={{background: 'linear-gradient(90deg, #94EFFF 4.22%, #FFF0B2 99%)'}}>
      {
        dataColumns.map((item, index) => {
          const itemContent = data
            ? `${item.prefix}${bytesToSize(data?.[item.field])}${item.suffix}`
            : '-'
          const isLast = index === dataColumns.length - 1;
          return <div key={index} className={'flex flex-col justify-center items-center'} style={!isLast ? {borderRight: '0.01rem solid #000'} : {}}>
            <span className={'futura text-[0.56rem] font-medium'}>{itemContent}</span>
            <FlexRow className={'mt-[0.16rem]'}>
              <img src={item.icon} className={'w-[0.28rem] h-[0.28rem]'} alt="" />
              <span
                className={'uppercase ml-[0.12rem] text-[0.2rem] font-bold PlusJakartaSans-SemiBold'}>{item.label}</span>
            </FlexRow>
          </div>
        })
      }
    </div>
  )
}

