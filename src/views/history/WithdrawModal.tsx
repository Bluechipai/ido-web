import Modal from '../../components/modal/Modal.tsx'
import {useTranslation} from 'react-i18next'
import ModalFooter from '../../components/modal/ModalFooter.tsx'
import {IOpenModal} from '../../components/ModalContext/ModalContext.tsx'
import Input from '../../components/form/Input.tsx'
import {IPlat} from '../../api/system.tsx'
import DecimalTool from '../../utils/DecimalTool.ts'
import {useEffect, useMemo, useState} from 'react'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import {project, zeroAddress} from '../../contract/config.ts'
import {useAppSelector} from '../../store'
import {awaitWrap} from '../../utils/tools.ts'
import axios from 'axios'
import {useMessage} from '../../hooks/useMessage.ts'
import useWidthChange from '../../hooks/useWidthChange.ts'
import {getTokenNameByAddress} from '../../contract/wallet.ts'
import {useTokens} from '../../hooks/useTokens.tsx'
import {FlexSb} from '../../components/flex/Flex.tsx'
// import Logo from '../../components/logo/Logo.tsx'

export type IWithdrawModal = {
  onClose?(): void
  onSuccess?(): void
  launchpadData: IPlat
}
export default function WithdrawModal(props: IWithdrawModal & IOpenModal) {
  const {t} = useTranslation()
  const {isH5} = useWidthChange()
  const userStore = useAppSelector((state) => state.users)
  const {NewWriteContract, checkHashStatus, NewReadContract} = usePluginModel()
  const {showMessage} = useMessage()
  const [address, setAddress] = useState('')
  const [percent, setPercent] = useState('')
  const [publicPercent, setPublicPercent] = useState('')
  const [loading, setLoading] = useState(false)
  const tokens = useTokens()

  const currentToken = useMemo(() => {
    return tokens.find((item) => {
      return item.address === props.launchpadData.token
    })
  }, [tokens, props.launchpadData.token])

  useEffect(() => {
    console.log(currentToken)
    initData()
  }, [])

  useEffect(() => {
    getPublicFee()
  }, [])
  async function initData() {
    const contract = NewReadContract(
      project.contracts.IDO.address,
      project.contracts.IDO.abi
    )
    const [resData] = await awaitWrap(contract.fee(props.launchpadData.fundraisingNo))
    if (resData) {
      setPercent(DecimalTool.div(resData.toString(), 100).toFixed())
    }
  }

  async function getPublicFee() {
    const contract = NewReadContract(
      project.contracts.IDOSetting.address,
      project.contracts.IDOSetting.abi
    )
    const [resData] = await awaitWrap(contract.publicFee())
    if (resData) {
      console.log(resData.toString())
      setPublicPercent(DecimalTool.div(resData.toString(), 100).toFixed())
    }
  }
  async function submit() {
    if (props.launchpadData.state === 4) {
      fundSuccess()
    } else {
      funding()
    }
  }

  async function funding() {
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
      showMessage(t(`Withdrawal success`))
      props.onSuccess?.()
      props.destoryComponent()
    } else {
      console.log(error)
      showMessage(
        (error.data && error.data.message) || error.message || 'error'
      )
    }
  }

  async function fundSuccess() {
    if (props.launchpadData.project.networkType !== 1 && !address) {
      showMessage(t(`Please enter the withdrawal address`))
      return;
    }
    setLoading(true)
    const [resData, error2] = await awaitWrap(
      axios.post('/plg/ido/iuser/withdrawSubscribe', {
        address: userStore.address,
        fundraisingId: props.launchpadData.id,
        receiveAddress: address || zeroAddress,
      })
    )
    if (resData && resData.code === 0) {
      if (!resData.data) {
        showMessage(t(`Apply successfully`))
        setLoading(false)
        props.onSuccess?.()
        props.destoryComponent()
        return;
      }
      const contract = NewWriteContract(
        project.contracts.IDO.address,
        project.contracts.IDO.abi
      )
      const [transData, error] = await awaitWrap(
        contract.claim(props.launchpadData.fundraisingNo)
      )
      setLoading(false)
      if (transData) {
        await checkHashStatus(transData)
        showMessage(t(`Withdrawal success`))
        props.onSuccess?.()
        props.destoryComponent()
      } else {
        console.log(error)
        showMessage(
          (error.data && error.data.message) || error.message || 'error'
        )
      }
    } else {
      setLoading(false)
      console.log(error2)
      showMessage(
        (error2.data && error2.data.message) || error2.message || 'error'
      )
    }
  }

  return (
    <Modal
      title={t(`Withdraw Token`)}
      isH5={isH5}
      close={props.destoryComponent}>
      {
        props.launchpadData.fundType === 1
          ? <>
            {
              props.launchpadData.state === 1
                ? <div
                    className={
                      'flex h-[0.4rem] text-[rgba(0,0,0,0.57)] md:mb-[0.24rem] md:text-[0.14rem]'
                    }
                    dangerouslySetInnerHTML={{
                      __html: `${publicPercent}% handling fee charged by the platform The platform`,
                    }}>
                  </div>
                : <div
                    className={
                      'flex h-[0.4rem] text-[rgba(0,0,0,0.57)] md:mb-[0.24rem] md:text-[0.14rem]'
                    }
                    dangerouslySetInnerHTML={{
                      __html: `${percent}% handling fee charged by the platform The platform`,
                    }}>
                  </div>
            }

          </>
          : null
      }
      {
        props.launchpadData.fundType === 2
          ? <>
              {
                props.launchpadData.state === 1
                  ? <div
                      className={
                        'flex h-[0.4rem] text-[rgba(0,0,0,0.57)] md:mb-[0.24rem] md:text-[0.14rem]'
                      }>
                      {
                        t(`5-10% handling fee charged by the platform The platform`)
                      }
                    </div>
                  : <div
                      className={
                        'flex h-[0.4rem] text-[rgba(0,0,0,0.57)] md:mb-[0.24rem] md:text-[0.14rem]'
                      }
                      dangerouslySetInnerHTML={{
                        __html: `${percent}% handling fee charged by the platform The platform`,
                      }}>
                    </div>
              }
            </>
          : null
      }
      <div
        className={'mt-[0.4rem] child-n-l:mb-[0.4rem] md:text-[0.14rem] md:child-n-l:mb-[0.24rem]'}>
        <div className={''}>
          <div className={'mb-[0.16rem] text-[0.16rem] font-semibold leading-[0.24rem] md:leading-[0.18rem]'}>
            {t(`Subscription amount`)}
          </div>
          <Input
            isH5={isH5}
            style={{height: '0.64rem'}}
            inputStyle={{fontSize: '0.2rem'}}
            placeholder={'1000 USDT'}
            value={`${props.launchpadData.userFunded} ${getTokenNameByAddress(props.launchpadData.token)}`}
            readOnly
          />
        </div>
        <div className={''}>
          <FlexSb className={'mb-[0.16rem] text-[0.16rem] font-semibold leading-[0.24rem] md:leading-[0.18rem]'}>
            <span>{t(`Subscription of tokens`)}</span>
            <span style={{color: 'rgba(0,0,0,0.57)'}}>{` (1${props.launchpadData.project.tokenSymbol}=${props.launchpadData.subscribePrice} USD)`}</span>
          </FlexSb>
          <Input
            isH5={isH5}
            style={{height: '0.64rem'}}
            inputStyle={{fontSize: '0.2rem'}}
            placeholder={'1000 AAA'}
            value={`${DecimalTool.div(props.launchpadData.userFunded, props.launchpadData.subscribePrice).toFixed()} ${props.launchpadData.project.tokenSymbol}`}
            readOnly
          />
        </div>
        {/*<div className={''}>
          <div className={'mb-[0.12rem] text-[0.16rem] font-semibold leading-[0.24rem] md:leading-[0.18rem]'}>
            {t(`Pledge income`)}
          </div>
          <Input
            isH5={isH5}
            style={{height: '0.64rem'}}
            inputStyle={{fontSize: '0.2rem'}}
            placeholder={'940 Chip'}
            value={`${props.launchpadData.userRewards} ${currentToken?.text}`}
            readOnly
          />
        </div>*/}
        {props.launchpadData.project.networkType !== 1 && props.launchpadData.state === 4
          ? <Input
              isH5={isH5}
              placeholder={t(`Please enter the receive address`)}
              value={address}
              onChange={(value) => setAddress(value)}
            />
          : null
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
