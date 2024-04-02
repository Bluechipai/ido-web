import Modal from '../modal/Modal.tsx'
import {useTranslation} from 'react-i18next'
import {IOpenModal} from '../ModalContext/ModalContext.tsx'
import {useWalletTools} from '../../hooks/useWalletTools.ts'
import {useEffect, useMemo, useState} from 'react'
import {useAppDispatch} from '../../store'
import {userSlice} from '../../store/usersReducer.ts'
import {useSearchParams} from 'react-router-dom'
import {ISignRes, useSignInvite712} from '../../contract/sign-invite-712.ts'
import axios from 'axios'
import {IResponse} from '../../api/base.ts'
import useWidthChange from '../../hooks/useWidthChange.ts'
import {FlexBox} from '../flex/Flex.tsx'
import {LinerText} from '../../global.style.ts'
import LoadButton from '../loadButton/LoadButton.tsx'
import {awaitWrap} from '../../utils/tools.ts'
import waitingIcon from 'src/assets/img/waiting.png';
import check3Icon from 'src/assets/img/check3.png';
import {StepItemStyle} from './ConnectWalletModal.style.ts'
import Waiting from '../wait/Waiting.tsx'

type IInviteInfo = {
  address: string
  link: string
}

export type IConnectWalletModal = {
  onClose?(): void
  onSuccess?(): void
}
export default function ConnectWalletModal(
  props: IConnectWalletModal & IOpenModal
) {
  const {t, i18n} = useTranslation()
  const {isH5} = useWidthChange()
  const {accounts, provider, activate, deactivate} = useWalletTools()
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const {getSign} = useSignInvite712([{ name: 'inviter', type: 'address' }])
  const {getSign: getSign2} = useSignInvite712([])
  const inviteCode = searchParams.get('code')

  useEffect(() => {
    if (accounts && accounts[0]) {
      // getInvitorInfo(inviteCode);
      setStep(2);
      signLogin(accounts[0])
    } else {
      deactivate()
    }
  }, [accounts, provider])

  async function signLogin(address: string) {
    const { signature: signature2, salt: salt2, deadline: deadline2 } = await getSign2(address, {})
    const [resData] = await awaitWrap(axios.post('/plg/ido/iuser/wlogin', {
      address: address,
      deadline: deadline2,
      salt: salt2,
      signature: signature2
    }))
    if (resData) {
      const walletAddress = accounts[0]
      dispatch(userSlice.actions.setAddress(walletAddress))
      if (!inviteCode) {
        closeModal()
      } else {
        getInvitorInfo(walletAddress, inviteCode)
      }
    }
  }

  async function getInvitorInfo(walletAddress: string, code: string) {
    const resData = await axios.get<IInviteInfo, IResponse<IInviteInfo>>(
      `/plg/ido/iuser/link/${code}`
    )
    if (resData.code === 0 && resData.data?.address) {
      const signData = await getSign(walletAddress, {inviter: resData.data?.address})
      confirmInvitor(walletAddress, resData.data?.address, signData)
    }
  }

  async function confirmInvitor(walletAddress: string, invitor: string, params: ISignRes) {
    const resData = await axios.post<IInviteInfo, IResponse<IInviteInfo>>(
      `/plg/ido/iuser/confirmLink`,
      {
        address: walletAddress,
        inviter: invitor,
        ...params
      }
    )
    if (resData.code === 0) {
      closeModal()
    }
  }

  function closeModal() {
    setStep(3);
    setTimeout(() => {
      props.destoryComponent()
    }, 1000);
  }

  const steps = useMemo(() => {
    return [
      {
        title: t(`Verify Ownership`),
        desc: t(`Confirm you are the owner of this wallet`),
        waiting: undefined
      },
      {
        title: t(`Allow Transactions Premission`),
        desc: t(`Allow secure access to our APIs to generate transactions`),
        waiting: waitingIcon
      }
    ]
  }, [i18n.language])

  return (
    <Modal
      title={t(`Connect Wallet`)}
      isH5={isH5}
      close={props.destoryComponent}>
      <div
        className={
          'mb-[0.96rem] text-[0.16rem] text-[rgba(0,0,0,0.56)] font-medium'
        }>
        {t(
          `You will receive a signature request. Signing is free and does not send any transactions.`
        )}
      </div>
      <div
        className={
          'mb-[0.96rem] child-n-l:mb-[0.4rem] md:mb-[0.24rem] md:child-n-l:mb-[0.24rem]'
        }>
        {
          steps.map((item, index) => {
            const itemStep = index + 1;
            const isLast = index === steps.length - 1;
            return <StepItemStyle key={index}>
              <FlexBox style={{marginRight: '0.08rem'}}>
                {
                  step > itemStep
                    ? <FlexBox className={`w-[0.56rem] h-[0.56rem] rounded-[50%]`} style={{background: 'linear-gradient(124deg, #FFEDA1 13.38%, #7CECFF 86.8%)'}}>
                      <img src={check3Icon} className={'w-[0.24rem] h-[0.16rem]'} alt="" />
                    </FlexBox>
                    : null
                }
                {
                  step === itemStep
                    ? <>
                      {
                        isLast
                          ? <img src={item.waiting} className={'rotate-animate w-[0.56rem] h-[0.56rem]'} alt="" />
                          : <FlexBox
                            className={`h-[0.56rem] w-[0.56rem] rounded-[50%] bg-[#000] md:h-[0.4rem] md:w-[0.4rem]`}>
                            <LinerText style={{fontSize: '0.32rem', fontWeight: 700}}>{itemStep}</LinerText>
                          </FlexBox>
                      }
                    </>
                    : null
                }
                {
                  step < itemStep
                    ? <FlexBox
                      className={`h-[0.56rem] w-[0.56rem] rounded-[50%] bg-[rgba(0,0,0,0.24)] md:h-[0.4rem] md:w-[0.4rem]`}>
                      <LinerText style={{fontSize: '0.32rem', fontWeight: 700}}>{itemStep}</LinerText>
                    </FlexBox>
                    : null
                }
              </FlexBox>
              <div style={{opacity: step < itemStep ? 0.5 : 1}}>
                <div className={'mb-[0.1rem] text-[0.2rem] font-bold'}>{item.title}</div>
                <div
                  className={
                    'text-[0.16rem] font-medium text-[rgba(0,0,0,0.56)]'
                  }>
                  {item.desc}
                </div>
              </div>
            </StepItemStyle>
          })
        }
      </div>
      <LoadButton
        loading={false}
        style={{width: '100%', height: '0.52rem'}}
        onClick={activate}>
        {
          step === 2 ? <Waiting /> : <span>{t(`Send request`)}</span>
        }
      </LoadButton>
    </Modal>
  )
}
