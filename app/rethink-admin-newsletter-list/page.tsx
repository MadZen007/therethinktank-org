export const dynamic = 'force-dynamic'

import { ensureSchema, sql } from '@/lib/db'

async function getSubscribers() {
  await ensureSchema()

  const result = await sql`
    SELECT email, created_at
    FROM newsletter_subscribers
    ORDER BY created_at DESC
  `

  return result.rows as { email: string; created_at: string }[]
}

export default async function NewsletterSubscriberListPage() {
  const subscribers = await getSubscribers()

  return (
    <main className="admin-page" style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Newsletter Subscribers</h1>
      <p style={{ marginBottom: '1.5rem', color: '#9EA4AE' }}>
        Showing all stored newsletter email addresses. This page is not linked publicly, so keep the
        URL private.
      </p>

      <a
        href="/rethink-admin-insights"
        style={{
          display: 'inline-block',
          marginBottom: '1.5rem',
          padding: '0.45rem 0.9rem',
          borderRadius: '999px',
          border: '1px solid #2E3340',
          color: '#E5E7EB',
          textDecoration: 'none',
          fontSize: '0.9rem',
        }}
      >
        ← Back to Admin Insights
      </a>

      {subscribers.length === 0 ? (
        <p style={{ color: '#9EA4AE' }}>No newsletter subscribers found yet.</p>
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
                  Email
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.6rem 0.75rem',
                    borderBottom: '1px solid #2E3340',
                  }}
                >
                  Subscribed at
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr
                  key={subscriber.email + subscriber.created_at}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#020617' : '#020617',
                  }}
                >
                  <td
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderBottom: '1px solid #111827',
                      wordBreak: 'break-all',
                    }}
                  >
                    {subscriber.email}
                  </td>
                  <td
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderBottom: '1px solid #111827',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {new Date(subscriber.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

