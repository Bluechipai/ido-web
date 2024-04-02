import {useTranslation} from 'react-i18next'
import {
  BalanceBox,
  BalanceItem,
  BalanceSplit, CloseButton,
  FieldBox,
  Subtitle,
  Title,
  UserPanelStyle,
} from './UserPanel.style'
import {FlexCol, FlexRow, FlexSb} from '../flex/Flex.tsx'
import metaMaskIcon from 'src/assets/img/metaMask.png'
import chipIcon from 'src/assets/img/chip.png';
import usdtIcon from 'src/assets/img/usdt.png';
import questionImg from 'src/assets/img/question2.png';
import user_close from 'src/assets/img/user_close.png';
import ResponsiveTable, {IResponsiveTableColumns} from '../table/ResponsiveTable.tsx'
import React, {useEffect, useMemo, useState} from 'react'
import {IPlat} from '../../api/system.tsx'
import {useAppSelector} from '../../store'
import {awaitWrap, fixedNumberStr, formatAddress, formatUSDT} from '../../utils/tools.ts'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import {useQueryUserFundList} from '../../api/user.ts'
import {divDecimals} from '../../contract/wallet.ts'
import {useNavigate} from 'react-router-dom'
import {IFundType} from '../../utils/types.ts'
import Tooltip from '../tooltip/Tooltip.tsx'
import {tokenPrecision} from '../../config.ts'
import DecimalTool from '../../utils/DecimalTool.ts'
import {Decimal} from 'decimal.js'
import LinerButton from '../linerButton/LinerButton.tsx'


type IProps = {
  active?: boolean
  onClose(): void
}
type ILevelResInfo = {
  contactFunc: string,
  level: number,
  minQuantity: number,
  maxQuantity: number,
  fee: string
}
export default function UserPanel(props: IProps) {
  const {t, i18n} = useTranslation()
  const {getTokenBalance, project, NewReadContract} = usePluginModel()
  const userStore = useAppSelector((state) => state.users)
  const navigator = useNavigate()
  const [chipBalance, setChipBalance] = useState<number | undefined>()
  const [usdtBalance, setUsdtBalance] = useState<number | undefined>()
  const [level, setLevel] = useState('0')
  const [totalInvested, setTotalInvested] = useState('')
  const [usdtFee, setUsdtFee] = useState('')
  const [leveResArr, setLeveResArr] = useState<ILevelResInfo[]>([])

  const [listData, setListData] = useState<IPlat[]>([])
  const {data, isPending, queryClient} = useQueryUserFundList({
    page: 1,
    pageSize: 6,
    financingStatus: 0,
    fundType: IFundType.Private,
    user: userStore.address
  })

  const usdtDecimals = useMemo(() => {
    return userStore.supportTokens[project.contracts.USDT.address]
  }, [userStore.supportTokens, project])

  useEffect(() => {
    if (props.active) {
      queryClient.refetch()
      initData()
    }
  }, [userStore.address, props.active, usdtDecimals])

  useEffect(() => {
    if (!isPending && data) {
      setListData(data.list)
    }
  }, [isPending, data])

  useEffect(() => {
    getPublicSetting()
  }, [])

  function initData() {
    getUserLevel()
    getWalletBalance()
    getUserLevel()
  }

  async function getUserLevel(){
    const contract = NewReadContract(project.contracts.IDO.address, project.contracts.IDO.abi)
    const [amount] = await awaitWrap(contract.lvAmts(userStore.address))
    setTotalInvested(divDecimals(amount, usdtDecimals).toFixed())
    const contract2 = NewReadContract(project.contracts.IDOSetting.address, project.contracts.IDOSetting.abi)
    const [levelData] = await awaitWrap(contract2.lvLevel(amount))
    setLevel(levelData)
  }
  async function getWalletBalance() {
    const [resData] = await awaitWrap(Promise.all([
      getTokenBalance(userStore.address, project.contracts.Chip.address),
      getTokenBalance(userStore.address, project.contracts.USDT.address)
    ]))
    if (resData) {
      setChipBalance(resData[0])
      setUsdtBalance(resData[1])
    }
  }
  function getPublicSetting() {
    getUSDTFee();
    getLevelData();
  }

  async function getUSDTFee() {
    const contract = NewReadContract(project.contracts.IDOSetting.address, project.contracts.IDOSetting.abi);
    const [resData] = await awaitWrap(contract.pubFixed());
    setUsdtFee(DecimalTool.div(resData.toString(), 100).toFixed())
  }

  async function getLevelData() {
    const contract = NewReadContract(project.contracts.IDOSetting.address, project.contracts.IDOSetting.abi);
    const reqs = [
      contract.pubTOutFee(),
      contract.publicFee(),
      contract.pubCmsFee(),
      contract.pubFixed(),
      contract.l0Range(),
      contract.lv0(),
      contract.l1Range(),
      contract.lv1(),
      contract.l2Range(),
      contract.lv2(),
      contract.l3Range(),
      contract.lv3(),
      contract.l4Range(),
      contract.lv4(),
      contract.lv5(),
    ]
    const [resData] = await awaitWrap(Promise.all(reqs))
    if (resData) {
      const CHIPSARR = [
        { contactFunc: 'setLv0', level: 0, minQuantity: 0, maxQuantity: Number(resData[4].toString()) - 1, fee: Decimal.div(resData[5].toString(), 100).toFixed() },
        { contactFunc: 'setLv1', level: 1, minQuantity: Number(resData[4].toString()), maxQuantity: Number(resData[6].toString()) - 1, fee: Decimal.div(resData[7].toString(), 100).toFixed() },
        { contactFunc: 'setLv2', level: 2, minQuantity: Number(resData[6].toString()), maxQuantity: Number(resData[8].toString()) - 1, fee: Decimal.div(resData[9].toString(), 100).toFixed() },
        { contactFunc: 'setLv3', level: 3, minQuantity: Number(resData[8].toString()), maxQuantity: Number(resData[10].toString()) - 1, fee: Decimal.div(resData[11].toString(), 100).toFixed() },
        { contactFunc: 'setLv4', level: 4, minQuantity: Number(resData[10].toString()), maxQuantity: Number(resData[12].toString()) - 1, fee: Decimal.div(resData[13].toString(), 100).toFixed() },
        { contactFunc: 'setLv5', level: 5, minQuantity: Number(resData[12].toString()), maxQuantity: Infinity, fee: Decimal.div(resData[14].toString(), 100).toFixed() },
      ];
      setLeveResArr(CHIPSARR)
    }
  }

  const columns = useMemo<IResponsiveTableColumns[]>(() => {
    return [
      {
        text: <div className={'pl-[0.36rem]'}>{t(`Project Name`)}</div>,
        field: 'project.projName',
        className: 'text-left pl-[0.08rem] text-[rgba(0,0,0,0.64)]',
        render(item: any): React.ReactNode {
          return (
            <div className={'flex items-center border-inherit'}>
              <img
                src={item.project.logoUrl}
                className={'mr-[0.08rem] h-[0.32rem] w-[0.32rem] rounded-[50%]'}
                alt=""
              />
              <span className={'text-[0.11rem] font-semibold'}>{item.project.projName}</span>
            </div>
          )
        },
      },
      {
        text: t(`Token Price`),
        field: 'subscribePrice',
        className: 'text-left text-[rgba(0,0,0,0.64)]',
        render(item: any): React.ReactNode {
          return <span>{item.subscribePrice} USDT</span>
        }
      },
      {
        text: t(`Invested`),
        field: 'userFunded',
        className: 'text-left text-[rgba(0,0,0,0.64)]'
      },
      {
        text: t(`Bonus`),
        field: 'userRewards',
        className: 'text-left text-[rgba(0,0,0,0.64)]'
      }
    ]
  }, [i18n.language])

  return (
    <UserPanelStyle active={props.active} onClick={(event) => {
      event.stopPropagation()
    }}>
      <CloseButton onClick={props.onClose}>
        <img src={user_close} style={{width: '0.48rem', height: '0.48rem'}} alt="" />
      </CloseButton>
      <FlexCol>
        <Title>{t(`My Portfolio`)}</Title>
        <FlexRow>
          <img src={metaMaskIcon} style={{width: '0.18rem', height: '0.18rem', marginRight: '0.04rem'}} alt="" />
          <span style={{fontSize: '0.12rem'}}>{formatAddress(userStore.address)}</span>
        </FlexRow>
      </FlexCol>
      <FlexCol>
        <FlexRow style={{marginBottom: '0.16rem'}}>
          <span style={{fontSize: '0.2rem', fontWeight: 700, marginRight: '0.08rem'}}>{t(`Level`)}: </span>
          <span style={{fontSize: '0.2rem', fontWeight: 700, marginRight: '0.16rem'}}>{level}</span>
          <Tooltip
            isH5={false}
            icon={<img src={questionImg} style={{width: '0.24rem', height: '0.24rem'}} alt="" />}
            calc_top={10}>

            <div className={'text-[0.14rem]'}>
              <FlexRow className={'mb-[0.24rem]'}>
                <span>{t(`Level Details:`)}</span>
              </FlexRow>
              <div className={'w-[3rem] text-subtitle_light dark:text-subtitle leading-[0.24rem]'}>
                <div>1. USDT investment fee: {usdtFee ? `${usdtFee}%` : '-'};</div>
                <div>2. Chip investment VIP level rules:</div>
                {
                  leveResArr.map((item, index) => {
                    return <FlexRow key={index}>
                      <span>Level {item.level}: </span>
                      {
                        item.minQuantity === 0
                          ? <span>{`<${formatUSDT(item.maxQuantity)} USDT`}</span>
                          : <span>{formatUSDT(item.minQuantity)} USDT</span>
                      }
                      <span> - {item.fee}% fee</span>
                    </FlexRow>
                  })
                }
              </div>
            </div>
          </Tooltip>
        </FlexRow>
        <FieldBox>
          <span>{t(`Total Invested: `)}</span>
          <span>{`${fixedNumberStr(totalInvested, tokenPrecision)} USDT`}</span>
        </FieldBox>
      </FlexCol>
      <FlexCol>
        <Subtitle style={{marginBottom: '0.16rem'}}>{t(`Balance`)}</Subtitle>
        <BalanceBox>
          <BalanceItem>
            <FlexRow style={{marginBottom: '0.12rem'}}>
              <img src={chipIcon} style={{width: '0.32rem', height: '0.32rem', marginRight: '0.12rem'}} alt="" />
              <span style={{fontSize: '0.24rem', fontWeight: 700}}>CHIP</span>
            </FlexRow>
            <span style={{fontFamily: 'futura', fontSize: '0.24rem', fontWeight: 500}}>{formatUSDT(fixedNumberStr(chipBalance, tokenPrecision))}</span>
          </BalanceItem>
          <BalanceSplit></BalanceSplit>
          <BalanceItem>
            <FlexRow style={{marginBottom: '0.12rem'}}>
              <img src={usdtIcon} style={{width: '0.32rem', height: '0.32rem', marginRight: '0.12rem'}} alt="" />
              <span style={{fontSize: '0.24rem', fontWeight: 700}}>USDT</span>
            </FlexRow>
            <span style={{fontFamily: 'futura', fontSize: '0.24rem', fontWeight: 500}}>{formatUSDT(fixedNumberStr(usdtBalance, tokenPrecision))}</span>
          </BalanceItem>
        </BalanceBox>
      </FlexCol>
      <FlexCol>
        <FlexSb style={{marginBottom: '0.28rem'}}>
          <Subtitle>{t(`History`)}</Subtitle>
          <LinerButton
            width={80}
            height={28}
            radius={40}
            percent={0.3}
            linerStart={80}
            style={{fontSize: '0.14rem'}}
            onClick={() => {
            navigator('/history')
            props.onClose()
          }}>{t(`Details`)}</LinerButton>
        </FlexSb>
        <div
          className={
            'relative min-h-[2rem] overflow-hidden rounded-[0.08rem] bg-box-light bg-no-repeat dark:bg-box dark:bg-box-size dark:shadow-box'
          }>
          <ResponsiveTable
            data={listData}
            rowStyle={{height: '0.48rem'}}
            theadStyle={{height: '0.4rem', color: 'rgba(0,0,0,0.64)'}}
            gap={'0rem'}
            radius={'0.08rem'}
            rowBgColor={'rgba(0, 0, 0, 0.08)'}
            columns={columns}
          />
        </div>
      </FlexCol>
    </UserPanelStyle>
  )
}
