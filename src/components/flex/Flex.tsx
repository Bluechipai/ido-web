import {HTMLProps} from 'react'

export function FlexBox(props: HTMLProps<HTMLDivElement>) {
  const {className, children, ...res} = props
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      {...res}>
      {children}
    </div>
  )
}

export function FlexRow(props: HTMLProps<HTMLDivElement>) {
  const {className, children, ...res} = props
  return (
    <div
      className={`flex items-center ${className}`}
      {...res}>
      {children}
    </div>
  )
}

export function FlexSb(props: HTMLProps<HTMLDivElement>) {
  const {className, children, ...res} = props
  return (
    <div
      className={`flex items-center justify-between ${className}`}
      {...res}>
      {children}
    </div>
  )
}

export function FlexCol(props: HTMLProps<HTMLDivElement>) {
  const {className, children, ...res} = props
  return (
    <div
      className={`flex flex-col ${className}`}
      {...res}>
      {children}
    </div>
  )
}
