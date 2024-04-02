
export interface ITrans {
    blockHash: any
    blockNumber: any
    chainId: number
    confirmations: number
    creates: any
    data: string
    from: string
    gasLimit: any
    gasPrice: any
    hash: string
    nonce: number
    status: number,
    type: string,
    symbol: string
}

export type IPairs = "BTC-USD" | "ETH-USD" | "DOT-USD";
