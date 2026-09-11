import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('MONUMENT encountered an unexpected error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <span className="font-serif text-5xl font-bold text-line dark:text-line-dark">···</span>
          <h1 className="mt-4 font-serif text-2xl font-bold text-ink dark:text-paper">Something went wrong.</h1>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            We hit an unexpected error loading this page. Reloading usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="focus-ring mt-6 min-h-[44px] bg-ink px-6 text-sm font-semibold text-paper dark:bg-paper dark:text-ink"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
