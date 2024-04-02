import React, { ReactNode, useMemo } from 'react';

type IProps = {
  children: ReactNode;
  flag?: boolean;
  active?: number;
};
export default function Toggle(props: IProps) {
  const { children, active, flag } = props;
  const element = useMemo(() => {
    let match = false;
    let elementDom = null;
    React.Children.forEach(children, (item: any, index) => {
      if (match) {
        return;
      }
      if (typeof active === 'number') {
        if (active === index) {
          match = true;
          elementDom = item;
        }
      } else if (flag && index === 0) {
        match = true;
        elementDom = item;
      } else if (!flag && index === 1) {
        match = true;
        elementDom = item;
      }
    });
    return elementDom;
  }, [flag, children, active]);

  return <>{element ? React.cloneElement(element) : null}</>;
}
