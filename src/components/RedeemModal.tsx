import Modal from 'src/components/modal/Modal.tsx'
import {useTranslation} from 'react-i18next'
import ModalFooter from 'src/components/modal/ModalFooter.tsx'
import {IOpenModal} from 'src/components/ModalContext/ModalContext.tsx'
import Input from 'src/components/form/Input.tsx'
import {IPlat} from 'src/api/system.tsx'
import {usePluginModel} from 'src/hooks/usePluginModel.ts'
import {project} from 'src/contract/config.ts'
import {useEffect, useMemo, useState} from 'react'
import {awaitWrap} from 'src/utils/tools.ts'
import {useMessage} from 'src/hooks/useMessage.ts'
import {useAppSelector} from 'src/store'
import {divDecimals} from 'src/contract/wallet.ts'
import DecimalTool from 'src/utils/DecimalTool.ts'
import useWidthChange from 'src/hooks/useWidthChange.ts'
import {useTokens} from '../hooks/useTokens.tsx'

export type IRedeemModal = {
  onClose?(): void
  onSuccess?(): void
  launchpadData: IPlat
  isWithdraw?: boolean
}
export default function RedeemModal(props: IRedeemModal & IOpenModal) {
  const {t} = useTranslation()
  const userStore = useAppSelector((state) => state.users)
  const {isH5} = useWidthChange()
  const {NewReadContract, NewWriteContract, checkHashStatus} = usePluginModel()
  const {showMessage} = useMessage()
  const [redeemFee, setRedeemFee] = useState('')
  const [loading, setLoading] = useState(false)
  const tokens = useTokens()

  const tokenDecimals = useMemo(() => {
    return userStore.supportTokens[props.launchpadData.token]
  }, [userStore.supportTokens, props.launchpadData.token])
  const currentToken = useMemo(() => {
    return tokens.find((item) => {
      return item.address === props.launchpadData.token
    })
  }, [tokens, props.launchpadData.token])

  useEffect(() => {
    if (userStore.address && tokenDecimals) {
      initData()
    }
  }, [userStore.address, tokenDecimals])

  async function initData() {
    const contract = NewReadContract(
      project.contracts.IDO.address,
      project.contracts.IDO.abi
    )
    const [resData, error] = await awaitWrap(
      contract.getAllRedeemFee(
        props.launchpadData.fundraisingNo,
        userStore.address,
        props.launchpadData.token
      )
    )
    if (resData) {
      setRedeemFee(
        divDecimals(resData, tokenDecimals).toFixed()
      )
    } else {
      console.log(error)
    }
  }

  async function submit() {
    setLoading(true)
    const contract = NewWriteContract(
      project.contracts.IDO.address,
      project.contracts.IDO.abi
    )
    const [transData, error] = await awaitWrap(
      contract.redeem(props.launchpadData.fundraisingNo, props.launchpadData.token)
    )
    setLoading(false)
    if (transData) {
      await checkHashStatus(transData)
      showMessage(t(`Redeem Successfully`))
      props.onSuccess?.()
      props.destoryComponent()
    } else {
      console.log(error)
      showMessage(
        (error.data && error.data.message) || error.message || 'error'
      )
    }
  }

  return (
    <Modal
      title={props.isWithdraw ? t(`Withdraw Token`) : t(`Redeem Assets`)}
      isH5={isH5}
      close={props.destoryComponent}>
      {!props.isWithdraw ? (
        <div
          style={{color: ''}}
          className={
            'mb-[0.4rem] text-[rgba(0,0,0,0.57)]'
          }>
          {/*<div>{t(`The platform charges transfer fee`)}</div>*/}
        </div>
      ) : null}
      <div className={'child-n-l:mb-[0.4rem] md:child-n-l:mb-[0.24rem]'}>
        <div className={''}>
          <div className={'mb-[0.12rem] text-[0.16rem] font-bold leading-[0.2rem]'}>
            {t(`Subscription amount`)}
          </div>
          <Input
            isH5={isH5}
            placeholder={'1000 USDT'}
            value={`${props.launchpadData.userFunded} ${currentToken?.text}`}
            readOnly
          />
        </div>
        <div className={''}>
          <div className={'mb-[0.12rem] text-[0.16rem] font-bold leading-[0.2rem]'}>
            {t(`Redeem amount`)}
          </div>
          <Input
            isH5={isH5}
            placeholder={'940 USDT'}
            value={
              props.isWithdraw
                ? `${props.launchpadData.userFunded} ${currentToken?.text}`
                : `${DecimalTool.sub(
                    props.launchpadData.userFunded,
                    redeemFee
                  ).toFixed()} ${currentToken?.text}`
            }
            readOnly
          />
        </div>
        {
          props.isWithdraw
            ? <div className={''}>
              <div className={'mb-[0.12rem] text-[0.16rem] font-bold leading-[0.2rem]'}>
                {t(`Incentive earnings`)}
              </div>
              <Input
                isH5={isH5}
                placeholder={'940 Chip'}
                value={`${props.launchpadData.userRewards} Chip`}
                readOnly
              />
            </div>
            : <div className={''}>
              <div className={'mb-[0.12rem] text-[0.16rem] font-bold leading-[0.2rem]'}>
                {t(`liquidated damages`)}
              </div>
              <Input
                isH5={isH5}
                placeholder={'940 Chip'}
                value={`${redeemFee} ${currentToken?.text}`}
                readOnly
              />
            </div>
        }
        <ModalFooter
          onCancel={props.destoryComponent}
          confirmText={t(`Confirm`)}
          loading={loading}
          onConfirm={submit}
        />
      </div>
    </Modal>
  )
}
