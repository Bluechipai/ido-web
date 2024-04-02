import {useTranslation} from 'react-i18next'
import {useMemo} from 'react'

export function useSupportChains() {
  const {t, i18n} = useTranslation()

  const chains = useMemo(() => {
    return [
      {
        icon: t(``),
      },
    ]
  }, [i18n.language])

  return {chains}
}
