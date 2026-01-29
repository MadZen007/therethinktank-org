import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      )
    }

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_EMAIL || 'madzenejk@gmail.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || `onboarding@resend.dev`

    // Send notification email to you about the new signup
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: `New Newsletter Signup: ${email}`,
      html: `
        <h2>New Newsletter Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Signed up at:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><small>Add this email to your newsletter list to ensure they receive weekly updates.</small></p>
      `,
      text: `
New Newsletter Signup

Email: ${email}
Signed up at: ${new Date().toLocaleString()}

---
Add this email to your newsletter list to ensure they receive weekly updates.
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to process signup' },
        { status: 500 }
      )
    }

    console.log('Newsletter signup notification sent:', data)

    // TODO: In the future, you could also add the email to Resend's Audience
    // or a database here for automated newsletter sending

    return NextResponse.json(
      { message: 'Successfully signed up for newsletter' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing newsletter signup:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    )
  }
}
