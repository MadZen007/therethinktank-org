export const dynamic = 'force-dynamic'

import { ensureSchema, sql } from '@/lib/db'

async function getMetricsAndFaqStats() {
  await ensureSchema()

  const [
    visits7d,
    visits30d,
    visitsTotal,
    contactsTotal,
    contacts30d,
    newsletterTotal,
    newsletter30d,
    faqStatsResult,
  ] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days'`,
    sql`SELECT COUNT(*)::int AS count FROM page_views WHERE created_at >= NOW() - INTERVAL '30 days'`,
    sql`SELECT COUNT(*)::int AS count FROM page_views`,
    sql`SELECT COUNT(*)::int AS count FROM contact_submissions`,
    sql`SELECT COUNT(*)::int AS count FROM contact_submissions WHERE created_at >= NOW() - INTERVAL '30 days'`,
    sql`SELECT COUNT(*)::int AS count FROM newsletter_subscribers`,
    sql`SELECT COUNT(*)::int AS count FROM newsletter_subscribers WHERE created_at >= NOW() - INTERVAL '30 days'`,
    sql`SELECT slug, title, click_count FROM faq_question_stats ORDER BY click_count DESC, title ASC`,
  ])

  return {
    visits: {
      last7Days: visits7d.rows[0]?.count ?? 0,
      last30Days: visits30d.rows[0]?.count ?? 0,
      total: visitsTotal.rows[0]?.count ?? 0,
    },
    contacts: {
      total: contactsTotal.rows[0]?.count ?? 0,
      last30Days: contacts30d.rows[0]?.count ?? 0,
    },
    newsletter: {
      total: newsletterTotal.rows[0]?.count ?? 0,
      last30Days: newsletter30d.rows[0]?.count ?? 0,
    },
    faqStats: faqStatsResult.rows as { slug: string; title: string; click_count: number }[],
  }
}

export default async function AdminInsightsPage() {
  const data = await getMetricsAndFaqStats()
  const metrics = {
    visits: data.visits,
    contacts: data.contacts,
    newsletter: data.newsletter,
  }

  return (
    <main className="admin-page" style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>RethinkTank Admin Insights</h1>
      <p style={{ marginBottom: '2rem', color: '#9EA4AE' }}>
        Private dashboard for your eyes only. Bookmark this URL instead of linking it anywhere public.
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Send Newsletter Email</h2>
        <p style={{ marginTop: '0.5rem', marginBottom: '1rem', color: '#9EA4AE' }}>
          You can either send to your whole newsletter list or send a one-off email to a single address.
        </p>

        <form
          method="POST"
          action="/api/admin/send-newsletter"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            maxWidth: '640px',
          }}
        >
          <fieldset
            style={{
              border: '1px solid #2E3340',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <legend style={{ padding: '0 0.25rem', color: '#9EA4AE', fontSize: '0.9rem' }}>
              Recipients
            </legend>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="radio"
                name="sendMode"
                value="all"
                defaultChecked
              />
              <span>
                Send to <strong>all {metrics.newsletter.total}</strong> newsletter subscribers
              </span>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="radio"
                  name="sendMode"
                  value="single"
                />
                <span>Send to a single email address</span>
              </span>
              <input
                type="email"
                name="singleEmail"
                placeholder="someone@example.com"
                style={{
                  marginLeft: '1.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #2E3340',
                  backgroundColor: '#050816',
                  color: 'white',
                }}
              />
            </label>
          </fieldset>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              required
              placeholder="Newsletter subject"
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #2E3340',
                backgroundColor: '#050816',
                color: 'white',
              }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>HTML content (optional)</span>
            <textarea
              name="html"
              rows={8}
              placeholder="You can paste HTML here if you want a formatted email. Leave blank to just send the plain text version below."
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #2E3340',
                backgroundColor: '#050816',
                color: 'white',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>Plain text content</span>
            <textarea
              name="text"
              rows={6}
              required
              placeholder="Write the text version of your newsletter here."
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #2E3340',
                backgroundColor: '#050816',
                color: 'white',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif',
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '999px',
              border: 'none',
              background:
                'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            Send to all subscribers
          </button>
        </form>
      </section>

      <section>
        <h2>How to View Traffic & FAQ Stats in Vercel</h2>
        <ol style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', color: '#9EA4AE', lineHeight: 1.6 }}>
          <li>
            In your browser, go to <code>vercel.com</code> and log in. In the left sidebar, click <strong>Projects</strong> and
            open <strong>therethinktank-org</strong>.
          </li>
          <li>
            To see raw page view counts, in the left sidebar click <strong>Storage → rethinktank-org-db</strong>, then click{' '}
            <strong>Open in Neon</strong>. In the Neon dashboard, open <strong>SQL Editor</strong> and run:
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
{`SELECT COUNT(*) FROM page_views;`}
            </pre>
            This gives you the total number of tracked page views for the site.
          </li>
          <li>
            To see which FAQs people open the most, in the same SQL editor run:
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
{`SELECT slug, title, click_count
FROM faq_question_stats
ORDER BY click_count DESC, title ASC;`}
            </pre>
            This shows every FAQ question, its slug, and how many times visitors have opened it.
          </li>
          <li>
            You can save these queries in Neon if you want quick access later, or tweak them (for example adding{' '}
            <code>LIMIT 10</code>) to only see the top questions.
          </li>
        </ol>
      </section>
    </main>
  )
}

