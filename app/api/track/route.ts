import { NextRequest, NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    await ensureSchema()

    const { type, path } = await request.json()

    if (type !== 'page_view') {
      return NextResponse.json({ error: 'Unsupported event type' }, { status: 400 })
    }

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    await sql`
      INSERT INTO page_views (path)
      VALUES (${path})
    `

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error tracking event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

