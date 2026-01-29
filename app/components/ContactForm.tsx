'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setStatusMessage('Thank you! Your message has been sent.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setStatusMessage('Something went wrong. Please try again later.')
      }
    } catch (error) {
      setStatus('error')
      setStatusMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <>
    <form className="contact-form" onSubmit={handleSubmit}>
      {statusMessage && (
        <div className={`form-message ${status}`}>
          {statusMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">
          Message <span className="label-hint">(be sure to include details about your situation and the results you're hoping to get)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>

    {/* Newsletter Signup Section */}
    <div className="newsletter-signup">
      <h3>Get Weekly Updates</h3>
      <p>Sign up for our weekly newsletter to get practical insights and updates.</p>
      <form 
        className="newsletter-form"
        onSubmit={async (e) => {
          e.preventDefault()
          setNewsletterStatus('loading')
          setNewsletterMessage('')

          try {
            const response = await fetch('/api/newsletter', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: newsletterEmail }),
            })

            if (response.ok) {
              setNewsletterStatus('success')
              setNewsletterMessage('Thanks! You\'re signed up for the newsletter.')
              setNewsletterEmail('')
            } else {
              const data = await response.json()
              setNewsletterStatus('error')
              setNewsletterMessage(data.error || 'Something went wrong. Please try again.')
            }
          } catch (error) {
            setNewsletterStatus('error')
            setNewsletterMessage('Something went wrong. Please try again.')
          }
        }}
      >
        {newsletterMessage && (
          <div className={`form-message ${newsletterStatus}`}>
            {newsletterMessage}
          </div>
        )}
        <div className="newsletter-input-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            required
            disabled={newsletterStatus === 'loading'}
            className="newsletter-input"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={newsletterStatus === 'loading'}
          >
            {newsletterStatus === 'loading' ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  </>
  )
}
