import { createContext, useCallback, useContext, useState, ReactNode } from 'react'
import { classNames } from './utils'

interface Toast {
  id: number
  message: string
  tone?: 'default' | 'success' | 'error'
}

interface ToastContextValue {
  showToast: (message: string, tone?: Toast['tone']) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, tone: Toast['tone'] = 'default') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, tone }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={classNames(
              'animate-slideUp rounded-sm border px-4 py-3 text-sm shadow-lg backdrop-blur-sm',
              'bg-ink text-paper border-ink/80 dark:bg-paper dark:text-ink dark:border-paper/80',
              t.tone === 'error' && 'bg-accent border-accent text-paper dark:bg-accent dark:text-paper'
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
