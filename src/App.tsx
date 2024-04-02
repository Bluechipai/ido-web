import './App.css'
import Router from './router/routers.tsx'
import Header from './components/header/Header.tsx'
import {useAppDispatch, useAppSelector} from './store'
import {useEffectOnce} from 'react-use'
import {useWalletTools} from './hooks/useWalletTools.ts'
import {useEffect} from 'react'
import {ITheme, userSlice} from './store/usersReducer.ts'
import {project} from './contract/config.ts'
import {useMessage} from './hooks/useMessage.ts'
import {useTranslation} from 'react-i18next'
import ScrollToTop from './components/scrollToTop/ScrollToTop.ts'
import {SystemSetting} from './hooks/systemSetting.tsx'

function App() {
  const {t, i18n} = useTranslation()
  const userStore = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()
  const {activate, chainId} = useWalletTools()
  const {showMessage} = useMessage()

  useEffect(() => {
    if (!userStore.theme) {
      dispatch(userSlice.actions.setTheme(ITheme.dark))
      document.documentElement.classList.add('dark')
    } else if (userStore.theme === ITheme.dark) {
      document.documentElement.classList.add('dark')
    }
  }, [userStore.theme])

  // useEffect(() => {
  //   if (accounts) {
  //     dispatch(userSlice.actions.setAddress(accounts[0]))
  //   } else {
  //     dispatch(userSlice.actions.setAddress(''))
  //   }
  // }, [accounts])

  useEffect(() => {
    if (chainId && chainId !== project.chainid) {
      showMessage(t(`Please select the correct network`))
      // deactivate()
      // dispatch(userSlice.actions.setAddress(''))
      // activate()
    }
  }, [chainId, i18n.language])

  useEffectOnce(() => {
    if (userStore.address) {
      activate()
    }
  })

  return (
    <div
      className={
        'bg-[#000] text-[0.14rem] text-baseColor_light dark:bg-page dark:text-baseColor md:text-[0.14rem]'
      }>
      <ScrollToTop />
      <SystemSetting />
      <Header />
      <Router />
    </div>
  )
}

export default App
