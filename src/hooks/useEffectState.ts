import {useRef, useState} from 'react';
// import { useReactive, useUpdateEffect } from 'ahooks';

export function useEffectState<T extends NonNullable<unknown>>(initData: T): T {
    /*const state = useReactive(initData);
    return state;*/
    const [data, setData] = useState(initData);
    const dataRef = useRef(data);

    const copyData = {...data};
    for (const variable in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(variable)) {
            Object.defineProperty(dataRef.current, variable, {
                set(value) {
                    copyData[variable] = value;
                    setData(copyData);
                    return value;
                },
                get() {
                    return copyData[variable];
                }
            })
        }
    }
    return dataRef.current;
}
