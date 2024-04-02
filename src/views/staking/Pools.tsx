import {useTranslation} from 'react-i18next'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import React, {MutableRefObject, useEffect, useImperativeHandle, useMemo, useState} from 'react'
import {awaitWrap} from '../../utils/tools.ts'
import {useAppSelector} from '../../store'
import DecimalTool from '../../utils/DecimalTool.ts'
import {divDecimals} from '../../contract/wallet.ts'
import chipIcon from 'src/assets/img/chip.png';
import ResponsiveTable, {IResponsiveTableColumns} from '../../components/table/ResponsiveTable.tsx'
import {FlexCol} from '../../components/flex/Flex.tsx'
import StakingModal, {IStakingModal} from './StakingModal.tsx'
import useModal from '../../hooks/useModal.ts'
import {IPoolItem} from './Staking.tsx'
import ChipIcon from '../../components/ChipIcon.tsx'
import {useMessage} from '../../hooks/useMessage.ts'
import LinerButton from '../../components/linerButton/LinerButton.tsx'

export type IPoolExportFunction = {
  loadData(): void
}
type IProps = {
  reload?(): void
  childRef?: MutableRefObject<IPoolExportFunction | undefined>
}
export default function Pools(props: IProps) {
  const {t, i18n} = useTranslation()
  const userStore = useAppSelector((state) => state.users)
  const {NewReadContract, project} = usePluginModel()
  const {openModal} = useModal()
  const {showMessage} = useMessage()
  const [fixedData, setFixedData] = useState<IPoolItem[]>([])
  const [liveData, setLiveData] = useState<IPoolItem[]>([])

  const chipDecimal = useMemo(() => {
    return userStore.supportTokens[project.contracts.Chip.address]
  }, [userStore.supportTokens])

  useImperativeHandle(
    props?.childRef,
    () => ({
      loadData: () => {
        loadData();
      }
    }),
    [chipDecimal, userStore.address],
  );

  useEffect(() => {
    loadData();
  }, [chipDecimal])

  function loadData() {
    if (chipDecimal) {
      getPeriodicPoolData()
      getLivePoolData()
    }
  }
  async function getLivePoolData() {
    const contract = NewReadContract(project.contracts.Staking.address, project.contracts.Staking.abi);
    const [resData] = await awaitWrap(Promise.all([
      contract.liveRatio(),
      contract.lTotal()
    ]))
    if (resData) {
      const fixedInfo: IPoolItem = {
        logoURL: chipIcon,
        name: 'CHIP',
        radio: DecimalTool.div(resData[0].toString(), 100).toFixedZero(2, 1),
        days: undefined,
        staked: divDecimals(resData[1], chipDecimal).toFixed(),
        isFixed: false,
        decimals: chipDecimal
      }
      setLiveData([fixedInfo])
    }
  }
  async function getPeriodicPoolData() {
    const contract = NewReadContract(project.contracts.Staking.address, project.contracts.Staking.abi);
    const [resData] = await awaitWrap(contract.currPlanId())

    const maxId = resData.toNumber();
    const reqs = []
    const reqFTotals = []
    for (let i = 0; i < maxId; i++) {
      reqs.push(contract.plans(i))
      reqFTotals.push(contract.fTotals(i))
    }
    const [planDataArr] = await awaitWrap(Promise.all(reqs))
    const [fTotalsArr] = await awaitWrap(Promise.all(reqFTotals))
    if (planDataArr && fTotalsArr) {
      const arr = fixedData.concat()
      planDataArr.forEach((item: any, index: number) => {
        const planInfo = {
          planId: index,
          logoURL: chipIcon,
          name: 'CHIP',
          radio: DecimalTool.div(item[1].toString(), 100).toFixedZero(2, 1),
          days: item[0].toString(),
          staked: divDecimals(fTotalsArr[index], chipDecimal).toFixed(),
          isFixed: true,
          decimals: chipDecimal
        }
        arr.push(planInfo)
      })
      setFixedData(arr)
    }
  }

  const columns = useMemo<IResponsiveTableColumns[]>(() => {
    return [
      {
        text: <div className={''}>{t(`Project Name`)}</div>,
        field: 'project.projName',
        className: 'text-left pl-[0.24rem] w-[1.6rem]',
        render(): React.ReactNode {
          return (
            <div className={'flex items-center border-inherit'}>
              {/*<img
                src={item.logoURL}
                className={'mr-[0.1rem] h-[0.88rem] w-[0.88rem] rounded-[50%]'}
                alt=""
              />*/}
              <ChipIcon className={'mr-[0.1rem] h-[0.88rem] w-[0.88rem] rounded-[50%]'} />
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
              <span style={{fontSize: '0.18rem', fontWeight: 700}}>{ item.isFixed ? item.days : 'Flexible' }</span>
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
        text: '',
        field: '',
        className: 'w-[1.74rem] pr-[0.2rem] text-center',
        render(item: any): React.ReactNode {
          return <LinerButton
            width={104}
            height={40}
            radius={40}
            percent={0.5}
            disabled={false}
            onClick={() => {
              if (!userStore.address) {
                showMessage(t(`Please connect wallet`))
                return
              }
              openModal<IStakingModal>(StakingModal, {
                poolData: item,
                onSuccess() {
                  loadData()
                  props.reload?.()
                }
              })
            }}>{t(`Stake`)}</LinerButton>
        },
      },
    ]
  }, [i18n.language, chipDecimal, props.reload, userStore.address])

  return (
    <div className={'mt-[0.64rem]'}>
      <ResponsiveTable
        data={liveData.concat(fixedData)}
        rowClassName={'h-[0.64rem]'}
        columns={columns}
      />
    </div>
  )
}
