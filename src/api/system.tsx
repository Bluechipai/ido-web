import {useQuery} from '@tanstack/react-query'
import {IPagination, IResponse} from './base.ts'
import axios from 'axios'
import {useAppSelector} from '../store'

export type ISignData = {
  fundraisingNo: string
  decimals: number
  r: string
  s: string
  v: number
  deadline: number
  salt: number
}

export type IStatistic = {
  id: string
  createdAt: null
  updatedAt: null
  quantity: number
  projects: number
  persons: number
  directRewards: number
  secondRewards: number
}

export function useQueryStatistic() {
  const resData = useQuery<IResponse<IStatistic>>({
    queryKey: ['statistic'],
    queryFn: () => axios.get('/plg/ido/iuser/statistic'),
    enabled: true,
  })

  return {data: resData.data?.data}
}

type IPrivateParams = {
  page: number
  pageSize: number
  financingStatus?: number
}
type IProject = {
  id: string
  createdAt: number
  updatedAt: number
  projName: string
  logoUrl: string
  network: string
  networkType: number
  projType: string
  website: string
  tokenName: string
  tokenSymbol: string
  tokenPrice: string
  marketTime: string
  content: string
  quantity: string
  initAmount: string
  totalAmount: string
  privateAmount: string
  publicAmount: string
  idoAbout: string
  state: number
  investors: any
  tokenSales: any
  communitys: any
  additionals: any
  applyName: string
  applyAddr: string
  contactWay: string
  isApply: number
}
export type IPrivateItem = {
  id: string
  createdAt: number
  updatedAt: number
  projId: string
  project: IProject
  fundraisingNo: string
  subscribePrice: string
  pledgeReward: string
  minAmount: string
  maxAmount: string
  riskLevel: number
  state: number
  isSync: boolean
  tryTimes: number
  fundType: number
  userId: string
  fundedAmount: string
  user: string
  token: string
  userFunded: string
  userRewards: string
  isTransOut: boolean
  wdrawState: number
}
export function useQueryPrivateList(params: IPrivateParams, disabled?: boolean) {
  const resData = useQuery<IResponse<IPagination<IPlat>>>({
    queryKey: ['privateList', params],
    queryFn: () => axios.post('plg/ido/iuser/privHome', params),
    enabled: !disabled,
  })

  return {
    data: resData.data?.data,
    isPending: resData.isLoading,
  }
}
export function useQueryPrivateDetail(id: string) {
  const resData = useQuery<IResponse<IPrivateItem>>({
    queryKey: ['privateDetail', id],
    queryFn: () => axios.get(`/plg/ido/iuser/privDetail/${id}`),
    enabled: true,
  })

  return {data: resData.data?.data}
}

type IPlatParams = {
  page: number
  pageSize: number
  state?: number
  user?: string
  financingStatus?: number
}

export interface Project {
  id: string
  createdAt: number
  updatedAt: number
  projName: string
  logoUrl: string
  network: string
  networkType: number
  projType: string
  website: string
  tokenName: string
  tokenSymbol: string
  tokenPrice: string
  marketTime: string
  content: string
  quantity: string
  initAmount: string
  totalAmount: string
  privateAmount: string
  publicAmount: string
  idoAbout: string
  state: number
  financings: any
  tokenSales: any
  communitys: any
  additionals: any
}
export type IPlat = {
  id: string
  createdAt: number
  updatedAt: number
  projId: string
  project: Project
  fundraisingNo: string
  fundraisingToken: string
  tokenAddress: string
  subscribePrice: string
  pledgeReward: string
  platPrice: string
  minAmount: string
  maxAmount: string
  riskLevel: number
  state: number
  isSync: boolean
  tokenDecimals: number
  tryTimes: number
  fundedAmount: string
  userFunded: string
  userRewards: string
  isTransOut: boolean
  token: string
  wdrawState: number
  fundType: number
}
export function useQueryPlat(params: IPlatParams) {
  const resData = useQuery<IResponse<IPagination<IPlat>>>({
    queryKey: ['statistic', params.page, params.pageSize, params.state],
    queryFn: () => axios.post('/plg/ido/platform/plat', params),
    enabled: true,
  })

  return {data: resData.data?.data}
}
export function useQueryPlatHome(params: IPlatParams, disabled?: boolean) {
  const resData = useQuery<IResponse<IPagination<IPlat>>>({
    queryKey: ['statistic', params],
    queryFn: () => axios.post('/plg/ido/iuser/pubHome', params),
    enabled: !disabled,
  })

  return {
    data: resData.data?.data ? {...resData.data?.data} : undefined,
    isPending: resData.isLoading,
  }
}

export function useQueryPlatUser(params: IPlatParams) {
  const userStore = useAppSelector((state) => state.users)
  const resData = useQuery<IResponse<IPagination<IPlat>>>({
    queryKey: [
      'statistic',
      params.page,
      params.pageSize,
      params.financingStatus,
    ],
    queryFn: () => axios.post('/plg/ido/iuser/user', params),
    enabled: !!userStore.address,
  })

  return {
    data: resData.data?.data ? {...resData.data?.data} : undefined,
    isPending: resData.isPending,
  }
}

export function useQueryPlatformStatus(type: string) {
  const resData = useQuery<IResponse<{[propsName: number]: string}>>({
    queryKey: ['platformStatus', type],
    queryFn: () => axios.get(`/plg/ido/platform/map/${type}`),
    enabled: true,
  })

  return {data: resData.data?.data}
}

// export function useQuery() {
//   const resData = useQuery<IResponse<{ [propsName: number]: string }>>({
//     queryKey: ['platformStatus', type],
//     queryFn: () => axios.get(`/plg/ido/platform/map/${type}`),
//     enabled: true
//   });
//
//   return { data: resData.data?.data }
// }

export interface ILaunchpadDetail {
  id: string
  createdAt: number
  updatedAt: number
  projName: string
  logoUrl: string
  network: string
  networkType: number
  projType: string
  website: string
  tokenName: string
  tokenSymbol: string
  tokenPrice: string
  marketTime: string
  content: string
  quantity: string
  initAmount: string
  totalAmount: string
  privateAmount: string
  publicAmount: string
  idoAbout: string
  fundType: number
  financings: Financing[]
  investors: Investor[]
  tokenSales: any[]
  communitys: Community[]
  additionals: any[]
  projId: string
  fundraisingNo: string
  fundraisingToken: string
  fundedAmount: string
  tokenAddress: string
  subscribePrice: string
  pledgeReward: string
  platPrice: string
  minAmount: string
  maxAmount: string
  riskLevel: number
  state: number
  tokenDecimals: number
}

export interface Financing {
  id: string
  createdAt: number
  updatedAt: number
  projId: string
  name: string
  amount: string
  financingTime: string
  investors: Investor[]
}

export interface Investor {
  id: string
  createdAt: number
  updatedAt: number
  financingId: string
  name: string
  logoUrl: string
  personalHome: string
}

export interface Community {
  id: string
  createdAt: number
  updatedAt: number
  projId: string
  name: string
  url: string
  remark: string
}

export function useQueryLaunchpadDetail(id?: string) {
  const resData = useQuery<IResponse<ILaunchpadDetail>>({
    queryKey: ['LaunchpadDetail', id],
    queryFn: () => axios.get(`/plg/ido/platform/fundraising/${id}`),
    enabled: !!id,
  })

  return {data: resData.data?.data}
}

export type IMarketItem = {
  id: string
  createdAt: number
  updatedAt: number
  fundraisingNo: string
  index: number
  user: string
  outTime: number
  quantity: string
  percentFee: string
  state: number
  fundraising: IMarketFundraising
}
export interface IMarketFundraising {
  id: string
  createdAt: number
  updatedAt: number
  projId: string
  project: IMarketProject
  fundraisingNo: string
  fundraisingToken: string
  tokenAddress: string
  subscribePrice: string
  pledgeReward: string
  platPrice: string
  minAmount: string
  maxAmount: string
  riskLevel: number
  state: number
  isSync: boolean
  tokenDecimals: number
  tryTimes: number
}

export interface IMarketProject {
  id: string
  createdAt: number
  updatedAt: number
  projName: string
  logoUrl: string
  network: string
  networkType: number
  projType: string
  website: string
  tokenName: string
  tokenSymbol: string
  tokenPrice: string
  marketTime: string
  content: string
  quantity: string
  initAmount: string
  totalAmount: string
  privateAmount: string
  publicAmount: string
  idoAbout: string
  state: number
  financings: any
  tokenSales: any
  communitys: any
  additionals: any
}

export function useQueryMarketList(params: IPlatParams) {
  const resData = useQuery<IResponse<IPagination<IMarketItem>>>({
    queryKey: ['marketList', params.page, params.pageSize],
    queryFn: () => axios.post('/plg/ido/iuser/transout', params),
    enabled: true,
  })

  return {
    data: resData.data?.data ? {...resData.data?.data} : undefined,
    isPending: resData.isPending,
  }
}

export function useQueryOrders(params: {page: number; pageSize: number}) {
  const userStore = useAppSelector((state) => state.users)
  const resData = useQuery<IResponse<IPagination<IMarketItem>>>({
    queryKey: ['orderList', params.page, params.pageSize],
    queryFn: () => axios.post('/plg/ido/iuser/usertransout', params),
    enabled: !!userStore.address,
  })

  return {
    data: resData.data?.data ? {...resData.data?.data} : undefined,
    isPending: resData.isPending,
  }
}

export type ISupportTokensDecimal = {
  [key: string]: number
}
export function useQuerySupportTokensDecimal() {
  const resData = useQuery<IResponse<ISupportTokensDecimal>>({
    queryKey: ['getSupportTokensDecimal'],
    queryFn: () => axios.get(`/plg/ido/iuser/decimals`),
    enabled: true,
  })

  return {data: resData.data?.data}
}
