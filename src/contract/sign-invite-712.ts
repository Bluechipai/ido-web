import { useWalletTools } from "../hooks/useWalletTools.ts";
import {useCallback, useState} from 'react'
import { project } from "./config.ts";
import {ArrayElementType} from '../utils/types.ts'
// Our domain will include details about our app
const domainData = {
  name: 'IDO Protocol',
  version: '1',
  verifyingContract: project.contracts.IDO.address
};

// Here we define the different types our message uses
const defaultLinkType =  [
  { name: 'account', type: 'address' },
  // { name: 'inviter', type: 'address' },
  { name: 'deadline', type: 'uint256' },
  { name: 'salt', type: 'uint256' }
];

export type ISignRes = {
  signature: string,
  deadline: number,
  salt: number
}

export function useSignInvite712(linkType: ArrayElementType<typeof defaultLinkType>[]) {
  const { provider } = useWalletTools();
  // const userStore = useAppSelector((state) => state.users)
  const [signature, setSignature  ] = useState<string | undefined>()
  const [deadline, setDeadline  ] = useState<number | undefined>()
  const [salt, setSalt  ] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //     if (provider && userStore.address) {
  //         getSign()
  //     }
  // }, [provider, userStore.address])

  const getSign = useCallback(async (address: string, msg: {[key: string]: string}): Promise<ISignRes> => {
    // Domain type
    const domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "verifyingContract", type: "address" }
    ];

    const _deadline = Math.ceil( (new Date().getTime() + 30 * 60 * 1000) / 1000 );
    const _salt = new Date().getTime();
    // Message
    const message = {
      account: address,
      // inviter: inviter,
      deadline: _deadline,
      salt: _salt,
      ...msg
    };

    const PermitArr = defaultLinkType.concat()
    PermitArr.splice(1, 0, ...linkType)
    // EIP712 data
    const data = JSON.stringify({
      types: {
        EIP712Domain: domain,
        Permit: PermitArr
      },
      domain: domainData,
      primaryType: 'Permit',
      message: message,
    });
    // Get signer address
    // const signer = (await provider.request({ method: "eth_requestAccounts" }))[0];
    // console.log('***********')
    // console.log(signer)
    // Sign message
    setLoading(true)
    const rawSignature = await provider?.provider
      .request({
        method: "eth_signTypedData_v3",
        params: [address, data],
        from: address,
      })
      .catch((error: any) => {
        // Alert
        alert(error.message);
        // Throw
        throw new Error(error.message);
      });
    setLoading(false)
    console.log('+++?????????')
    console.log(rawSignature)
    // Parse signature
    // const signature = parseSignature(rawSignature.substring(2));
    // console.log(signature)
    setSignature(rawSignature);
    setDeadline(_deadline);
    setSalt(_salt)

    return {
      signature: rawSignature,
      deadline: _deadline,
      salt: _salt
    }
  }, [linkType, provider?.provider])

  return { signature, deadline, salt, getSign, loading  }
}

