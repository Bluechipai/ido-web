import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from './index.ts'
import {IChain, IWallet} from '../contract/config.ts'
import {langType} from '../config.ts'
import {ISupportTokensDecimal} from '../api/system.tsx'

export enum ITheme {
  dark = 'dark',
  light = 'light',
}
// Define a type for the slice state
interface UserState {
  username: string
  network: IChain | null
  wallet_info: IWallet | null
  isH5: boolean
  address: string
  language: string
  theme: ITheme
  supportTokens: ISupportTokensDecimal
  chipRadio: number
}

// Define the initial state using that type
const initialState: UserState = {
  username: 'sss',
  network: null,
  wallet_info: null,
  isH5: false,
  address: sessionStorage.getItem('wallet_address') || '',
  language: sessionStorage.getItem('lang') || langType.en_US,
  // theme: localStorage.getItem('theme') as ITheme,
  theme: ITheme.dark,
  supportTokens: {},
  chipRadio: 0
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAddress: (state, action: PayloadAction<string>) => {
      sessionStorage.setItem('wallet_address', action.payload)
      state.address = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setLanguage(state, action: PayloadAction<string>) {
      sessionStorage.setItem('lang', action.payload)
      state.language = action.payload
    },
    setTheme(state, action: PayloadAction<ITheme>) {
      localStorage.setItem('theme', action.payload)
      state.theme = action.payload
    },
    setSupportTokens: (state, action: PayloadAction<ISupportTokensDecimal>) => {
      state.supportTokens = action.payload
    },
    setChipRadio: (state, action: PayloadAction<number>) => {
      state.chipRadio = action.payload
    },
  },
})

export const {setUserName} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const userStore = (state: RootState) => state.users

export default userSlice.reducer
