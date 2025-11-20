import { ReactNode } from 'react'

interface LinkProps {
  href: string
  children: ReactNode
  className?: string
}

const BASE_PATH = '/spookiki-creations'

export function Link({ href, children, className = '' }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const fullPath = href.startsWith(BASE_PATH) ? href : `${BASE_PATH}${href}`
    window.history.pushState({}, '', fullPath)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  const fullHref = href.startsWith(BASE_PATH) ? href : `${BASE_PATH}${href}`

  return (
    <a href={fullHref} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
