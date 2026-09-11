import { useState } from 'react'
import { useContent } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import { useToast } from '@/lib/toast'
import { useTheme } from '@/lib/theme'
import PageHeader from '../components/PageHeader'

interface SettingsState {
  publicationName: string
  description: string
  defaultCategoryId: string
  weeklyDigest: boolean
  commentNotifications: boolean
  subscriberNotifications: boolean
  seoTitleTemplate: string
  seoDefaultDescription: string
}

const defaultSettings: SettingsState = {
  publicationName: 'MONUMENT',
  description: 'An independent publication about the ideas shaping how we live, work and create.',
  defaultCategoryId: 'c1',
  weeklyDigest: true,
  commentNotifications: true,
  subscriberNotifications: false,
  seoTitleTemplate: '%s, MONUMENT',
  seoDefaultDescription: 'MONUMENT is an independent editorial publication.',
}

const inputClass = 'focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper'
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-muted'

export default function Settings() {
  useSeo({ title: 'Settings' })
  const { categories } = useContent()
  const { showToast } = useToast()
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)

  function update<K extends keyof SettingsState>(key: K, value: SettingsState[K]) {
    setSettings((s) => ({ ...s, [key]: value }))
  }

  function save() {
    showToast('Changes applied to this session.', 'success')
  }

  return (
    <div>
      <PageHeader title="Settings" description="Publication configuration for this session, nothing here is persisted." action={<button onClick={save} className="focus-ring min-h-[44px] bg-ink px-5 text-sm font-semibold text-paper dark:bg-paper dark:text-ink">Apply changes</button>} />

      <div className="mt-6 space-y-6">
        <section className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">General</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Publication name</label>
              <input className={inputClass} value={settings.publicationName} onChange={(e) => update('publicationName', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Default category</label>
              <select className={inputClass} value={settings.defaultCategoryId} onChange={(e) => update('defaultCategoryId', e.target.value)}>
                {categories.items.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Description</label>
            <textarea className={inputClass} rows={2} value={settings.description} onChange={(e) => update('description', e.target.value)} />
          </div>
        </section>

        <section className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Appearance</h2>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink dark:text-paper">Dark mode</p>
              <p className="text-xs text-ink-muted">Applies across the public site and this dashboard.</p>
            </div>
            <button onClick={toggleTheme} role="switch" aria-checked={theme === 'dark'} className={`focus-ring relative h-7 w-12 rounded-full transition-colors ${theme === 'dark' ? 'bg-accent' : 'bg-line dark:bg-line-dark'}`}>
              <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-paper transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </section>

        <section className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Notifications</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm text-ink dark:text-paper">Weekly performance digest</span>
              <input type="checkbox" checked={settings.weeklyDigest} onChange={(e) => update('weeklyDigest', e.target.checked)} className="h-5 w-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-ink dark:text-paper">New comment notifications</span>
              <input type="checkbox" checked={settings.commentNotifications} onChange={(e) => update('commentNotifications', e.target.checked)} className="h-5 w-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-ink dark:text-paper">New subscriber notifications</span>
              <input type="checkbox" checked={settings.subscriberNotifications} onChange={(e) => update('subscriberNotifications', e.target.checked)} className="h-5 w-5" />
            </label>
          </div>
        </section>

        <section className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">SEO defaults</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className={labelClass}>Title template (%s becomes the page title)</label>
              <input className={inputClass} value={settings.seoTitleTemplate} onChange={(e) => update('seoTitleTemplate', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Default meta description</label>
              <textarea className={inputClass} rows={2} value={settings.seoDefaultDescription} onChange={(e) => update('seoDefaultDescription', e.target.value)} />
            </div>
          </div>
        </section>

        <section className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Account</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-semibold text-paper">JH</div>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-paper">Julia Hartmann</p>
              <p className="text-xs text-ink-muted">julia@monument.pub · Editor-in-Chief</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-muted">This demo does not implement real authentication, account settings are illustrative only.</p>
        </section>
      </div>
    </div>
  )
}
