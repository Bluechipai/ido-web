/* Verify email */
import {noDataSplit, USDT_decimal_show} from './config'
import Decimal from 'decimal.js'
import DecimalTool from './DecimalTool'
import {BigNumber} from 'bignumber.js'

export const EMAIL_REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const NUMBER_REG = '^[\\+-]?\\d+(\\.{1}\\d+)?$'

export function encryptEmail(str: string | undefined) {
  if (!str) {
    return '-'
  }
  const emailRegex =
    /([a-zA-Z0-9._%+-])([a-zA-Z0-9._%+-]*?)([a-zA-Z0-9._%+-]?)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
  return str.replace(emailRegex, '$1*****$3@$4')
}

export function encryptPhone(str: string | undefined) {
  if (!str) {
    return '-'
  }
  return str.replace(/(\d{3}).*(\d{4})/g, '$1****$2')
}
export function isUserNumber(regStr: string, str: string) {
  return new RegExp(regStr, 'gi').test(str)
}
export function getEventParentElement(
  element: HTMLElement,
  targetId: string
): HTMLElement | null {
  if (!element || element.tagName === 'BODY') {
    return null
  } else if (element.id === targetId) {
    return element
  } else {
    return getEventParentElement(element.parentElement!, targetId)
  }
}

/* Time Formatting */
export function formatDate(
  dateStr: string | number | undefined,
  format: string = 'yyyy-MM-dd hh:mm:ss'
) {
  if (typeof dateStr === 'undefined') {
    return dateStr
  }
  if (/^\d+$/g.test(String(dateStr))) {
    dateStr = Number(dateStr)
  }
  const dateObejct = new Date(dateStr)
  const date: any = {
    'M+': dateObejct.getMonth() + 1,
    'd+': dateObejct.getDate(),
    'h+': dateObejct.getHours(),
    'm+': dateObejct.getMinutes(),
    's+': dateObejct.getSeconds(),
    'q+': Math.floor((dateObejct.getMonth() + 3) / 3),
    'S+': dateObejct.getMilliseconds(),
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${dateObejct.getFullYear()}`.substr(4 - RegExp.$1.length)
    )
  }
  for (const k in date) {
    // eslint-disable-next-line no-prototype-builtins
    if (date.hasOwnProperty(k)) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? date[k]
            : `00${date[k]}`.substr(`${date[k]}`.length)
        )
      }
    }
  }
  return format
}

export function formatLocalFullDate(date: string | number | undefined) {
  if (typeof date === 'undefined') {
    return date
  }
  return new Date(date).toLocaleString()
}
export function formatLocalDate(date: string | number | undefined) {
  if (typeof date === 'undefined') {
    return date
  }
  return new Date(date).toLocaleDateString()
}
export function formatLocalTime(date: string | number | undefined) {
  if (typeof date === 'undefined') {
    return date
  }
  return new Date(date).toLocaleTimeString()
}

export function getObjFromSessionStorage(key: string) {
  const cacheStr = sessionStorage.getItem(key)
  if (!cacheStr || cacheStr === 'undefined') {
    return null
  }
  return JSON.parse(cacheStr)
}
export function getObjFromLocalStorage(key: string) {
  const cacheStr = localStorage.getItem(key)
  return cacheStr ? JSON.parse(cacheStr) : null
}

export function formatNumber(value: number | string, splitor = ',') {
  if (typeof value !== 'number' && typeof value !== 'string') {
    return '-'
  }
  const amount = Math.abs(Number(value))
  if (amount > 1000) {
    const numAry = String(amount).split('.')
    const numStr = numAry[0].split('').reverse().join('')
    const length = numStr.length
    let newStr = numStr.replace(/\d{3}/gi, function (a, b) {
      if (b / 3 + 1 < Math.ceil(length / 3)) {
        return a + splitor
      } else {
        return a
      }
    })
    newStr =
      newStr.split('').reverse().join('') + (numAry[1] ? `.${numAry[1]}` : '')
    return Number(value) < 0 ? `-${newStr}` : newStr
  }
  return String(value)
}
export function isNumber(str: string) {
  return new RegExp(NUMBER_REG, 'gi').test(str)
}
export function fixedNumberStr(
  value: number | string | undefined,
  precision: number = 0,
  rounding: Decimal.Rounding = 1
) {
  if (typeof value === 'undefined') {
    return '-'
  }
  if (typeof value !== 'number' && !isNumber(String(value))) {
    return '-'
  }

  const scale = Decimal.mul(value, Math.pow(10, precision)).toFixed(0, rounding)
  const valStr = Decimal.div(parseInt(scale), Math.pow(10, precision)).toFixed()

  return valStr
}
export function formatUSDTRise(
  amount: number | string,
  decimals?: number
): string {
  /*if (!amount || amount === "0") {
      return "-";
  }*/
  return Number(amount) > 0
    ? `+${formatUSDT(amount, decimals)}`
    : String(formatUSDT(amount, decimals))
}

export function formatUSDT(
  amount: string | number | undefined | null,
  decimals?: number,
  rounding: Decimal.Rounding = 1
) {
  if (typeof amount === 'undefined' || amount === null) {
    return noDataSplit
  }
  return formatNumber(
    fixedNumberStr(amount, decimals || USDT_decimal_show, rounding)
  )
}

export function bytesToSize(
  size: number | string | undefined,
  decimal?: number
) {
  if (!size || size == 0 || Number(size) < 1) {
    return size
  }
  const amount = Number(size)
  const num = 1000.0
  // const sizeList = ['B','K','M','G','T'];
  const sizeList = ['', 'K', 'M', 'G', 'T']
  const index = Math.floor(Math.log(amount) / Math.log(num))
  const dd = decimal || 3
  // const precision = amount>num?dd:0;
  const precision = dd
  // return (amount / Math.pow(num, index)).toFixed(precision) + ` ${sizeList[index]}`;
  return (
    DecimalTool.div(amount, Math.pow(num, index)).toFixedZero(precision, 1) +
    ` ${sizeList[index]}`
  )
}

export function awaitWrap<T>(promise: Promise<T>) {
  return promise.then((data: T) => [data, null]).catch((err) => [null, err])
}

export function formatAddress(address: string | undefined, start = 6, end = 4) {
  if (!address) {
    return ''
  }
  const reg = new RegExp(`(.{${start}}).+(.{${end}}$)`, 'g')
  return address.replace(reg, '$1...$2')
}

export const regExpTemplate = (str: string, obj: any) => {
  return str.replace(/\${[^}]+}/g, (variableStr) => {
    const variable = variableStr.replace(/\${(.+)}/, '$1')
    return obj[variable] || ''
  })
}

export function getFieldText(item: any, field: string) {
  const fieldArr = field && field.split('.')
  if (fieldArr.length > 1) {
    return getFieldText(item[fieldArr[0]], field.replace(`${fieldArr[0]}.`, ''))
  } else if (field) {
    return item[field]
  } else {
    return ''
  }
}

export function isGreaterThanOrEqualTo(a: string, b: string) {
  const aBN = new BigNumber(a)
  const bBN = new BigNumber(b)

  return aBN.isGreaterThanOrEqualTo(bBN)
}

export function isLessThanOrEqualTo(a: string, b: string) {
  const aBN = new BigNumber(a)
  const bBN = new BigNumber(b)

  return aBN.isLessThanOrEqualTo(bBN)
}

export function isEqualTo(a: string, b: string) {
  const aBN = new BigNumber(a)
  const bBN = new BigNumber(b)

  return aBN.isEqualTo(bBN)
}

export function isGreaterThan(a: string | number, b: string | number) {
  const aBN = new BigNumber(a)
  const bBN = new BigNumber(b)

  return aBN.isGreaterThan(bBN)
}

export function isLessThan(a: string | number, b: string | number) {
  const aBN = new BigNumber(a)
  const bBN = new BigNumber(b)

  return aBN.isLessThan(bBN)
}
