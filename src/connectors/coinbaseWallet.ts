import { initializeConnector } from '@web3-react/core'
import { CoinbaseWallet } from '@web3-react/coinbase-wallet'

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: "",
        appName: "Satori"
      },
    })
);
