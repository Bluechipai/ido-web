import Web3 from "web3";
import {BigNumber, ethers} from "ethers";
import {useMemo} from "react";
import { erc20, MaxApproveBalance, minAllowance, project, PROJECT_TYPE } from "../contract/config";
import {ITrans} from "../contract/types";
import PubSub from "pubsub-js";
import {Decimal} from "decimal.js";
import {useWalletTools} from "./useWalletTools";

export interface ISignatrua {
    origin: string
    signatrue: string
}
type IApprove = {
    token: string,
    owner: string,
    spender: string
}

export function usePluginModel(project_name: PROJECT_TYPE = PROJECT_TYPE.project) {
    // const storeData = useAppSelector((state) => state.users);
    const {provider, chainId} = useWalletTools(null, project);
    // const Provider = useMemo(() => {
    //     // @ts-ignore
    //     return storeData.wallet_info?window[storeData.wallet_info.plugin]:undefined;
    // }, [storeData.wallet_info]);
    const Provider: any = useMemo(() => {
        return provider ? provider.provider : undefined;
    }, [provider]);

    function getProvider() {
        console.log("=========project_name", project_name)
        console.log("=========project_node",  project.node)
        return ethers.getDefaultProvider( project.node);
        //return providers.getDefaultProvider(networks.getNetwork(chainID));
    }

    function getWallet() {
        if (!Provider){
            return ;
        }
        return new ethers.providers.Web3Provider(Provider).getSigner();
    }

    function NewReadContract(address: string, abi: any[]) {
        return new ethers.Contract(address, abi, getProvider());
    }

    function NewWriteContract<T = any>(address: string, abi: any[]): T {
        return new ethers.Contract(address, abi, getWallet()) as any;
    }

    async function signMsg(signObj: any, walletAddress: string) : Promise<ISignatrua>{
        const originData = typeof signObj === "string" ? signObj : JSON.stringify(signObj);
        /*const signature = await getWallet().signMessage(originData);
        return {origin: originData, signatrue: signature}*/

        return signString(originData, walletAddress);
    }

    async function signString(str: string, address: string) : Promise<ISignatrua>{
        if (!Provider){
            return Promise.reject();
        }
        const web3Provider = new Web3(Provider);

        return new Promise((resolve, reject) => {
            web3Provider.eth.personal.sign(str, address, "", (err: any, res: any) => {
                if (!err) {
                    resolve({origin: str, signatrue: res});
                } else {
                    if(err.code === -32602){
                        PubSub.publish('wallet_logout');
                    }
                    reject(err);
                }
            })
        });
    }

    function needApprove(params: IApprove): Promise<boolean> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            const contract = NewReadContract(params.token, erc20);
            const [allowance] = await Promise.all([
                contract.allowance(params.owner, params.spender),
            ]);

            if (BigNumber.from(minAllowance).lt(allowance)) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    function approve(params: IApprove): Promise<ITrans> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            const contract = NewWriteContract(params.token, erc20);
            contract.approve(params.spender, MaxApproveBalance).then((res:ITrans) => {
                resolve(res)
            }).catch((error:any) => {
                console.log(error)
                reject(error);
            });
        });
    }

    function checkHashStatus(tranInfo: ITrans) {

        // eslint-disable-next-line @typescript-eslint/ban-types
        function checkStatus(currentHash:string, callback: Function) {
            if (!Provider){
                return ;
            }
            const instance = new ethers.providers.Web3Provider(Provider);
            //const instance = new web3(chainNode);
            //instance.eth.getTransactionReceipt(currentHash).then((res) => {
            instance.getTransactionReceipt(currentHash).then((res) => {
                if (res && res.status) {
                    PubSub.publish("reload.balance");
                    callback(true);
                } else if(res) {
                    callback(false);
                } else {
                    setTimeout(() => {
                        checkStatus(currentHash, callback);
                    }, 3 * 1000);
                }
            })
        }

        return new Promise((resolve, reject) => {
            checkStatus(tranInfo.hash, (res: boolean) => {
                res ? resolve(true) : reject()
            })
        });
    }

    async function getTokenBalance(account: string, address: string): Promise<number> {
        const contract = NewReadContract(address, erc20);
        const [balance, decimals] = await Promise.all([
            contract.balanceOf(account),
            contract.decimals(),
        ]);
        return Decimal.div( balance.toString(), Math.pow(10, decimals)).toNumber();
    }


    return {
        signMsg,
        signString,
        Provider,
        NewReadContract,
        NewWriteContract,
        getProvider,
        checkHashStatus,
        needApprove,
        approve,
        project: project,
        USDT_decimal: project.contracts.USDT.address,
        getTokenBalance,
        chainId
    };
}
