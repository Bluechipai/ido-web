import {FlexBox} from '../flex/Flex.tsx'
import SvgIcon from '../svgIocn/SvgIcon.tsx'
import {darkIcon, lightIcon} from '../../utils/svgManage.ts'
import {useAppDispatch, useAppSelector} from '../../store'
import {ITheme, userSlice} from '../../store/usersReducer.ts'
import {HTMLProps} from 'react'

export default function ThemeButton(props: HTMLProps<HTMLDivElement>) {
  const userStore = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()
  function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
      dispatch(userSlice.actions.setTheme(ITheme.light))
    } else {
      dispatch(userSlice.actions.setTheme(ITheme.dark))
    }
    document.documentElement.classList.toggle('dark')
  }

  return (
    <FlexBox
      onClick={toggleTheme}
      className={`${props.className} cursor-pointer`}>
      <SvgIcon
        dangerouslySetInnerHTML={
          userStore.theme === ITheme.dark ? lightIcon : darkIcon
        }
      />
    </FlexBox>
  )
}
