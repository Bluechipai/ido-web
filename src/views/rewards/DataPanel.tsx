import {FlexRow} from '../../components/flex/Flex.tsx'
import {useTranslation} from 'react-i18next'
import {LinerText} from '../../global.style.ts'
import {InviteButton} from './Rewards.style.ts'
import {useQueryInviteStatic} from '../../api/user.ts'
import {useState} from 'react'
import {awaitWrap} from '../../utils/tools.ts'
import axios from 'axios'
import {IResponse} from '../../api/base.ts'
import {ISignData} from '../../api/system.tsx'
import {useAppSelector} from '../../store'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import {getInput} from '../../contract/wallet.ts'
import {useMessage} from '../../hooks/useMessage.ts'

export default function DataPanel() {
  const {t} = useTranslation()
  const {NewWriteContract, project, checkHashStatus} = usePluginModel()
  const {showMessage} = useMessage()
  const userStore = useAppSelector((state) => state.users)
  const [loading, setLoading] = useState(false)
  const {data: inviteStatic} = useQueryInviteStatic()

  async function receiveAward() {
    if (!userStore.address) {
      showMessage(t('Please connect wallet'))
      return
    }
    setLoading(true)
    const [resData, error] = await awaitWrap(
      axios.post<string, IResponse<ISignData>>(
        `/plg/ido/iuser/withdrawInviteRewards`,
        {
          address: userStore.address,
          amount: String(inviteStatic?.undrawn),
        }
      )
    )
    if (resData && resData.code === 0) {
      withdrawInviteRewards(String(inviteStatic?.undrawn), resData.data)
    } else {
      console.log(error)
      setLoading(false)
    }
  }

  async function withdrawInviteRewards(amount: string, signData: ISignData) {
    const contract = NewWriteContract(
      project.contracts.IDO.address,
      project.contracts.IDO.abi
    )
    const [transData, error] = await awaitWrap(
      contract.withdrawInviteRewards(
        getInput(amount, signData.decimals),
        signData.deadline,
        signData.salt,
        signData.v,
        signData.r,
        signData.s
      )
    )
    setLoading(false)
    if (transData) {
      await checkHashStatus(transData)
      showMessage(t(`Extraction successful`))
    } else {
      console.log(error)
      showMessage(
        (error.data && error.data.message) || error.message || 'error'
      )
    }
  }

  return (
    <div className={'px-[1.68rem] text-[#080808]'}
         style={{background: 'linear-gradient(90deg, #94EFFF 4.22%, #FFF0B2 99%)'}}>
      <div className={'w-[14.4rem] h-[1.68rem]  mx-auto grid'} style={{gridTemplateColumns: '1fr 6.1rem 1fr'}}>
        <div className={'flex flex-col justify-center items-center border-r border-[#000]'}>
          <span className={'futura text-[0.56rem] font-medium'}>{inviteStatic ? `${Number(inviteStatic?.total)}CHIP` : '-'}</span>
          <FlexRow className={'mt-[0.16rem]'}>
            <span
              className={'uppercase ml-[0.12rem] text-[0.2rem] font-bold PlusJakartaSans-SemiBold'}>{t(`Total reward`)}</span>
          </FlexRow>
        </div>
        <div className={'relative flex flex-col justify-center items-center border-r border-[#000]'}>
          <span className={'futura text-[0.56rem] font-medium'}>{inviteStatic ? `${Number(inviteStatic?.undrawn)}` : '-'}</span>
          <FlexRow className={'mt-[0.16rem]'}>
            <span
              className={'uppercase ml-[0.12rem] text-[0.2rem] font-bold PlusJakartaSans-SemiBold'}>{t(`Rewards can be claimed`)}</span>
          </FlexRow>
          <InviteButton
            style={{position: 'absolute', right: '0.42rem', top: '50%', transform: 'translateY(-50%)'}}
            disabled={loading}
            onClick={receiveAward}>
            <LinerText>{t(`Claim`)}</LinerText>
          </InviteButton>
        </div>
        <div className={'flex flex-col justify-center items-center'}>
          <span className={'futura text-[0.56rem] font-medium'}>{inviteStatic ? `${inviteStatic?.persons}` : '-'}</span>
          <FlexRow className={'mt-[0.16rem]'}>
            <span
              className={'uppercase ml-[0.12rem] text-[0.2rem] font-bold PlusJakartaSans-SemiBold'}>{t(`Number of people`)}</span>
          </FlexRow>
        </div>
      </div>
    </div>
  )
}

