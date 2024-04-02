import {useLocation} from 'react-use'
import {useEffect} from 'react'

export default function ScrollToTop() {
  const {pathname} = useLocation()

  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [pathname])

  return null
}
