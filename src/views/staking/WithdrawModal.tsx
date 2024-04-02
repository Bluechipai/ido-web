import Modal from '../../components/modal/Modal.tsx'
import {useTranslation} from 'react-i18next'
import ModalFooter from '../../components/modal/ModalFooter.tsx'
import {IOpenModal} from 'src/components/ModalContext/ModalContext.tsx'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import {useEffect, useState} from 'react'
import {useAppSelector} from '../../store'
import {
  awaitWrap
} from '../../utils/tools.ts'
import useApprove from '../../hooks/useApprove.ts'
import {getInput} from '../../contract/wallet.ts'
import {useMessage} from '../../hooks/useMessage.ts'
import useWidthChange from '../../hooks/useWidthChange.ts'
import InputNumber from 'src/components/form/InputNumber.tsx'
import {MiniButton} from '../../global.style.ts'
import {IRewardPoolItem} from './RewardPools.tsx'

export type IWithdrawModal = {
  onClose?(): void
  onSuccess?(): void
  poolData: IRewardPoolItem | undefined
}
export default function WithdrawModal(props: IWithdrawModal & IOpenModal) {
  const {t} = useTranslation()
  const {showMessage} = useMessage()
  const {isH5} = useWidthChange()
  const userStore = useAppSelector((state) => state.users)
  const {getTokenBalance, NewWriteContract, checkHashStatus, project} = usePluginModel()
  const [balance, setBalance] = useState('')
  const [amount, setAmount] = useState('')
  const [loading2, setLoading2] = useState(false)

  const {approveStatus, loading, approveToken} = useApprove({
    tokenAddress: project.contracts.Chip.address,
    spenderAddress: project.contracts.Staking.address,
  })

  useEffect(() => {
    if (userStore.address) {
      getBalance()
    }
  }, [userStore.address])

  async function getBalance() {
    const [tokenBalance] = await awaitWrap(
      getTokenBalance(userStore.address, project.contracts.Chip.address)
    )
    if (tokenBalance) {
      setBalance(tokenBalance)
    }
  }
  async function submit() {
    if (!props.poolData || !amount) {
      return
    }
    setLoading2(true)
    const contract = NewWriteContract(project.contracts.Staking.address, project.contracts.Staking.abi)
    const stakedAmount = getInput(amount, props.poolData.decimals)
    const [transData, error] = await awaitWrap(
      props.poolData.isFixed
        ? contract.fixedDeposit(props.poolData.planId, stakedAmount)
        : contract.liveDeposit(stakedAmount)
    )
    setLoading2(false)
    if (transData) {
      await checkHashStatus(transData)
      showMessage(t(`Stake success`))
      props.onSuccess?.()
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
      title={t(`Withdraw Assets`)}
      isH5={isH5}
      style={isH5 ? {} : {width: '6.1rem'}}
      close={props.destoryComponent}>
      <div className={'mt-[0.08rem]'}>
        <div className={''}>
          <div className={'text-[0.16rem] font-bold mb-[0.16rem]'}>{t(`Staked amount`)}</div>
          <InputNumber
            value={amount}
            isH5={isH5}
            placeholder={t(`≥0.1 CHIP`)}
            style={{height: '0.64rem'}}
            inputStyle={{fontSize: '0.2rem'}}
            right={
              <MiniButton onClick={() => setAmount(String(balance))}>{t(`MAX`)}</MiniButton>
            }
            onChange={(value) => {
              setAmount(value)
            }}
          />
          <div className={'text-[0.16rem] font-medium text-[rgba(0,0,0,0.57)] mb-[0.16rem]'}>{t(`Attention! Withdrawal before your fixed period ends will NOT have any Bonus!`)}</div>
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
