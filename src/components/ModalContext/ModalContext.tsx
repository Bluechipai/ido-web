import React, { ComponentType, ReactNode, useEffect, useRef, useState } from 'react';

// @ts-ignore
export const ModalContext = React.createContext({
  // @ts-ignore
  openModal<T>(ModalComponent: ComponentType<T & IOpenModal>, props?: T): symbol {
    return Symbol("modal");
  },
  // @ts-ignore
  destoryModal(modalId: symbol) {

  }
});

type IProps = {
  children: ReactNode
}

export interface IOpenModal {
  destoryComponent(): void
}

export default function ModalProvider(props: IProps) {
  const [modalData, setModalData] = useState<{ [propName: symbol]: { component: ComponentType<any>, props: any } }>({});
  const modalDataRef = useRef<{ [propName: symbol]: { component: ComponentType<any>, props: any } }>({});
  console.log(modalData)
  useEffect(() => {
    modalDataRef.current = modalData;
  }, [modalData]);

  return (
    <ModalContext.Provider value={{
      openModal<T>(ModalComponent: ComponentType<T & IOpenModal>, props?: T): symbol {
        const modalId = Symbol("modal");
        const data = Object.assign({}, modalDataRef.current);
        data[modalId] = {
          component: ModalComponent,
          props: props
        };
        setModalData(data);
        return modalId;
      },
      destoryModal(modalId: symbol) {
        setTimeout(() => {
          const data = Object.assign({}, modalDataRef.current);
          delete data[modalId];
          setModalData(data);
        }, 50);
      }
    }}>
      <>
        {props.children}
        {
          Object.getOwnPropertySymbols(modalData).map((item, index) => {
            const Component = modalData[item].component;
            const props = modalData[item].props || {};
            return <Component key={index} {...props} destoryComponent={() => {
              setTimeout(() => {
                const data = Object.assign({}, modalDataRef.current);
                delete data[item];
                setModalData(data);
              }, 70);
            }}/>
          })
        }
      </>
    </ModalContext.Provider>
  )
}
