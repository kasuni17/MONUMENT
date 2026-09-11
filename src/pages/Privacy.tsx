import { useSeo } from '@/hooks/useSeo'
import Container from '@/components/Container'

export default function Privacy() {
  useSeo({ title: 'Privacy', description: 'What this site does with your data, which is nothing.' })

  return (
    <Container as="section" className="py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="eyebrow text-accent dark:text-accent-soft">Legal</p>
          <h1 className="display-md mt-3 text-ink dark:text-paper">Privacy</h1>
        </div>
        <div className="prose-article lg:col-span-8">
          <p>
            MONUMENT is a frontend demonstration. There is no server, no database and no analytics. Nothing you do
            here is transmitted anywhere, because there is nowhere for it to go.
          </p>
          <p>
            Saving a story, subscribing to the newsletter, posting a response or editing something in the
            editorial desk all change values held in the page memory for as long as this tab is open. Nothing is
            written to local storage, session storage, a database or a cookie. Refresh the page and every one of
            those actions is gone.
          </p>
          <h2>What that means in practice</h2>
          <ul>
            <li>No account, no tracking, and no identifier attached to you.</li>
            <li>No cookies are set by this site for application state.</li>
            <li>Nothing you type is sent to a server, ours or anyone else.</li>
            <li>Closing the tab is the complete and only deletion process required.</li>
          </ul>
          <p>
            Fonts are requested from Google Fonts, which is the single external request the site makes. Everything
            else, including every photograph, is served from this domain.
          </p>
        </div>
      </div>
    </Container>
  )
}
