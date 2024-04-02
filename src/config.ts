
export const downloadURL = 'https://bluechipai.co/oss/logo.zip'
export enum langType {
  zh_CN = 'zh_CN',
  en_US = 'en',
  ko_KR = 'ko',
}

export function getRiskBgColor(level: number | undefined) {
  switch (level) {
    case 2:
      return 'bg-m-risk'
    case 3:
      return 'bg-high-risk'
    default:
      return 'bg-low-risk'
  }
}

export const tokenPrecision = 2
