import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => {
    console.log("***********")
    console.log(actions)
    return new MetaMask({ actions })
});
