import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../store'
import {userSlice} from '../store/usersReducer.ts'
import {useQuerySupportTokensDecimal} from '../api/system.tsx'
import {project} from '../contract/config.ts'
import {awaitWrap} from '../utils/tools.ts'
import {divDecimals} from '../contract/wallet.ts'
import {usePluginModel} from './usePluginModel.ts'
import {useUpdateEffect} from 'react-use'
import {useWalletTools} from './useWalletTools.ts'
import {useMessage} from './useMessage.ts'
import ConnectWalletModal, {IConnectWalletModal} from '../components/connectWalletModal/ConnectWalletModal.tsx'
import useModal from './useModal.ts'

export function SystemSetting() {
  const dispatch = useAppDispatch()
  const {data} = useQuerySupportTokensDecimal();
  const {NewReadContract} = usePluginModel()
  const {chainId, accounts, isActivating, connector} = useWalletTools()
  const {showMessage} = useMessage()
  const userData = useAppSelector((state) => state.users)
  const { openModal } = useModal()


  useEffect(() => {
    getUSDTDecimals();
  }, [data])

  useEffect(() => {
    getTokenRadio()
  }, [])

  async function getUSDTDecimals() {
    if (data) {
      dispatch(userSlice.actions.setSupportTokens(data))
    }
  }
  async function getTokenRadio() {
    const usdtContract = NewReadContract(project.contracts.USDT.address, project.contracts.USDT.abi);
    const contract = NewReadContract(project.contracts.IDOSetting.address, project.contracts.IDOSetting.abi);
    const [amount] = await awaitWrap(
      Promise.all([
        usdtContract.decimals(),
        contract.getPrice(project.contracts.Chip.address)
      ])
    );
    dispatch(userSlice.actions.setChipRadio(divDecimals(amount[1][0], amount[0]).toNumber()))
  }

  useUpdateEffect(() => {
    if (chainId && userData.address) {
      checkNetwork(chainId)
    }
    const address = accounts && accounts[0];
    if (address) {
      if (userData.address && userData.address !== address) {
        openModal<IConnectWalletModal>(ConnectWalletModal)
      }
    }
  }, [accounts, userData.address, chainId, isActivating]);

  async function checkNetwork(ID:number){
    if (document.visibilityState === "hidden") {
      return ;
    }
    const validNetWork = project.chainid === ID;

    if (ID && !validNetWork) {
      showMessage(`Please connect your wallet to the correct network`);
      const [info, error] = await awaitWrap(connector.activate(project.chainid));
      if (error) {
        console.error(error);
        console.log(info)
        // PubSub.publish(wallet_logout);
      }
    }
  }

  return null
}
