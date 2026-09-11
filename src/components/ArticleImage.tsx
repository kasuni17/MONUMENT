import { useEffect, useRef, useState } from 'react'
import { classNames } from '@/lib/utils'

export type ImageRatio = 'wide' | 'landscape' | 'classic' | 'square' | 'portrait' | 'tall' | 'free'

const ratioClass: Record<ImageRatio, string> = {
  wide: 'aspect-[16/9]',
  landscape: 'aspect-[3/2]',
  classic: 'aspect-[4/3]',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[4/5]',
  free: '',
}

interface ArticleImageProps {
  src: string
  alt: string
  ratio?: ImageRatio
  className?: string
  imgClassName?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  sizes?: string
  /** Shown inside the placeholder if the file is missing. */
  label?: string
  /** Adds the standard editorial hover zoom when the parent is a `group`. */
  zoom?: boolean
}

/**
 * The only way an image reaches the page. The wrapper owns the aspect ratio so
 * nothing reflows while a photograph loads, the image itself covers that box,
 * and a broken or missing file degrades into a typeset placeholder rather than
 * a broken-image icon.
 */
export default function ArticleImage({
  src,
  alt,
  ratio = 'landscape',
  className,
  imgClassName,
  loading = 'lazy',
  fetchPriority,
  sizes,
  label,
  zoom = false,
}: ArticleImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // A component reused across a client-side navigation keeps its state, so the
  // flags follow the source rather than the instance. A cached image can also
  // finish decoding before React attaches onLoad, which would otherwise leave
  // it faded out forever, so the element is checked directly after each swap.
  useEffect(() => {
    const img = imgRef.current
    setFailed(img?.complete === true && img.naturalWidth === 0)
    setLoaded(img?.complete === true && img.naturalWidth > 0)
  }, [src])

  const box = classNames(
    'relative overflow-hidden bg-paper-dim dark:bg-surface-darkAlt',
    ratioClass[ratio],
    className
  )

  if (failed || !src) {
    return (
      <div role="img" aria-label={alt} className={classNames(box, 'flex items-center justify-center')}>
        <div className="px-5 text-center">
          {label && <p className="eyebrow text-faint">{label}</p>}
          <p className="mt-1 font-display text-sm text-ink-muted dark:text-paper/50">{alt}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={box}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={classNames(
          'absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-editorial',
          zoom && 'group-hover:scale-[1.03]',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName
        )}
      />
    </div>
  )
}
