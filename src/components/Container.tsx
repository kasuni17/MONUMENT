import { ReactNode, ElementType } from 'react'
import { classNames } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

/**
 * The single horizontal grid every section on every route sits inside, so
 * headings, cards, images and rules all share one left and right edge.
 */
export default function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={classNames('container-editorial', className)}>{children}</Tag>
}
