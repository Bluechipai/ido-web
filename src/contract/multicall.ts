import {ethers} from "ethers";

interface CallItem {
    abi: any
    contract: string
    funcName: string
    params?: any[]
}

export class Multicall {
    public callItems:CallItem[] = []
    public callDatas:any[] = []
    private instant:any

    // readonly multicallAddr:string = ""

    constructor( instant: any) {
        // this.multicallAddr = multicallAddr
        this.instant = instant
    }

    public reset() {
        this.callItems = []
        this.callDatas = []
    }

    public append(abi:any, contract:string, funcName:string, params?:any[]) {
        let obj = new ethers.utils.Interface(abi)
        this.callItems.push({
            abi: abi,
            contract: contract,
            funcName: funcName,
            params: params,
        })

        const data = obj.encodeFunctionData(funcName, params)
        this.callDatas.push({
            target: contract,
            callData: data
        })
    }

     public async call() {
         const resp = await this.instant.aggregate(this.callDatas)
         const list = []
         for (let i = 0; i < resp[1].length; i++) {
            let obj = new ethers.utils.Interface(this.callItems[i].abi)
            const result = obj.decodeFunctionResult(this.callItems[i].funcName, resp[1][i])
             list.push(result)
         }

         return list
    }
}
