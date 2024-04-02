import {useWalletTools} from '../hooks/useWalletTools.ts'
import {useAppSelector} from '../store'
import {useState} from 'react'
import {project} from './config.ts'

// Our domain will include details about our app
const domainData = {
  name: 'IDO Protocol',
  version: '1',
  verifyingContract: project.contracts.IDO.address,
}

// Here we define the different types our message uses
const linkType = [
  {name: 'account', type: 'address'},
  {name: 'deadline', type: 'uint256'},
  {name: 'salt', type: 'uint256'},
]

export function useSign712() {
  const {provider} = useWalletTools()
  const userStore = useAppSelector((state) => state.users)
  const [signature, setSignature] = useState<string | undefined>()
  const [deadline, setDeadline] = useState<number | undefined>()
  const [salt, setSalt] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //     if (provider && userStore.address) {
  //         getSign()
  //     }
  // }, [provider, userStore.address])

  async function getSign() {
    // Domain type
    const domain = [
      {name: 'name', type: 'string'},
      {name: 'version', type: 'string'},
      {name: 'verifyingContract', type: 'address'},
    ]

    const _deadline = Math.ceil((new Date().getTime() + 30 * 60 * 1000) / 1000)
    const _salt = new Date().getTime()
    // Message
    const message = {
      account: userStore.address,
      deadline: _deadline,
      salt: _salt,
    }

    // EIP712 data
    const data = JSON.stringify({
      types: {
        EIP712Domain: domain,
        Permit: linkType,
      },
      domain: domainData,
      primaryType: 'Permit',
      message: message,
    })
    // Get signer address
    // const signer = (await provider.request({ method: "eth_requestAccounts" }))[0];
    // console.log('***********')
    // console.log(signer)
    // Sign message
    setLoading(true)
    const rawSignature = await provider?.provider
      .request({
        method: 'eth_signTypedData_v3',
        params: [userStore.address, data],
        from: userStore.address,
      })
      .catch((error: any) => {
        // Alert
        alert(error.message)
        setLoading(false)
        // Throw
        throw new Error(error.message)
      })
    setLoading(false)
    console.log('+++?????????')
    console.log(rawSignature)
    // Parse signature
    // const signature = parseSignature(rawSignature.substring(2));
    // console.log(signature)
    setSignature(rawSignature)
    setDeadline(_deadline)
    setSalt(_salt)
  }

  return {signature, deadline, salt, getSign, loading}
}
