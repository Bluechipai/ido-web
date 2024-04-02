import React, {
  ComponentType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import {MessageBox} from 'src/components/messageBox/MessageBox'

export const MessageContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  showMessage(msg: string, type?: any, content?: string): symbol {
    return Symbol('modal')
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  showError(error: any, title?: string): void {},
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  destoryMessageBox(modalId: symbol) {},
})

type IProps = {
  children: ReactNode
}
export interface IMessage {
  destoryComponent(): void
}
export default function MessageProvider(props: IProps) {
  const [messageData, setMessageData] = useState<{
    [propName: symbol]: {component: ComponentType<any>; props: any}
  }>({})
  const messageDataRef = useRef<{
    [propName: symbol]: {component: ComponentType<any>; props: any}
  }>({})

  useEffect(() => {
    messageDataRef.current = messageData
  }, [messageData])

  function showMessage(msg: string, type?: any, content?: string): symbol {
    const modalId = Symbol('modal')
    const data = Object.assign({}, messageDataRef.current)
    data[modalId] = {
      component: MessageBox,
      props: {
        title: msg,
        content: content,
        type: type,
      },
    }
    setMessageData(data)
    return modalId
  }

  return (
    <MessageContext.Provider
      value={{
        showMessage,
        showError(error: any, title?: string) {
          let msg = typeof error === 'string' ? error : 'failed'
          if (error.code) {
            switch (error.code) {
              case 4001:
                msg = 'Trade reject'
                break
              default:
                // eslint-disable-next-line no-case-declarations
                const resMsg =
                  (error && error.data && error.data.message) ||
                  JSON.stringify(error)
                msg = `Trade failed：${resMsg}`
            }
          }
          console.log('error')
          showMessage(title || msg || 'ERROR', 'warn', title ? msg : '')
        },
        destoryMessageBox(modalId: symbol) {
          setTimeout(() => {
            const data = Object.assign({}, messageDataRef.current)
            delete data[modalId]
            setMessageData(data)
          }, 50)
        },
      }}>
      <>
        {props.children}
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5100,
          }}>
          {Object.getOwnPropertySymbols(messageData).map((item, index) => {
            const Component = messageData[item].component
            const props = messageData[item].props || {}
            return (
              <Component
                key={index}
                {...props}
                destoryComponent={() => {
                  setTimeout(() => {
                    const data = Object.assign({}, messageDataRef.current)
                    delete data[item]
                    setMessageData(data)
                  }, 70)
                }}
              />
            )
          })}
        </div>
      </>
    </MessageContext.Provider>
  )
}
