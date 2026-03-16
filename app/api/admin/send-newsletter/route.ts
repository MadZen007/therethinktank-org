import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ensureSchema, sql } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    await ensureSchema()

    // Load all newsletter subscriber emails
    const subscribers = await sql`SELECT email FROM newsletter_subscribers`
    const recipientEmails = subscribers.rows.map((row) => row.email).filter(Boolean) as string[]

    if (recipientEmails.length === 0) {
      return NextResponse.json(
        { error: 'There are currently no newsletter subscribers to send to.' },
        { status: 400 }
      )
    }

    const contentType = request.headers.get('content-type') || ''

    let subject = ''
    let html = ''
    let text = ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      subject = (body.subject || '').toString()
      html = (body.html || '').toString()
      text = (body.text || '').toString()
    } else {
      const formData = await request.formData()
      subject = (formData.get('subject') || '').toString()
      html = (formData.get('html') || '').toString()
      text = (formData.get('text') || '').toString()
    }

    if (!subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Subject and at least one of HTML or text content are required.' },
        { status: 400 }
      )
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
      'admin@wethinktank.org'

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmails,
      subject,
      html: html || undefined,
      text: text || undefined,
    })

    if (error) {
      console.error('Resend error when sending newsletter:', error)
      return NextResponse.json(
        { error: 'Failed to send newsletter' },
        { status: 500 }
      )
    }

    console.log(`Newsletter sent to ${recipientEmails.length} subscribers`, data)

    // If this came from a form submission, redirect back to the admin page with a success flag
    if (!contentType.includes('application/json')) {
      const url = new URL('/rethink-admin-insights?sent=1', request.url)
      return NextResponse.redirect(url)
    }

    return NextResponse.json(
      {
        message: `Newsletter sent to ${recipientEmails.length} subscribers.`,
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

