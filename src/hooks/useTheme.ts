import {useAppSelector} from '../store'
import {ITheme} from '../store/usersReducer.ts'

export function useTheme() {
  const userStore = useAppSelector((state) => state.users)
  return {isDark: userStore.theme === ITheme.dark}
}
