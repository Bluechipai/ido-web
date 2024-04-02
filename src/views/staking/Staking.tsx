import {useTranslation} from 'react-i18next'
import {DataLabel, DataTile, StakingContentStyle, StakingDesc, StakingStyle, StakingTitle} from './Staking.style'
import Footer from '../../components/footer/Footer.tsx'
import {FlexCol, FlexRow, FlexSb} from '../../components/flex/Flex.tsx'
import {useEffect, useMemo, useRef, useState} from 'react'
import DecimalTool from '../../utils/DecimalTool.ts'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import {awaitWrap, fixedNumberStr, formatNumber} from '../../utils/tools.ts'
import {useAppSelector} from '../../store'
import {divDecimals} from '../../contract/wallet.ts'
import {BigNumber} from 'ethers'
import Pools from './Pools.tsx'
import RewardPools, {IRewardExportFunction} from './RewardPools.tsx'
import {tokenPrecision} from '../../config.ts'

export type IPoolItem = {
  planId?: number
  logoURL: string
  name: string
  radio: string
  days: string | undefined
  staked: string
  isFixed: boolean
  decimals: number
}
export default function Staking() {
  const {t} = useTranslation()
  const userStore = useAppSelector((state) => state.users)
  const {NewReadContract, project, getTokenBalance} = usePluginModel()
  const [totalStaked, setTotalStaked] = useState('')
  const [fixedTotal, setFixedTotal] = useState([])
  const [liveTotal, setLiveTotal] = useState([])
  const [radio, setRadio] = useState(0)
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const childRef = useRef<IRewardExportFunction>();
  const poolsRef = useRef<IRewardExportFunction>();

  const usdtDecimal = useMemo(() => {
    return userStore.supportTokens[project.contracts.USDT.address]
  }, [userStore.supportTokens])
  const chipDecimal = useMemo(() => {
    return userStore.supportTokens[project.contracts.Chip.address]
  }, [userStore.supportTokens])

  useEffect(() => {
    if (usdtDecimal) {
      getTokenRadio();
    }
  }, [usdtDecimal])
  useEffect(() => {
    getTotalStaked()
  }, [chipDecimal])
  useEffect(() => {
    getUserData()
  }, [userStore.address, chipDecimal])

  async function getUserData() {
    if (userStore.address && chipDecimal) {
      getFixedTotal()
      getLiveTotal()
      getBalance()
    }
  }
  async function getTotalStaked() {
    if (!chipDecimal) {
      return;
    }
    const contract = NewReadContract(project.contracts.Staking.address, project.contracts.Staking.abi);
    const [resData] = await awaitWrap(contract.sTotal())
    const stakedAmount = divDecimals(resData, chipDecimal).toFixed(tokenPrecision, 1)
    setTotalStaked(Number(stakedAmount).toString())
  }
  async function getTokenRadio() {
    const contract = NewReadContract(project.contracts.IDOSetting.address, project.contracts.IDOSetting.abi);
    const [amount] = await awaitWrap(contract.getPrice(project.contracts.Chip.address));
    setRadio(divDecimals(amount[0], usdtDecimal).toNumber())
  }
  async function getBalance() {
    const [tokenBalance] = await awaitWrap(getTokenBalance(userStore.address, project.contracts.Chip.address));
    if (tokenBalance) {
      setBalance(tokenBalance)
    }
  }
  async function getFixedTotal() {
    const contract = NewReadContract(project.contracts.Staking.address, project.contracts.Staking.abi);
    const [resData] = await awaitWrap(contract.getFixedTotal(userStore.address))
    setFixedTotal(resData.map((item: BigNumber) => {
      return divDecimals(item, chipDecimal).toFixed(chipDecimal, 1)
    }))
  }

  async function getLiveTotal() {
    const contract = NewReadContract(project.contracts.Staking.address, project.contracts.Staking.abi);
    const [resData] = await awaitWrap(contract.getLiveTotal(userStore.address))
    setLiveTotal(resData.map((item: BigNumber) => {
      return divDecimals(item, chipDecimal).toFixed(chipDecimal, 1)
    }))
  }
  /*YOUR STAKE*/
  const userStakedAmount = useMemo(() => {
    return DecimalTool.add(fixedTotal[0], liveTotal[0]).toFixed(tokenPrecision, 1)
  }, [fixedTotal, liveTotal])
  /*YOUR TOTAL REWARDS*/
  const userRewardsAmount = useMemo(() => {
    return DecimalTool.add(fixedTotal[1], liveTotal[1]).toFixed(tokenPrecision, 1)
  }, [fixedTotal, liveTotal])

  return (
    <div>
      <StakingStyle>
        <StakingContentStyle>
          <FlexCol style={{alignItems: 'flex-start'}}>
            <StakingTitle>{t(`staking`)}</StakingTitle>
            <StakingDesc>{t(`We offer flexible and fixed-term staking options. With flexible staking, daily yield adjustments keep up with market changes. Or, lock tokens for fixed periods to secure guaranteed returns.`)}</StakingDesc>
            <FlexSb style={{width: '100%'}}>
              <FlexCol>
                <DataTile>{totalStaked ? `${formatNumber(totalStaked)} CHIP` : '-'}</DataTile>
                <DataLabel>{t(`TOTAL CHIP STAKED`)}</DataLabel>
              </FlexCol>
              <FlexCol>
                <DataTile>{totalStaked ? `${formatNumber(DecimalTool.mul(totalStaked, radio).toFixedZero(tokenPrecision, 1))} USD` : '-'} </DataTile>
                <DataLabel>{t(`TOTAL VALUE LOCKED`)}</DataLabel>
              </FlexCol>
              <FlexCol>
                <DataTile>
                  <FlexRow>
                    <span>{formatNumber(userStakedAmount)} CHIP /</span>
                    <DataLabel>$ {DecimalTool.mul(userStakedAmount, radio).toFixedZero(tokenPrecision, 1)}</DataLabel>
                  </FlexRow>
                </DataTile>
                <DataLabel>{t(`YOUR STAKE`)}</DataLabel>
              </FlexCol>
              <FlexCol>
                <DataTile>
                  <FlexRow>
                    <span>{formatNumber(userRewardsAmount)} CHIP /</span>
                    <DataLabel>$ {DecimalTool.mul(userRewardsAmount, radio).toFixedZero(tokenPrecision, 1)}</DataLabel>
                  </FlexRow>
                </DataTile>
                <DataLabel>{t(`YOUR TOTAL REWARDS`)}</DataLabel>
              </FlexCol>
              <FlexCol>
                <DataTile>{balance ? `${formatNumber(fixedNumberStr(balance, tokenPrecision))}` : '-'}</DataTile>
                <DataLabel>{t(`CHIP BALANCE`)}</DataLabel>
              </FlexCol>
            </FlexSb>
          </FlexCol>
          <div className={'mt-[1rem] min-h-[1.2rem]'}>
            <RewardPools
              childRef={childRef}
              reload={() => {
                getUserData()
                getTotalStaked()
                poolsRef.current?.loadData()
              }} />
          </div>
          <Pools
            childRef={poolsRef}
            reload={() => {
              getUserData()
              getTotalStaked()
              childRef.current?.loadData()
            }} />
        </StakingContentStyle>
      </StakingStyle>
      <Footer />
    </div>
  )
}
