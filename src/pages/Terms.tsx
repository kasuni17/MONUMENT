import { useSeo } from '@/hooks/useSeo'
import Container from '@/components/Container'

export default function Terms() {
  useSeo({ title: 'Terms', description: 'Terms for using this demonstration publication.' })

  return (
    <Container as="section" className="py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="eyebrow text-accent dark:text-accent-soft">Legal</p>
          <h1 className="display-md mt-3 text-ink dark:text-paper">Terms</h1>
        </div>
        <div className="prose-article lg:col-span-8">
          <p>
            MONUMENT is a demonstration of what an editorial publication and its production tools can look like on
            the frontend alone. The writers, responses, subscriber lists and readership figures throughout the
            site are fictional, written for this project, and describe no real person, company or event.
          </p>
          <p>
            There is no account system, no publishing pipeline behind the editorial desk, and no retention of
            anything you enter. Treat it as a working prototype to look at rather than a service to depend on.
          </p>
          <h2>Using the material</h2>
          <p>
            The written stories here are original work produced for the demonstration. Photographs come from
            Unsplash and are used under its licence, with the photographer credited in the picture library that
            ships with the project.
          </p>
        </div>
      </div>
    </Container>
  )
}
