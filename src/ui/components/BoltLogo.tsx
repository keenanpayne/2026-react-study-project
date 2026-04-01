import { cx } from '~/utils/cx'

type BoltLogoProps = {
  wordmark?: boolean
  className?: string
}

export default function BoltLogo(props: BoltLogoProps) {
  const { wordmark = false, className = '' } = props
  const src = wordmark ? '/bolt-logo-wordmark.png' : '/bolt-logo.png'
  const classNames = cx('invert-dark', className)

  return <img src={src} alt="Bolt.new logo" className={classNames} />
}
