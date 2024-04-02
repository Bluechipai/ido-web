import {useTranslation} from 'react-i18next'
import {LaunchpadContentStyle, LaunchpadStyle, TitleStyle} from './Launchpad.style'
import Tab from 'src/components/tab/Tab.tsx';
import {useMemo, useState} from 'react'
import Progress from './Progress.tsx'
import Footer from '../../components/footer/Footer.tsx'
import {useSearchParams} from 'react-router-dom'
import {IFundType} from '../../utils/types.ts'

enum IStatus {
  Ongoing = 1,
  Completed
}
export default function Launchpad() {
  const {t, i18n} = useTranslation()
  const [searchParams] = useSearchParams()
  const [type, setType] = useState(searchParams.get('type') === '1' ? IFundType.Public : IFundType.Private)
  const [status, setStatus] = useState(IStatus.Ongoing)

  const types = useMemo(() => {
    return [
      {
        label: t('Public'),
        value: IFundType.Public
      },
      {
        label: t('Private'),
        value: IFundType.Private
      }
    ]
  }, [i18n.language])

  const statusArr = useMemo(() => {
    return [
      {
        label: t('Ongoing'),
        value: IStatus.Ongoing
      },
      {
        label: t('Completed'),
        value: IStatus.Completed
      }
    ]
  }, [i18n.language])

  return (
    <LaunchpadStyle>
      <LaunchpadContentStyle>
        <TitleStyle>{t(`details`)}</TitleStyle>
        <Tab<IFundType>
          value={type}
          options={types}
          onChange={(value) => {
            setType(value)
          }} />
        <Tab<IStatus>
          value={status}
          options={statusArr}
          onChange={(value) => {
            setStatus(value)
          }}
          style={{marginTop: '0.6rem'}} />
        <div style={{marginTop: '0.62rem'}}>
          <Progress
            isGrid={false}
            state={status}
            fundType={type}
            listLen={undefined}
          />
        </div>
      </LaunchpadContentStyle>
      <Footer style={{marginTop: '4.2rem'}} />
    </LaunchpadStyle>
  )
}
