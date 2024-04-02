import {ReactNode} from 'react'
import {withTranslation} from 'react-i18next'
import {UseWalletProvider} from 'use-wallet'
import MessageProvider from './MessageProvider.tsx'
import ModalProvider from '../components/ModalContext/ModalContext.tsx'
import {projectChainId} from '../contract/config.ts'

function AppProvider(props: {children: ReactNode}) {
  return (
    <UseWalletProvider chainId={projectChainId}>
      <MessageProvider>
        <ModalProvider>{props.children}</ModalProvider>
      </MessageProvider>
    </UseWalletProvider>
  )
}

export default withTranslation()(AppProvider)
