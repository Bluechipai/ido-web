import {CSSProperties} from "react";
import { hooks as metaMaskHooks, metaMask } from 'src/connectors/metaMask';
// import { hooks as cloverHooks, metaMask as cloverMetaMask } from 'src/connectors/Clover';
import { hooks as coinbaseHooks, coinbaseWallet } from 'src/connectors/coinbaseWallet';
import { hooks as walletConnectHooks, walletConnect } from 'src/connectors/walletConnect'
// @ts-ignore
import {Web3ReactHooks} from "@web3-react/core/dist/hooks";
import erc20_ from './abi/erc20.json'
import multicall_ from './abi/multicall.json'
import project_clover_ from './projects/project_clover.json'
import project_moonbeam_ from './projects/project_moonbeam.json'
import project_astar_ from './projects/project_astar.json'
import project_acala_ from './projects/project_acala.json'
import project_bsc_ from './projects/project_bsc.json'
import project_ from './project.json'
import project_dao_ from './project_dao.json'

export const erc20 = erc20_;
export const multicall = multicall_;
export const project_Clover = project_clover_;
export const project_Moonbeam = project_moonbeam_;
export const project_Astar = project_astar_;
export const project_Acala = project_acala_;
export const project_BSC = project_bsc_;
export const project = project_;
export const project_dao = project_dao_;

export const precision = 6;
export const maxLoanRate = 0.75;

export const MaxApproveBalance = "1000000000000000000000000000000000";
export const minAllowance = "1000000000000000000000000000000";
export const zeroAddress = "0x0000000000000000000000000000000000000000";

export const settleCoinSymbol = "USD";
export const settleChainCoinSymbol = "USDT";

export const projectChainId = 280;

export type supportWallets =
    "metamask"
    | "clover"
    | "Coinbase"
    | "TrustWallet"
    | "TokenPocket"
    | "WalletConnect"
    | "polkadot"
    | "safePal"
    | "bitkeep"
    | "coin98" | "iToken" | "Rainbow" | "imToken";
export const WALLETS: {[key in supportWallets]: IWallet} = {
    metamask: {
        canClick: true,
        name: "MetaMask",
        icon: '',
        plugin: "isMetaMask",
        iconStyle: {},
        download: "https://metamask.io/download/",
        hooks: metaMaskHooks,
        connector: metaMask
    },
    clover: {
        canClick: false,
        name: "Clover Wallet",
        icon: '',
        plugin: "clover",
        iconStyle: {},
        download: "https://docs.clv.org/use-clv-wallet/download-clv-wallet",
        hooks: metaMaskHooks,
        connector: metaMask
    },
    Coinbase: {
        canClick: true,
        name: "Coinbase Wallet",
        icon: '',
        plugin: "isCoinbaseWallet",
        iconStyle: {},
        download: "https://www.coinbase.com/wallet/getting-started-extension",
        hooks: coinbaseHooks,
        connector: coinbaseWallet
    },
    TrustWallet: {
        canClick: true,
        name: "Trust Wallet",
        icon: '',
        plugin: "isTrustWallet",
        iconStyle: {},
        download: "https://trustwallet.com/download",
        hooks: metaMaskHooks,
        connector: metaMask
    },
    TokenPocket: {
        canClick: true,
        name: "Token Pocket",
        icon: '',
        plugin: "",
        iconStyle: {},
        download: "https://www.tokenpocket.pro/en/download/pc",
        hooks: metaMaskHooks,
        connector: metaMask
    },
    WalletConnect: {
        canClick: true,
        name: "Wallet Connect",
        icon: '',
        plugin: "",
        iconStyle: {},
        download: "https://walletconnect.com/",
        hooks: walletConnectHooks,
        connector: walletConnect
    },
    polkadot: {
        canClick: false,
        name: "Polkadot js",
        icon: '',
        plugin: "polkadot",
        iconStyle: {},
        download: "https://polkadot.js.org/extension/",
        hooks: metaMaskHooks,
        connector: metaMask
    },
    safePal: {
        canClick: false,
        name: "SafePal",
        icon: '',
        plugin: "isSafePal",
        iconStyle: {},
        download: "https://www.opera.com/crypto/next",
        hooks: metaMaskHooks,
        connector: metaMask
    },
    bitkeep: {
        canClick: true,
        name: "bitkeep",
        icon: '',
        plugin: "bitkeep",
        iconStyle: {},
        download: "https://bitkeep.io/zh/download?type=2",
        hooks: metaMaskHooks,
        connector: metaMask
    },
    coin98: {
        canClick: true,
        name: "coin98 wallet",
        icon: '',
        plugin: "isCoin98",
        iconStyle: {},
        download: "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg?hl=en",
        hooks: metaMaskHooks,
        connector: metaMask
    },
    iToken: {
        canClick: true,
        name: "iToken",
        icon: '',
        plugin: "",
        iconStyle: {},
        download: "https://www.itoken.com/",
        hooks: walletConnectHooks,
        connector: walletConnect
    },
    imToken: {
        canClick: true,
        name: "imToken",
        icon: '',
        plugin: "",
        iconStyle: {},
        download: "https://token.im/",
        hooks: walletConnectHooks,
        connector: walletConnect
    },
    Rainbow: {
        canClick: true,
        name: "Rainbow",
        icon: '',
        plugin: "",
        iconStyle: {},
        download: "https://rainbow.me/",
        hooks: walletConnectHooks,
        connector: walletConnect
    }
};
export type IWallet = {
    canClick: boolean,
    name: string,
    icon: string,
    plugin: string,
    iconStyle: CSSProperties,
    download: string,
    hooks: Web3ReactHooks,
    connector: any
};
/*export type IChain = {
    name: string,
    icon: string,
    wallet: IWallet[],
    project: any
}*/
/*type key = "Clover" | "Moonbeam" | "Astar";*/
export enum PROJECT_TYPE {
    project = 'project',
    project_loan = 'project_loan',
    project_dao = 'project_dao'
}
export const CHAINS = {
    BSC: {
        name: "BSC-Test",
        icon: '',
        wallet: [WALLETS.metamask, WALLETS.clover, WALLETS.Coinbase,  WALLETS.TrustWallet,  WALLETS.TokenPocket,  WALLETS.WalletConnect],
        project: project_BSC,
        project_loan: project_BSC,
        project_dao: project_dao,
        browser: "https://testnet.bscscan.com/tx/",
        knownContracts: {
            multicall: "0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576"
        }
    },
    Clover: {
        name: "Clover",
        icon: 'cloverIcon',
        wallet: [WALLETS.metamask, WALLETS.clover, WALLETS.Coinbase,  WALLETS.TrustWallet,  WALLETS.TokenPocket,  WALLETS.WalletConnect],
        project: project_Clover,
        project_loan: project_Clover,
        project_dao: project_dao,
        browser: "https://clover-testnet.subscan.io/tx/",
        knownContracts: {
            multicall: "0xA8Db6e2B504Bb043E21f8bDA73b009a4049C5e38"
        }
    },
    Moonbeam: {
        name: "Moonbeam",
        icon: '',
        wallet: [WALLETS.metamask, WALLETS.clover, WALLETS.Coinbase,  WALLETS.TrustWallet,  WALLETS.TokenPocket,  WALLETS.WalletConnect],
        project: project_Moonbeam,
        project_loan: project_Moonbeam,
        project_dao: project_dao,
        browser: "https://moonbase.moonscan.io/tx/",
        knownContracts: {
            multicall: "0xbeDadB1312356F817FAc188B8D8385b184Be541b"
        }
    },
    Astar: {
        name: "Astar",
        icon: '',
        wallet: [WALLETS.metamask, WALLETS.clover, WALLETS.Coinbase,  WALLETS.TrustWallet,  WALLETS.TokenPocket,  WALLETS.WalletConnect],
        project: project_Astar,
        project_loan: project_Astar,
        project_dao: project_dao,
        browser: "https://shibuya.subscan.io/tx/",
        knownContracts: {
            multicall: "0x8E232581C5a211a2B2A3b4911e5C8a4b0Cf8b212"
        }
    },
    // Parallel: {name: "Parallel", icon: "", wallet: [wallets.polkadot]},
    // Acala: {
    //     name: "Acala",
    //     icon: require("src/assets/images/Alcala.png"),
    //     wallet: [WALLETS.metamask, WALLETS.clover, WALLETS.Coinbase,  WALLETS.TrustWallet,  WALLETS.TokenPocket,  WALLETS.WalletConnect],
    //     project: project_Acala,
    //     project_loan: null,
    //     project_dao: project_dao,
    //     browser: "https://acala-testnet.subscan.io/extrinsic/",
    //     knownContracts: {
    //         multicall: ""
    //     }
    // }
};

export type IChain = typeof CHAINS.BSC;

export function getChainInfo(chainId: number | string): IChain | null  {
    let chainInfo : IChain | null = null;
    const n_chainId = typeof chainId === "string" ? Number(chainId) : chainId;
    Object.values(CHAINS).some((item) => {
        if(item.project.chainid === n_chainId) {
            chainInfo = item;
            return true;
        }
        return false;
    });
    return chainInfo;
}

export function getWalletInfoByName(walletName: string): IWallet | null  {
    let walletInfo : IWallet | null = null;
    Object.values(WALLETS).some((item) => {
        if(item.name === walletName) {
            walletInfo = item;
            return true;
        }
        return false;
    });
    return walletInfo;
}
