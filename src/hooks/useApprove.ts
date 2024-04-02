import {useEffectState} from "./useEffectState";
import {useEffect} from "react";
import {usePluginModel} from "./usePluginModel";
import {PROJECT_TYPE} from "../contract/config";
import { useAppSelector } from "../store";
import { awaitWrap } from "../utils/tools.ts";

type IApproveParams = {
    project_name?: PROJECT_TYPE
    tokenAddress: string | undefined
    spenderAddress: string
}
export default function useApprove(props: IApproveParams) {
    const userStore = useAppSelector((state) => state.users)
    const {project, needApprove, approve, checkHashStatus} = usePluginModel(props.project_name);
    const state = useEffectState({
        approveStatus: true,
        loading: false
    });

    useEffect(() => {
        state.approveStatus = true;
        if (project && userStore.address) {
            checkApproveStatus();
        }
    }, [project, userStore.address, props.tokenAddress, props.spenderAddress]);

    async function checkApproveStatus() {
        if (userStore.address && props.tokenAddress) {
            const a = {
                token: props.tokenAddress,
                owner: userStore.address,
                spender: props.spenderAddress
            };
            state.loading = true;
            state.approveStatus = await needApprove(a);
            state.loading = false;
        }
    }

    async function approveToken() {
        if (!props.tokenAddress) {
          return
        }
        const a = {
            token: props.tokenAddress,
            owner: userStore.address,
            spender: props.spenderAddress
        };
        state.loading = true;
        const [transInfo, error] = await awaitWrap(approve(a));
        if (error) {
            console.log(error);
        } else {
            await checkHashStatus(transInfo);
            state.approveStatus = true;
        }
        state.loading = false;
    }

    return {...state, approveToken};
}
