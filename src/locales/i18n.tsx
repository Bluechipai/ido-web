import i18n from 'i18next'
import en_US from './en_US.json'
import zh_CN from './zh_CN.json'
import ko_KR from './ko_KR.json'
import {initReactI18next} from 'react-i18next'
import {langType} from 'src/config.ts'

i18n
  .use(initReactI18next) //init i18next
  .init({

    resources: {
      [langType.en_US]: {
        translation: en_US,
      },
      [langType.zh_CN]: {
        translation: zh_CN,
      },
      [langType.ko_KR]: {
        translation: ko_KR,
      },
    },
    fallbackLng: sessionStorage.getItem('lang') || langType.en_US,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
