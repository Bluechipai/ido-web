import Modal from 'src/components/modal/Modal.tsx'
import {useTranslation} from 'react-i18next'
import ModalFooter from 'src/components/modal/ModalFooter.tsx'
import {IOpenModal} from 'src/components/ModalContext/ModalContext.tsx'
import useApprove from 'src/hooks/useApprove.ts'
import {project} from 'src/contract/config.ts'
import {useEffect, useMemo, useState} from 'react'
import {awaitWrap, formatUSDT, isGreaterThan, isLessThan} from 'src/utils/tools.ts'
import {divDecimals, getInput} from 'src/contract/wallet.ts'
import {usePluginModel} from 'src/hooks/usePluginModel.ts'
import {useMessage} from 'src/hooks/useMessage.ts'
import {IPlat} from 'src/api/system.tsx'
import useWidthChange from 'src/hooks/useWidthChange.ts'
import InputNumber from 'src/components/form/InputNumber.tsx'
import DecimalTool from 'src/utils/DecimalTool.ts'
import {useAppSelector} from 'src/store'
import {ArrayElementType} from '../utils/types.ts'
import DropDown from './dropDown/DropDown.tsx'
import {useTokens} from '../hooks/useTokens.tsx'
import {FlexRow} from './flex/Flex.tsx'
import {LoadingDot} from './loadingDot/LoadingDot.tsx'
import SvgIcon from './svgIocn/SvgIcon.tsx'
import {dropdownIcon} from '../utils/svgManage.ts'

export type IBuyModal = {
  onClose?(): void
  onSuccess?(): void
  launchpadData: IPlat
}
export default function BuyModal(props: IBuyModal & IOpenModal) {
  const {t} = useTranslation()
  const {showMessage} = useMessage()
  const {isH5} = useWidthChange()
  const userStore = useAppSelector((state) => state.users)
  const {NewWriteContract, checkHashStatus, NewReadContract, getTokenBalance} =
    usePluginModel()
  const tokens = useTokens();
  const [currentToken, setToken] = useState(tokens[0])
  const [loading2, setLoading2] = useState(false)
  const [balanceLoading, setBalanceLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [userPledge, setUserPledge] = useState('0')
  const [balance, setBalance] = useState('')
  const {approveToken, approveStatus, loading} = useApprove({
    tokenAddress: '',
    spenderAddress: project.contracts.IDO.address,
  })

  const USDTDecimal = useMemo(() => {
    return userStore.supportTokens[project.contracts.USDT.address]
  }, [userStore.supportTokens])

  useEffect(() => {
    if (userStore.address && USDTDecimal) {
      getBalance()
      getUserPledgeAmount()
    }
  }, [userStore.address, currentToken.address, USDTDecimal])
  useEffect(() => {
    setToken(tokens[0])
  }, [tokens])

  async function getBalance() {
    setBalanceLoading(true)
    const [tokenBalance] = await awaitWrap(
      getTokenBalance(userStore.address, currentToken.address)
    )
    setBalanceLoading(false)
    if (tokenBalance) {
      setBalance(tokenBalance)
    }
  }
  async function getUserPledgeAmount() {
    if (!props.launchpadData?.fundraisingNo || !userStore.address) {
      return
    }
    const contract = NewReadContract(
      project.contracts.IDO.address,
      project.contracts.IDO.abi
    )
    const [resData] = await awaitWrap(
      contract.utsInfos(
        props.launchpadData?.fundraisingNo,
        userStore.address
      )
    )
    if (resData) {
      setUserPledge(
        divDecimals(resData[0], USDTDecimal).toString()
      )
    }
  }

  const maxAmount = useMemo(() => {
    const subAmount = DecimalTool.sub(
      props.launchpadData?.maxAmount || 0,
      userPledge
    ).toFixed()
    if (isGreaterThan(subAmount, balance)) {
      return balance
    } else {
      return subAmount
    }
  }, [userPledge, balance, props.launchpadData])

  async function submit() {
    if (!props.launchpadData || !amount) {
      return
    }
    if (isGreaterThan(amount, maxAmount)) {
      showMessage(
        t(`Exceeds the maximum subscription quantity`) + `: ${maxAmount}`
      )
      return
    }
    if (isLessThan(amount, props.launchpadData.minAmount)) {
      showMessage(
        t(`Less than the minimum subscription quantity`) +
          `: ${props.launchpadData.minAmount}`
      )
      return
    }
    setLoading2(true)
    const contract = NewWriteContract(
      project.contracts.IDO.address,
      project.contracts.IDO.abi
    )
    const [transData, error] = await awaitWrap(
      contract.subscribe(
        props.launchpadData?.fundraisingNo,
        currentToken.address,
        getInput(amount, currentToken.decimal)
      )
    )
    setLoading2(false)
    if (transData) {
      await checkHashStatus(transData)
      showMessage(t(`Successfully subscribed`))
      props.onSuccess?.()
      props.destoryComponent()
    } else {
      console.log(error)
      showMessage(
        (error.data && error.data.message) || error.message || 'error'
      )
    }
  }

  useEffect(() => {
    console.log(isH5)
  }, [isH5])

  return (
    <Modal
      title={t(`Subscription`)}
      isH5={isH5}
      close={props.destoryComponent}>
      <div className={'mt-[0.4rem] child-n-l:mb-[0.4rem] md:mt-0'}>
        <div className={''}>
          <div>
            <div className={'mb-[0.12rem] text-[0.16rem] font-bold'}>{t(`Subscription token`)}</div>
            <div style={{border: '0.01rem solid rgba(0, 0, 0, 0.10)', padding: '0.06rem 0.12rem', background: '#fff', borderRadius: '0.08rem'}}>
              <DropDown
                triggerStyle={{width: '100%', paddingBottom: '0'}}
                menuStyle={{width: '105%', bottom: '-0.08rem'}}
                options={tokens}
                icon={<SvgIcon dangerouslySetInnerHTML={dropdownIcon} width={'0.24rem'} fillColor={'rgba(0,0,0,0.57)'} />}
                onChange={(selectd: ArrayElementType<typeof tokens>) => {
                  setAmount('')
                  setToken(selectd)
                }}
              />
            </div>
          </div>
          <div className={'mt-[0.08rem] mb-[0.24rem] flex justify-between text-[rgba(0,0,0,0.57)]'}>
            {/*<div>Subscription: {userPledge}</div>*/}
            <FlexRow>
              <span style={{marginRight: '0.04rem'}}>balance: </span>
              { balanceLoading
                ? <div className={'mt-[0.02rem]'}><LoadingDot /></div>
                : <span>{formatUSDT(balance)} {currentToken.text}</span>
              }
            </FlexRow>
          </div>
          <div className={'mb-[0.12rem] text-[0.16rem] font-bold'}>{t(`Subscription amount`)}</div>
          <InputNumber
            isH5={isH5}
            placeholder={t(`Please enter the amount`)}
            onChange={(value) => setAmount(value)}
          />
        </div>
        <ModalFooter
          onCancel={props.destoryComponent}
          loading={loading || loading2}
          confirmText={!approveStatus ? 'Approve' : ''}
          onConfirm={() => {
            if (approveStatus) {
              submit()
            } else {
              approveToken()
            }
          }}
        />
      </div>
    </Modal>
  )
}
