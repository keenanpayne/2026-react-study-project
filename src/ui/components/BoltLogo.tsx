import { cx } from '~/utils/cx'

type BoltLogoProps = {
  wordmark?: boolean
  className?: string
}

export default function BoltLogo({
  wordmark = false,
  className = '',
}: BoltLogoProps) {
  const src = wordmark ? '/bolt-logo-wordmark.webp' : '/bolt-logo.webp'

  return (
    <img
      src={src}
      alt="Bolt.new logo"
      className={cx('invert-dark', className)}
    />
  )
}
