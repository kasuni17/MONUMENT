import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './lib/theme'
import { ToastProvider } from './lib/toast'
import { ContentProvider } from './lib/content'
import { BookmarksProvider } from './lib/bookmarks'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <ToastProvider>
            <ContentProvider>
              <BookmarksProvider>
                <App />
              </BookmarksProvider>
            </ContentProvider>
          </ToastProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)
