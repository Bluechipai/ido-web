import {useEffect} from 'react'

export function useDomcumentOnClick(callback: (event: MouseEvent) => void) {
  useEffect(() => {
    document.addEventListener('click', domOnClick)
    return () => {
      document.removeEventListener('click', domOnClick)
    }
  }, [])

  function domOnClick(event: MouseEvent) {
    callback(event)
  }
}
