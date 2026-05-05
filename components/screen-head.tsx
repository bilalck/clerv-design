import type { ReactNode } from "react"

type Props = {
  kicker: string
  number: string | number
  title: ReactNode
  children?: ReactNode
  /** Use h1 (large) for home, h2 (default) elsewhere. */
  large?: boolean
}

export function ScreenHead({ kicker, number, title, children, large = false }: Props) {
  return (
    <div className="screen-head">
      <div>
        <div className="kicker u">{kicker}</div>
        <div className="number">{number}</div>
        {large ? <h1>{title}</h1> : <h2>{title}</h2>}
        {children ? <p style={{ marginTop: large ? 28 : 24 }}>{children}</p> : null}
      </div>
      <div className="vline" aria-hidden="true" />
    </div>
  )
}
