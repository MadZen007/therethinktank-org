import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ensureSchema, sql } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''

    let subject = ''
    let html = ''
    let text = ''
    let sendMode = 'all'
    let singleEmail = ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      subject = (body.subject || '').toString()
      html = (body.html || '').toString()
      text = (body.text || '').toString()
      sendMode = (body.sendMode || 'all').toString()
      singleEmail = (body.singleEmail || '').toString()
    } else {
      const formData = await request.formData()
      subject = (formData.get('subject') || '').toString()
      html = (formData.get('html') || '').toString()
      text = (formData.get('text') || '').toString()
      sendMode = (formData.get('sendMode') || 'all').toString()
      singleEmail = (formData.get('singleEmail') || '').toString()
    }

    if (!subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Subject and at least one of HTML or text content are required.' },
        { status: 400 }
      )
    }

    await ensureSchema()

    let recipientEmails: string[] = []

    if (sendMode === 'single') {
      const trimmed = singleEmail.trim()
      if (!trimmed) {
        return NextResponse.json(
          { error: 'Please provide an email address when sending to a single recipient.' },
          { status: 400 }
        )
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(trimmed)) {
        return NextResponse.json(
          { error: 'The single recipient email is not a valid email address.' },
          { status: 400 }
        )
      }

      recipientEmails = [trimmed]
    } else {
      // Default: send to all newsletter subscribers
      const subscribers = await sql`SELECT email FROM newsletter_subscribers`
      recipientEmails = subscribers.rows.map((row) => row.email).filter(Boolean) as string[]

      if (recipientEmails.length === 0) {
        return NextResponse.json(
          { error: 'There are currently no newsletter subscribers to send to.' },
          { status: 400 }
        )
      }
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      )
    }

    const fromEmail =
      process.env.NEWSLETTER_FROM_EMAIL ||
      process.env.RESEND_FROM_EMAIL ||
      'admin@rethinktank.org'

    // Build payload in a way that satisfies Resend's type requirements:
    // - If both html and text are present, either html- or text-led variant works.
    // - If only one is present, use the corresponding required-field variant.
    let payload:
      | { from: string; to: string[]; subject: string; html: string; text?: string }
      | { from: string; to: string[]; subject: string; text: string; html?: string }

    if (html && text) {
      payload = {
        from: fromEmail,
        to: recipientEmails,
        subject,
        html,
        text,
      }
    } else if (html) {
      payload = {
        from: fromEmail,
        to: recipientEmails,
        subject,
        html,
      }
    } else {
      // At this point we know "text" is truthy because of the earlier validation.
      payload = {
        from: fromEmail,
        to: recipientEmails,
        subject,
        text,
      }
    }

    // Cast to any to satisfy Resend's overloaded type signatures during build.
    const { data, error } = await resend.emails.send(payload as any)

    if (error) {
      console.error('Resend error when sending newsletter:', error)
      return NextResponse.json(
        { error: 'Failed to send newsletter' },
        { status: 500 }
      )
    }

    console.log(`Newsletter sent to ${recipientEmails.length} recipient(s)`, data)

    // If this came from a form submission, redirect back to the admin page with a success flag
    if (!contentType.includes('application/json')) {
      const url = new URL('/rethink-admin-insights?sent=1', request.url)
      return NextResponse.redirect(url)
    }

    return NextResponse.json(
      {
        message: `Newsletter sent to ${recipientEmails.length} recipient(s).`,
        count: recipientEmails.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending newsletter:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    )
  }
}

