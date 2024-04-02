import {CSSProperties, useMemo} from 'react'
import {LanguageStyle} from './Language.style'
import DropDown from '../dropDown/DropDown'
import {useTranslation} from 'react-i18next'
import {langType} from '../../config.ts'
import {useAppDispatch, useAppSelector} from '../../store'
import {userSlice} from '../../store/usersReducer.ts'
import useWidthChange from '../../hooks/useWidthChange.ts'
import {FlexRow} from '../flex/Flex.tsx'
import {langIcon, langIcon_light} from '../../utils/svgManage.ts'
import SvgIcon from '../svgIocn/SvgIcon.tsx'
import {useTheme} from '../../hooks/useTheme.ts'

type IProps = {
  style?: CSSProperties
}
export default function Language(props: IProps) {
  const {i18n} = useTranslation()
  const {isH5} = useWidthChange()
  const {isDark} = useTheme()
  const userStore = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  function toggleLang(value: string) {
    i18n.changeLanguage(value)
    dispatch(userSlice.actions.setLanguage(value))
  }

  return (
    <LanguageStyle
      isH5={isH5}
      className={'flex-box'}
      style={props.style}>
      <DropDown
        menuStyle={{
          lineHeight: '0.46rem',
          left: '50%',
          borderRadius: '0.3rem',
          transform: 'translate(-50%,100%)',
        }}
        optionStyle={{textAlign: 'center'}}
        defaultValue={userStore.language}
        options={useMemo(() => {
          return [
            {text: 'English', value: langType.en_US},
            {text: '한국인', value: langType.ko_KR},
          ]
        }, [])}
        customerRender={(selectd) => {
          return (
            <FlexRow>
              <SvgIcon
                dangerouslySetInnerHTML={isDark ? langIcon : langIcon_light}
                style={{marginRight: '0.04rem'}}
              />
              <span>{selectd.text}</span>
            </FlexRow>
          )
        }}
        onChange={(selectd) => {
          toggleLang(selectd.value)
        }}></DropDown>
    </LanguageStyle>
  )
}
