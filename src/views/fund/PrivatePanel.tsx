import {useTranslation} from 'react-i18next'
import {DropdownContainer, Information, InformationContent, InformationTitle} from './Private.style.ts'
import DropDown from '../../components/dropDown/DropDown.tsx'
import {useEffect, useMemo, useState} from 'react'
import {FlexBox, FlexCol, FlexRow, FlexSb} from '../../components/flex/Flex.tsx'
import styled from 'styled-components'
import JCheckbox from '../../components/JCheckbox/JCheckbox.tsx'
import {awaitWrap, isGreaterThan, isLessThan} from '../../utils/tools.ts'
import {useAppSelector} from '../../store'
import {usePluginModel} from '../../hooks/usePluginModel.ts'
import {project} from '../../contract/config.ts'
import {useTokens} from '../../hooks/useTokens.tsx'
import {ArrayElementType} from '../../utils/types.ts'
import {LoadingDot} from '../../components/loadingDot/LoadingDot.tsx'
import InputNumber from '../../components/form/InputNumber.tsx'
import {ILaunchpadDetail} from '../../api/system.tsx'
import DecimalTool from '../../utils/DecimalTool.ts'
import {divDecimals, getInput} from '../../contract/wallet.ts'
import useApprove from '../../hooks/useApprove.ts'
import {useMessage} from '../../hooks/useMessage.ts'
import {INPUT_NUMBER_REG} from '../../utils/regExp.ts'
import useModal from '../../hooks/useModal.ts'
import AgreementModal, {IAgreementModal} from '../../components/AgreementModal/AgreementModal.tsx'
import LinerButton from '../../components/linerButton/LinerButton.tsx'

const FormItem = styled.div`
    padding-bottom: 0.12rem;
    border-bottom: 0.01rem solid rgba(255, 255, 255, 0.2);
    margin-top: 0.4rem;
`;
const CancelButton = styled.button`
    flex: 1;
    height: 0.48rem;
    margin-right: 0.16rem;
    font-size: 0.18rem;
    font-weight: 600;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 0.4rem;
`;

type IProps = {
  projectInfo?: ILaunchpadDetail
  onCancel: () => void
  onReload: () => void
}
export default function PrivatePanel(props: IProps) {
  const {t} = useTranslation()
  const userStore = useAppSelector((state) => state.users)
  const {getTokenBalance, NewWriteContract, checkHashStatus, NewReadContract} = usePluginModel()
  const tokens = useTokens();
  const {showMessage} = useMessage();
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const [currentToken, setToken] = useState(tokens[0])
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [amount, setAmount] = useState<string | undefined>(undefined)
  const [fee, setFee] = useState<string | undefined>(undefined)
  const [radio, setRadio] = useState(0)
  const [userPledge, setUserPledge] = useState('0')
  const [checked, setChecked] = useState(false)
  const {openModal} = useModal()

  const { approveStatus, loading: loadingApprove, approveToken } = useApprove({
    tokenAddress: currentToken.address,
    spenderAddress: project.contracts.IDO.address,
  })

  const isUSDT = useMemo(() => {
    return currentToken.address === project.contracts.USDT.address
  }, [currentToken.address])

  const USDTDecimal = useMemo(() => {
    return userStore.supportTokens[project.contracts.USDT.address]
  }, [userStore.supportTokens])

  useEffect(() => {
    setToken(tokens[0])
  }, [tokens])
  useEffect(() => {
    getBalance();
    getFee();
  }, [currentToken.address, userStore.address, props.projectInfo])
  useEffect(() => {
    getTokenRadio();
  }, [currentToken.address, isUSDT])
  useEffect(() => {
    getUserPledgeAmount();
  }, [userStore.address, props.projectInfo])



  const maxAmount = useMemo(() => {
    if (!props.projectInfo) {
      return '0'
    }
    const poolSubAmount = DecimalTool.sub(props.projectInfo?.quantity || '', props.projectInfo.fundedAmount).toFixed()
    const userSubAmount = DecimalTool.sub(props.projectInfo?.maxAmount || '', userPledge).toFixed()

    const subAmount = isGreaterThan(userSubAmount, poolSubAmount) ? poolSubAmount : userSubAmount;

    const feeRadio = DecimalTool.div(fee || 0, 10000).toFixed();
    const subRadio = DecimalTool.sub(1, feeRadio).toFixed()

    return DecimalTool.div(subAmount, subRadio).toFixed()
  }, [userPledge, props.projectInfo, fee])

  const totalAmount = useMemo(() => {
    if (!amount) {
      return '0';
    }
    // const feeRadio = DecimalTool.div(fee || 0, 10000);
    // const mulData = DecimalTool.sub(1, feeRadio).toFixed()
    // const total = DecimalTool.mul(amount, mulData).toFixed()

    return DecimalTool.mul(amount, radio).toFixed()
  }, [currentToken.address, amount, radio, fee])
  const limitAmount = useMemo(() => {
    const feeRadio = DecimalTool.div(fee || 0, 10000).toFixed()
    const feeAmount = DecimalTool.mul(totalAmount, feeRadio).toFixed()

    return DecimalTool.sub(totalAmount, feeAmount).toFixed()
  }, [fee, totalAmount])

  async function getBalance() {
    if (!userStore.address || loading) {
      return;
    }
    setLoading(true)
    const [tokenBalance, error] = await awaitWrap(
      getTokenBalance(userStore.address, currentToken.address)
    )
    setLoading(false)
    if (!error) {
      setBalance(tokenBalance)
    }
  }

  async function getFee() {
    if (!userStore.address || !props.projectInfo || loading2) {
      return;
    }
    setLoading2(true)
    const contract = NewReadContract(project.contracts.IDO.address, project.contracts.IDO.abi);
    const IDOSettingContract = NewReadContract(project.contracts.IDOSetting.address, project.contracts.IDOSetting.abi);
    const [amount] = await awaitWrap(
      contract.lvAmts(userStore.address)
    );
    const [fee] = await awaitWrap(
      IDOSettingContract.lv(currentToken.address, props.projectInfo?.fundType, amount)
    );
    setLoading2(false)
    setFee(fee.toString())
  }

  async function getTokenRadio() {
    if (loading3) {
      return
    }
    if (isUSDT) {
      setRadio(1)
      return;
    }
    setLoading3(true)
    const usdtContract = NewReadContract(project.contracts.USDT.address, project.contracts.USDT.abi);
    const contract = NewReadContract(project.contracts.IDOSetting.address, project.contracts.IDOSetting.abi);
    const [amount] = await awaitWrap(
      Promise.all([
        usdtContract.decimals(),
        contract.getPrice(currentToken.address)
      ])
    );
    setLoading3(false)
    setRadio(divDecimals(amount[1][0], amount[0]).toNumber())
  }


  async function getUserPledgeAmount() {
    if (!props.projectInfo?.fundraisingNo || !userStore.address) {
      return
    }
    const contract = NewReadContract(
      project.contracts.IDO.address,
      project.contracts.IDO.abi
    )
    const [resData] = await awaitWrap(
      contract.utsInfos(props.projectInfo?.fundraisingNo, userStore.address)
    )
    if (resData) {
      console.log(resData)
      console.log('-------------')
      console.log(
        'resData',
        divDecimals(resData[0], USDTDecimal).toString()
      )
      setUserPledge(
        divDecimals(resData[0], USDTDecimal).toString()
      )
    }
  }

  async function submit() {
    if (!userStore.address || !props.projectInfo || submitLoading) {
      return;
    }
    if (!checked) {
      showMessage(t(`Please agree to the subscription agreement`))
      return
    }
    if (!amount) {
      showMessage(t(`Please enter the subscription quantity`))
      return
    }
    const balanceVal = isUSDT ? balance?.toString() : DecimalTool.mul(balance?.toString() || '0', radio).toFixed();
    const totalBalance = isGreaterThan(maxAmount, balanceVal || 0) ? balanceVal : maxAmount;
    const subAmount = DecimalTool.div(totalBalance || 0, radio).div(1).toFixedZero(currentToken.decimal, 1)

    if (isGreaterThan(totalAmount, subAmount || 0)) {
      showMessage(t(`Exceeds the maximum subscription quantity`) + `: ${subAmount} USDT`)
      return
    }
    if (isLessThan(totalAmount, props.projectInfo.minAmount)) {
      showMessage(t(`Less than the minimum subscription quantity`) + `: ${props.projectInfo.minAmount} USDT`)
      return
    }
    if (isGreaterThan(maxAmount, balanceVal || "")) {
      showMessage(t(`Insufficient balance`))
      return
    }

    setSubmitLoading(true)
    const contract = NewWriteContract(project.contracts.IDO.address, project.contracts.IDO.abi);
    const [transData, error] = await awaitWrap(
      contract.subscribe(
        props.projectInfo?.fundraisingNo,
        currentToken.address,
        getInput(amount, currentToken.decimal)
    ))
    if (transData) {
      await checkHashStatus(transData)
      showMessage(t(`Subscription success`))
      setAmount('')
      getBalance()
      props.onReload();
    } else if (error) {
      console.log(error)
      showMessage((error.data && error.data.message) || error.message || 'error')
    }
    setSubmitLoading(false)
  }

  return (
    <Information>
      <InformationTitle>{t(`Subscription`)}</InformationTitle>
      <InformationContent>
        <DropdownContainer>
          <span style={{fontSize: '0.16rem', fontWeight: 500, marginBottom: '0.12rem'}}>{t(`Asset`)}</span>
          <DropDown
            triggerStyle={{width: '100%', paddingBottom: '0.16rem'}}
            menuStyle={{width: '100%'}}
            options={tokens}
            disabled={loading || loading2 || loading3}
            onChange={(selectd: ArrayElementType<typeof tokens>) => {
              setAmount('')
              setToken(selectd)
            }}
          />
        </DropdownContainer>
        <FormItem>
          <FlexSb style={{marginBottom: '0.1rem'}}>
            <span style={{fontSize: '0.16rem', fontWeight: 500}}>{t(`Amount`)}</span>
            <FlexRow style={{
              fontSize: '0.12rem',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.4)',
            }}>
              <span style={{marginRight: '0.04rem'}}>Balance:</span>
              {
                loading
                  ? <LoadingDot />
                  : <span>{balance} {currentToken.text}</span>
              }
            </FlexRow>
          </FlexSb>
          <FlexSb>
            <InputNumber
              type="text"
              placeholder={t(`Input quantity`)}
              placeholderColor={'rgba(255, 255, 255, 0.4)'}
              regStr={INPUT_NUMBER_REG}
              style={{flex: 1, background: 'transparent', border: 'none'}}
              value={amount}
              maxDecimal={currentToken.decimal}
              onChange={(value) => {
                setAmount(value)
              }} />
            <LinerButton
              width={88}
              height={34}
              radius={40}
              percent={0.4}
              disabled={loading || loading2 || loading3}
              onClick={() => {
                // const subVal = isUSDT ? String(maxAmount) : DecimalTool.mul(maxAmount || 0, radio).toFixed();
                if (maxAmount) {
                  const balanceVal = isUSDT ? balance?.toString() : DecimalTool.mul(balance?.toString() || '0', radio).toFixed();
                  const totalBalance = isGreaterThan(maxAmount, balanceVal || 0) ? balanceVal : maxAmount;

                  // const feeRadio = DecimalTool.div(fee || 0, 10000);
                  // const mulData = DecimalTool.add(1, feeRadio).toFixed()
                  const subAmount = DecimalTool.div(totalBalance || 0, radio).div(1).toFixedZero(currentToken.decimal, 1)
                  setAmount(subAmount)
                }
              }}>{t(`MAX`)}</LinerButton>
          </FlexSb>
        </FormItem>
        <FlexSb style={{minHeight: '0.3rem', fontSize: '0.12rem', fontWeight: 500, margin: '0.12rem 0 0.72rem', color: 'rgba(255, 255, 255, 0.4)', alignItems: 'flex-start'}}>
          <FlexRow>
            <span style={{marginRight: '0.04rem'}}>{t(`Handling charge`)}:</span>
            {
              loading2 ? <LoadingDot /> : <span>{DecimalTool.div(fee || 0, 100).toFixed()}%</span>
            }
          </FlexRow>
          <FlexRow>
            {
              loading3
                ? <LoadingDot />
                : <FlexCol style={{alignItems: 'flex-end'}}>
                  <span>{currentToken.text} ≈ {radio} USDT</span>
                  <span>{t(`Stake total: `)} {limitAmount} USDT</span>
                 </FlexCol>
            }
          </FlexRow>
        </FlexSb>
        <FlexSb>
          <CancelButton onClick={props.onCancel}>{t(`Cancel`)}</CancelButton>
          <LinerButton
            width={232}
            height={48}
            radius={40}
            style={{flex: 1}}
            disabled={loadingApprove || submitLoading}
            onClick={() => {
              if(!userStore.address) {
                showMessage(t(`Please connect wallet`))
                return;
              }
              if (!approveStatus) {
                approveToken()
              } else {
                submit()
              }
            }}>{approveStatus ? t(`Confirm`) : t(`Approve`)}</LinerButton>
        </FlexSb>
        <FlexBox style={{marginTop: '0.4rem'}}>
          <JCheckbox
            onChange={(checked) => {
              setChecked(checked)
            }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.40)',
              marginRight: '0.04rem'
            }}>BlueChipAI Investment Risk Disclosure </span>
            <span
              style={{color: '#3BF1F1'}}
              onClick={(event) => {
                openModal<IAgreementModal>(AgreementModal);
                event.stopPropagation()
              }}>Agreement.</span>
          </JCheckbox>
        </FlexBox>
      </InformationContent>
    </Information>
  )
}
