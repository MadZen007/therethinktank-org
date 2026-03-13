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

      <section>
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
      </section>
    </main>
  )
}

