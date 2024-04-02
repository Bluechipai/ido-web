import {useQueryUserStakeWithdrawRecord} from '../../api/user.ts'
import {IStakeStatus} from './History.tsx'
import RewardPools from '../staking/RewardPools.tsx'
import React, {useEffect, useMemo} from 'react'
import ResponsiveTable, {IResponsiveTableColumns} from '../../components/table/ResponsiveTable.tsx'
import {FlexCol} from '../../components/flex/Flex.tsx'
import {useTranslation} from 'react-i18next'
import {useAppSelector} from '../../store'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import chipIcon from 'src/assets/img/chip.png';
import DecimalTool from '../../utils/DecimalTool.ts'
import {divDecimals} from '../../contract/wallet.ts'

type IProps = {
  status: IStakeStatus
}
export default function StakeList(props: IProps) {

  return (
    <div>
      {
        props.status === IStakeStatus.Ongoing
          ? <RewardPools
              reload={() => {

              }} />
          : <StakeWithdrawRecord />
      }
    </div>
  )
}


function StakeWithdrawRecord() {
  const {t, i18n} = useTranslation()
  const {project} = usePluginModel()
  const userStore = useAppSelector((state) => state.users)
  const {data, queryClient} = useQueryUserStakeWithdrawRecord()

  const chipDecimal = useMemo(() => {
    return userStore.supportTokens[project.contracts.Chip.address]
  }, [userStore.supportTokens])

  const columns = useMemo<IResponsiveTableColumns[]>(() => {
    return [
      {
        text: <div className={''}>{t(`Project Name`)}</div>,
        field: 'project.projName',
        className: 'text-left pl-[0.24rem] w-[1.6rem]',
        render(item: any): React.ReactNode {
          return (
            <div className={'flex items-center border-inherit'}>
              <img
                src={item.logoURL}
                className={'mr-[0.1rem] h-[0.88rem] w-[0.88rem] rounded-[50%]'}
                alt=""
              />
            </div>
          )
        },
      },
      {
        text: <div className={''}>{t(`Pools`)}</div>,
        field: 'name',
        className: 'text-left pl-[0.24rem]'
      },
      {
        text: <div className={''}>{t(`Yield`)}</div>,
        field: 'Yield',
        className: 'text-left pl-[0.24rem]',
        render(item: any): React.ReactNode {
          return (
            <FlexCol>
              <span style={{fontSize: '0.18rem', fontWeight: 700}}>{item.radio}%</span>
              <span className={'auxiliary'}>Compounding</span>
            </FlexCol>
          )
        },
      },
      {
        text: <div className={''}>{t(`Period`)}</div>,
        field: 'Yield',
        className: 'text-left pl-[0.24rem]',
        render(item: any): React.ReactNode {
          return (
            <FlexCol>
              <span style={{fontSize: '0.18rem', fontWeight: 700}}>{item.isFixed ? item.days : 'Flexible'}</span>
              <span className={'auxiliary'}>Days</span>
            </FlexCol>
          )
        },
      },
      {
        text: t(`Staked`),
        field: 'staked',
        className: 'text-left pl-[0.24rem]'
      },
      {
        text: t(`reward`),
        field: 'reward',
        className: 'text-left pl-[0.24rem]'
      },
      {
        text: '',
        field: '',
        className: 'w-[1.74rem] pr-[0.2rem] text-center',
        render(): React.ReactNode {
          return <div className={'text-[0.18rem] font-bold'}>{t(`Completed`)}</div>
        },
      },
    ]
  }, [i18n.language, chipDecimal, queryClient.refetch])

  const tableData = useMemo(() => {
    return data?.data?.map((item) => {
      return {
        planId: item.id,
        logoURL: chipIcon,
        name: 'CHIP',
        radio: DecimalTool.div(item.ratio, 100).toFixedZero(2, 1),
        days: item.day || undefined,
        staked: divDecimals(item.amount, chipDecimal).toFixed(),
        reward: divDecimals(item.interest, chipDecimal).toFixed(),
        isFixed: item.day !== 0,
        decimals: chipDecimal,
      }
    });
  }, [data]);

  useEffect(() => {
    console.log(data)
  }, [])
  return <div className={'mt-[0.64rem]'}>
    <ResponsiveTable
      data={tableData}
      rowClassName={'h-[0.64rem]'}
      columns={columns}
    />
  </div>
}
