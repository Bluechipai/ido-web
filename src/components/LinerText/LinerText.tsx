import {HTMLProps} from 'react'

export default function LinerText(props: HTMLProps<HTMLDivElement>) {
  const {className, children, ...res} = props

  return (
    <div
      className={`${className} linerText bg-liner-text`}
      {...res}>
      {children}
    </div>
  )
}
