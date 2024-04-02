// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Web3ReactHooks} from '@web3-react/core/dist/hooks'
// import {Connector} from '@web3-react/types'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {IWallet, WALLETS} from '../contract/config'
import {useAppSelector} from '../store'

// type IWalletTools = {
//     hooks: Web3ReactHooks
//     connector: Connector
// }
export function useWalletTools(wallet?: IWallet | null, project?: any) {
  const userStore = useAppSelector((state) => state.users)
  const walletInfo = wallet || userStore.wallet_info
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = walletInfo?.hooks || WALLETS.metamask.hooks
  const [loginStatus, setLoginStatus] = useState(false)

  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const connector = useMemo(() => {
    return walletInfo?.connector || WALLETS.metamask.connector
  }, [walletInfo])

  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      setLoginStatus(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (provider && provider.provider.on) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      provider.provider.on('accountsChanged', handleAccountsChanged)
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (provider && provider.provider.on) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        provider.provider.removeListener(
          'accountsChanged',
          handleAccountsChanged
        )
      }
    }
  }, [provider])
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setLoginStatus(true)
    }
  }, [accounts])

  const activate = useCallback(() => {
    // connector.activate();
    const projectChainId = project?.chainid;
    connector.activate(projectChainId).catch((error: any) => {
      const currentProvider = getWalletPlugin('isMetaMask')
      if (error.code === 4902 && currentProvider) {
        const chainId = `0x${projectChainId.toString(16)}`
        currentProvider
          .request?.({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainId,
                chainName: 'ZKSync Testnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: [project?.node || 'https://testnet.era.zksync.dev'],
                blockExplorerUrls: [project?.browser || 'https://goerli.explorer.zksync.io//'],
              },
            ],
          })
          .then(() => {
            connector.activate(projectChainId)
          })
      }
    })
  }, [connector])

  const deactivate = useCallback(() => {
    if (connector?.deactivate) {
      connector.deactivate()
    } else {
      connector.resetState()
    }
  }, [connector])

  const getWalletPlugin = useCallback((pluginkey: string | undefined) => {
    let pluginInfo = null
    if (!pluginkey) {
      return null
    }
    if (window.ethereum && window.ethereum[pluginkey]) {
      pluginInfo = window.ethereum
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window[pluginkey] && window[pluginkey].ethereum) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pluginInfo = window[pluginkey].ethereum
    }
    if (window.ethereum && window.ethereum.providers) {
      window.ethereum.providers.some((item: any) => {
        if (item[pluginkey]) {
          pluginInfo = item
          return true
        }
        return false
      })
    }
    return pluginInfo
  }, [])

  const validWalletPlugin = useCallback((pluginkey: string) => {
    if (!pluginkey) {
      return true
    }
    return !!getWalletPlugin(pluginkey)
    /*if (window.ethereum && window.ethereum[pluginkey]) {
            return true;
        }
        if (window.ethereum && window.ethereum.providers) {
            return window.ethereum.providers.some((item: any) => {
                return !!item[pluginkey];
            });
        }
        return false;*/
  }, [])

  return {
    connector,
    chainId,
    accounts,
    isActivating,
    isActive,
    provider,
    ENSNames,
    activate,
    deactivate,
    validWalletPlugin,
    getWalletPlugin,
    loginStatus,
  }
}
