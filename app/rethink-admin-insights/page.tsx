export const dynamic = 'force-dynamic'

import { ensureSchema, sql } from '@/lib/db'

async function getMetrics() {
  await ensureSchema()

  const [
    visits7d,
    visits30d,
    visitsTotal,
    contactsTotal,
    contacts30d,
    newsletterTotal,
    newsletter30d,
  ] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days'`,
    sql`SELECT COUNT(*)::int AS count FROM page_views WHERE created_at >= NOW() - INTERVAL '30 days'`,
    sql`SELECT COUNT(*)::int AS count FROM page_views`,
    sql`SELECT COUNT(*)::int AS count FROM contact_submissions`,
    sql`SELECT COUNT(*)::int AS count FROM contact_submissions WHERE created_at >= NOW() - INTERVAL '30 days'`,
    sql`SELECT COUNT(*)::int AS count FROM newsletter_subscribers`,
    sql`SELECT COUNT(*)::int AS count FROM newsletter_subscribers WHERE created_at >= NOW() - INTERVAL '30 days'`,
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
  }
}

export default async function AdminInsightsPage() {
  const metrics = await getMetrics()

  return (
    <main className="admin-page" style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>RethinkTank Admin Insights</h1>
      <p style={{ marginBottom: '2rem', color: '#9EA4AE' }}>
        Private dashboard for your eyes only. Bookmark this URL instead of linking it anywhere public.
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Traffic</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div className="card">
            <h3>Visits (last 7 days)</h3>
            <p>{metrics.visits.last7Days}</p>
          </div>
          <div className="card">
            <h3>Visits (last 30 days)</h3>
            <p>{metrics.visits.last30Days}</p>
          </div>
          <div className="card">
            <h3>Visits (total)</h3>
            <p>{metrics.visits.total}</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Contact Form</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div className="card">
            <h3>Total inquiries</h3>
            <p>{metrics.contacts.total}</p>
          </div>
          <div className="card">
            <h3>Inquiries (last 30 days)</h3>
            <p>{metrics.contacts.last30Days}</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Newsletter</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div className="card">
            <h3>Total subscribers</h3>
            <p>{metrics.newsletter.total}</p>
          </div>
          <div className="card">
            <h3>New subscribers (last 30 days)</h3>
            <p>{metrics.newsletter.last30Days}</p>
          </div>
        </div>
        <a
          href="/rethink-admin-newsletter-list"
          style={{
            display: 'inline-block',
            marginTop: '0.75rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            border: '1px solid #2E3340',
            fontSize: '0.9rem',
            color: '#E5E7EB',
            textDecoration: 'none',
          }}
        >
          View subscriber email list →
        </a>
      </section>

      <section>
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
    </main>
  )
}

