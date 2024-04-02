import {useQuery} from '@tanstack/react-query'
import {IPagination, IResponse} from './base.ts'
import {useAppSelector} from '../store'
import axios from 'axios'
import {IPlat} from './system.tsx'
import {IFundType} from '../utils/types.ts'

export type IUserStatistic = {
  inProgress: number
  success: number
  failure: number
  userRewards: string
  userFundeds: string
}
export function useQueryUserstatistic() {
  const userStore = useAppSelector((state) => state.users)
  const resData = useQuery<IResponse<IUserStatistic>>({
    queryKey: ['Userstatistic'],
    queryFn: () =>
      axios.get(`/plg/ido/iuser/userstatistic/${userStore.address}`),
    enabled: !!userStore.address,
  })

  return {data: resData.data?.data}
}

type ICreateLinkParams = {
  address: string | undefined
  deadline: number | undefined
  salt: number | undefined
  signature: string | undefined
}
export function useCreateLink(params: ICreateLinkParams) {
  const resData = useQuery<IResponse<{address: string; link: string}>>({
    queryKey: ['createLink'],
    queryFn: () => axios.post('/plg/ido/iuser/addLink', params),
    enabled: !!params.signature && !!params.address,
  })

  return {data: resData.data?.data}
}

export type IInviteList = {
  total: number
  undrawn: number
  withdrawing: number
  persons: number
}
export function useQueryInviteStatic() {
  const userStore = useAppSelector((state) => state.users)
  const resData = useQuery<IResponse<IInviteList>>({
    queryKey: ['inviteStatic'],
    queryFn: () =>
      axios.get(`/plg/ido/iuser/invitestatistic/${userStore.address}`),
    enabled: !!userStore.address,
  })

  return {data: userStore.address ? resData.data?.data : undefined}
}

export type IInviteListParams = {
  page: number
  pageSize: number
}
export type IInviteListItem = {
  id: string
  createdAt: number
  updatedAt: number
  address: string
  inviter: string
}
export function useQueryInviteList(params: IInviteListParams) {
  const userStore = useAppSelector((state) => state.users)
  const resData = useQuery<IResponse<IPagination<IInviteListItem>>>({
    queryKey: ['inviteList', params.page, params.pageSize],
    queryFn: () =>
      axios.post(`/plg/ido/iuser/invitelist`, {
        ...params,
        address: userStore.address,
      }),
    enabled: !!userStore.address,
  })

  return {
    data:
      userStore.address && resData.data?.data
        ? {...resData.data?.data}
        : undefined,
    isPending: resData.isPending && userStore.address,
  }
}

export type IRewardItem = {
  id: string
  createdAt: number
  updatedAt: number
  address: string
  amount: string
  source: string
  salt: number
  expireTime: any
  state: number
}
export function useQueryInviteReward(params: IInviteListParams) {
  const userStore = useAppSelector((state) => state.users)
  const resData = useQuery<IResponse<IPagination<IRewardItem>>>({
    queryKey: ['inviteReward', params.page, params.pageSize],
    queryFn: () =>
      axios.post(`/plg/ido/iuser/rewardslist`, {
        ...params,
        address: userStore.address,
      }),
    enabled: !!userStore.address,
  })

  return {
    data:
      userStore.address && resData.data?.data
        ? {...resData.data?.data}
        : undefined,
    isPending: resData.isPending && userStore.address,
  }
}


type IPlatParams = {
  page: number
  pageSize: number
  state?: number
  user?: string
  financingStatus?: number
  fundType: IFundType
}
export function useQueryUserPlat(params: IPlatParams, enabled = true) {
  const resData = useQuery<IResponse<IPagination<IPlat>>>({
    queryKey: ['statistic', params],
    queryFn: () => axios.post('/plg/ido/iuser/pubFund', params),
    enabled: enabled,
  })

  return {
    queryClient: resData,
    data: resData.data?.data ? {...resData.data?.data} : undefined,
    isPending: resData.isLoading,
  }
}

export function useQueryUserPrivateList(params: IPlatParams, enabled = true) {
  const resData = useQuery<IResponse<IPagination<IPlat>>>({
    queryKey: ['private', 'list', params],
    queryFn: () => axios.post('/plg/ido/iuser/privFund', params),
    enabled: enabled,
  })

  return {
    queryClient: resData,
    data: resData.data?.data,
    isPending: resData.isLoading,
  }
}

export function useQueryUserFundList(params: IPlatParams, enabled = true) {
  const resData = useQuery<IResponse<IPagination<IPlat>>>({
    queryKey: ['private', 'list', params],
    queryFn: () => axios.post('/plg/ido/iuser/userFund', params),
    enabled: enabled,
  })

  return {
    queryClient: resData,
    data: resData.data?.data,
    isPending: resData.isLoading,
  }
}


type IStakeRecord = {
  id: string
  createdAt: number
  updatedAt: number
  user: string
  amount: string
  interest: string
  wtime: number
  wdrawId: string
  day: number
  ratio: number
}

export function useQueryUserStakeWithdrawRecord(enabled = true) {
  const userStore = useAppSelector((state) => state.users)
  const resData = useQuery<IResponse<IStakeRecord[]>>({
    queryKey: ['userFund', 'list'],
    queryFn: () => axios.get(`/plg/ido/iuser/swdrawlist/${userStore.address}`),
    enabled: enabled,
  })

  return {
    queryClient: resData,
    data: resData.data,
    isPending: resData.isLoading,
  }
}
