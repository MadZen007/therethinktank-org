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
  const faqStats = data.faqStats

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

      <section style={{ marginBottom: '2rem' }}>
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
        <h2>FAQ Engagement</h2>
        <p style={{ marginTop: '0.5rem', marginBottom: '1rem', color: '#9EA4AE' }}>
          Counts how many times each FAQ question has been opened on the public site. Useful for spotting which topics people
          care about most.
        </p>
        {faqStats.length === 0 ? (
          <p style={{ color: '#9EA4AE' }}>No FAQ clicks recorded yet.</p>
        ) : (
          <div
            style={{
              borderRadius: '0.75rem',
              border: '1px solid #2E3340',
              overflow: 'hidden',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead style={{ backgroundColor: '#050816' }}>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '0.6rem 0.75rem',
                      borderBottom: '1px solid #2E3340',
                    }}
                  >
                    FAQ Question
                  </th>
                  <th
                    style={{
                      textAlign: 'right',
                      padding: '0.6rem 0.75rem',
                      borderBottom: '1px solid #2E3340',
                      width: '120px',
                    }}
                  >
                    Opens
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqStats.map((row, index) => (
                  <tr
                    key={row.slug}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#020617' : '#020617',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.55rem 0.75rem',
                        borderBottom: '1px solid #111827',
                      }}
                    >
                      {row.title}
                    </td>
                    <td
                      style={{
                        padding: '0.55rem 0.75rem',
                        borderBottom: '1px solid #111827',
                        textAlign: 'right',
                      }}
                    >
                      {row.click_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#9EA4AE' }}>
        <h2>Debug (temporary)</h2>
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
{JSON.stringify(
  {
    visits: metrics.visits,
    contacts: metrics.contacts,
    newsletter: metrics.newsletter,
    faqStatsCount: faqStats.length,
    faqStats,
  },
  null,
  2
)}
        </pre>
      </section>
    </main>
  )
}

