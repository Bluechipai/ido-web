import Modal from '../../components/modal/Modal.tsx'
import {useTranslation} from 'react-i18next'
import ModalFooter from '../../components/modal/ModalFooter.tsx'
import {IOpenModal} from '../ModalContext/ModalContext.tsx'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import {useEffect, useMemo, useState} from 'react'
import {useAppSelector} from '../../store'
import {project} from '../../contract/config.ts'
import {
  awaitWrap,
  formatUSDT,
  isGreaterThan,
  isLessThan,
} from '../../utils/tools.ts'
import useApprove from '../../hooks/useApprove.ts'
import {ILaunchpadDetail} from '../../api/system.tsx'
import {divDecimals, getInput} from '../../contract/wallet.ts'
import {useMessage} from '../../hooks/useMessage.ts'
import useWidthChange from '../../hooks/useWidthChange.ts'
import DecimalTool from '../../utils/DecimalTool.ts'
import InputNumber from '../form/InputNumber.tsx'

export type ISubscribeModal = {
  onClose?(): void
  onSuccess?(): void
  launchpadData: ILaunchpadDetail | undefined
}
export default function SubscribeModal(props: ISubscribeModal & IOpenModal) {
  const {t} = useTranslation()
  const {showMessage} = useMessage()
  const {isH5} = useWidthChange()
  const userStore = useAppSelector((state) => state.users)
  const {getTokenBalance, NewWriteContract, checkHashStatus, NewReadContract} =
    usePluginModel()
  const [balance, setBalance] = useState('')
  const [amount, setAmount] = useState('')
  const [loading2, setLoading2] = useState(false)
  const [userPledge, setUserPledge] = useState('0')

  const {approveStatus, loading, approveToken} = useApprove({
    tokenAddress: props.launchpadData?.tokenAddress,
    spenderAddress: project.contracts.IDO.address,
  })

  useEffect(() => {
    if (userStore.address) {
      getBalance()
      getUserPledgeAmount()
    }
  }, [userStore.address])

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

  async function getBalance() {
    const [tokenBalance] = await awaitWrap(
      getTokenBalance(userStore.address, project.contracts.USDT.address)
    )
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
      contract.userTotalSubsInfos(
        props.launchpadData?.fundraisingNo,
        userStore.address
      )
    )
    if (resData) {
      console.log(resData)
      console.log('-------------')
      console.log(
        'resData',
        divDecimals(resData[0], props.launchpadData.tokenDecimals).toString()
      )
      setUserPledge(
        divDecimals(resData[0], props.launchpadData.tokenDecimals).toString()
      )
    }
  }

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
        getInput(amount, props.launchpadData?.tokenDecimals)
      )
    )
    setLoading2(false)
    if (transData) {
      await checkHashStatus(transData)
      showMessage(t(`Successfully subscribed`))
      props.destoryComponent()
    } else if (error) {
      console.log(error)
      showMessage(
        (error.data && error.data.message) || error.message || 'error'
      )
    }
  }

  return (
    <Modal
      title={t(`SUBSCRIBE`)}
      isH5={isH5}
      style={isH5 ? {} : {width: '6.1rem'}}
      close={props.destoryComponent}>
      <div className={'mt-[0.46rem] child-n-l:mb-[0.4rem] md:mt-[0.2rem]'}>
        <div className={''}>
          <div
            className={
              'mb-[0.12rem] flex items-center justify-between md:text-[0.14rem]'
            }>
            <div className={''}></div>
            <div className={'md:leading-[0.18rem]'}>
              {t(`Balance`)} : {formatUSDT(balance)} USDT
            </div>
          </div>
          <InputNumber
            value={amount}
            isH5={isH5}
            placeholder={t(`Please enter the amount`)}
            right={
              <span
                className={'cursor-pointer text-active md:text-[0.14rem]'}
                onClick={() => setAmount(maxAmount)}>
                Maximum
              </span>
            }
            onChange={(value) => {
              setAmount(value)
            }}
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
