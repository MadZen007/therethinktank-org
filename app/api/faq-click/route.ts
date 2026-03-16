import { NextRequest, NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const slug = (body.slug || '').toString()
    const title = (body.title || '').toString()

    if (!slug || !title) {
      return NextResponse.json(
        { error: 'slug and title are required' },
        { status: 400 }
      )
    }

    await ensureSchema()

    const result = await sql`
      INSERT INTO faq_question_stats (slug, title, click_count)
      VALUES (${slug}, ${title}, 1)
      ON CONFLICT (slug) DO UPDATE
      SET
        title = EXCLUDED.title,
        click_count = faq_question_stats.click_count + 1
      RETURNING click_count;
    `

    const clickCount = result.rows[0]?.click_count ?? 0

    return NextResponse.json({ slug, title, clickCount })
  } catch (error) {
    console.error('Error recording FAQ click:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Internal server error', details: message },
      { status: 500 }
    )
  }
}

