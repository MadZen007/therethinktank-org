'use client'

import { useEffect } from 'react'
import ContactForm from './components/ContactForm'

export default function Home() {
  useEffect(() => {
    // Fire and forget; errors are logged in the API route
    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'page_view', path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {})
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <video 
              src="/logo-animation.mp4" 
              className="hero-logo"
              autoPlay
              loop
              muted
              playsInline
            />
            <p className="hero-eyebrow">
              This isn't therapy culture. It's triage: figure out what's broken, test it, fix it, and move on. 
              Clear language, concrete actions, and results you can see.
            </p>
            <h1>Fix What's Broken, Then Move On</h1>
            <div className="hero-body">
              <p>
                Most of what gets sold as "mental health" now is a subscription service for your pain. 
                You sit in a room once a week, talk about the same problems, get a new label for your Instagram bio, 
                and walk out with no real feedback, no real answers, and no real results.
              </p>
              <p>
                Here, the goal isn't to keep you coming back. The goal is to fix what's actually broken.
              </p>
              <p>
                This place is built for people who want triage, not endless processing. We look for the root issue 
                that hits the most parts of your life at once, then go after that first... so one change buys you the 
                biggest possible return. You get practical frameworks, simple experiments to run in the real world, 
                and clear ways to see what's working and what isn't.
              </p>
              <p>
                In a world moving this fast, you don't have time for solutions that crawl. You need tools that move 
                at least as quickly as your problems do... and that's what these books and systems are designed to give you.
              </p>
            </div>
            <div className="hero-cta">
              <a href="/about" className="btn btn-primary">
                About Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <h2 className="section-heading">About</h2>
            <p>
              RethinkTank delivers blunt, practical self-help that cuts through the noise. 
              No therapy culture fluff. No empty platitudes. Just real answers for real people 
              who want to actually solve their problems.
            </p>
            <p>
              Our books provide actionable advice you can use immediately... without needing 
              to "find yourself" or "embrace your journey" first.
            </p>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="books">
        <div className="container">
          <h2 className="section-heading">Books</h2>
          <div className="books-grid">
            {/* Book 1 */}
            <div className="book-card">
              <img 
                src="/book1-cover.png" 
                alt="Finding Sex Zen book cover" 
                className="book-image"
              />
              <div className="book-content">
                <h3 className="book-title">
                  Finding Sex Zen: The most common mental blocks between monogamous and poly thinking
                </h3>
                <p className="book-description">
                  Give this book to that one friend or family member who just can't seem to wrap 
                  their head around your Polyamorous life.
                </p>
                <a 
                  href="https://www.amazon.com/Finding-Sex-Zen-monogamous-thinking-ebook/dp/B08TB4RX8D/ref=sr_1_1?crid=JYGH1K6NEO2H&dchild=1&keywords=finding+sex+zen&qid=1611787393&sprefix=finding+sex+zen%2Caps%2C555&sr=8-1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Buy on Amazon
                </a>
              </div>
            </div>

            {/* Book 2 */}
            <div className="book-card">
              <img
                src="/book2-cover.png"
                alt='Redefining "Common Sense" book cover'
                className="book-image"
              />
              <div className="book-content">
                <h3 className="book-title">
                  Redefining "Common Sense" A practical guide to reconnecting to ourselves and others...before it's too late
                </h3>
                <p className="book-description">
                  In a truly divided and isolated world, we need to find ourselves and our shared humanity, more than ever...this is the map to get you there.
                </p>
                <a 
                  href="https://www.barnesandnoble.com/w/redefining-common-sense-zen-kyoki/1149047623?ean=9798279607945" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Buy on Barnes&Nobles
                </a>
              </div>
            </div>

            {/* Book 3 */}
            <div className="book-card">
              <img
                src="/book3-cover.jpeg"
                alt="ReThink/ReBuild book cover"
                className="book-image"
              />
              <div className="book-content">
                <h3 className="book-title">
                  ReThink/ReBuild: A Practical Rebellion Against Therapy Culture
                </h3>
                <p className="book-description">
                  For anyone who is tired of endlessly talking about their problems...and are ready to DO something to start fixing them.
                </p>
                <a 
                  href="#" 
                  className="btn btn-primary"
                  onClick={(e) => e.preventDefault()}
                >
                  Coming Soon
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions</h2>

          <div className="faq-item">
            <h3>Is this therapy?</h3>
            <p>No.</p>
            <p>This is not therapy, diagnosis, or medical treatment.</p>
            <p>
              Therapy can be incredibly valuable. But many people eventually reach a point where they don’t need more explanation of their feelings...
              they need help identifying the pattern that keeps repeating in their life and designing practical ways to change it.
            </p>
            <p>
              What I offer is a one-day intensive focused on a specific problem: how it actually works in your life and what you can start doing differently immediately.
            </p>
            <p>Think of it less like weekly therapy and more like a deep diagnostic session for your life system.</p>
          </div>

          <div className="faq-item">
            <h3>Who is this for?</h3>
            <p>This work tends to help people who:</p>
            <ul>
              <li>
                feel stuck in repeating patterns (relationships, career, anger, burnout, anxiety)
              </li>
              <li>want direct, practical conversations instead of vague advice</li>
              <li>would rather invest one serious day in solving a problem than stretch it across months</li>
              <li>are willing to question the assumptions shaping their decisions</li>
            </ul>
            <p>
              It’s especially useful for people who feel like they understand their problems intellectually but still find themselves repeating the same behaviors.
            </p>
          </div>

          <div className="faq-item">
            <h3>Who is this not for?</h3>
            <p>This is not a good fit if:</p>
            <ul>
              <li>you are in an acute mental health crisis requiring medical care</li>
              <li>you need long-term therapy or psychiatric treatment</li>
              <li>you mainly want a place to vent without experimenting with change</li>
            </ul>
            <p>
              In those situations, licensed professionals and local support services are the right option.
            </p>
          </div>

          <div className="faq-item">
            <h3>Why a full day instead of weekly sessions?</h3>
            <p>
              Some problems don’t need forty weeks of circling.
            </p>
            <p>
              They need one serious day of truth-telling, pattern mapping, and designing experiments you can run in the real world.
            </p>
            <p>Weekly sessions often mean:</p>
            <ul>
              <li>spending half the time catching up on the story</li>
              <li>running out of time right when the conversation gets meaningful</li>
              <li>never having enough space to connect the deeper pattern</li>
            </ul>
            <p>
              A full day allows us to dig past the symptoms, identify the root issue, and leave with a concrete plan.
            </p>
          </div>

          <div className="faq-item">
            <h3>What actually happens during the day?</h3>
            <p>The exact flow depends on your situation, but most sessions include five stages.</p>
            <p>
              <strong>Clarifying the problem</strong>
            </p>
            <p>Where does the “rattle” show up in your life?</p>
            <p>
              <strong>Mapping the pattern</strong>
            </p>
            <p>We examine how your history, environment, and behavior interact.</p>
            <p>
              <strong>Identifying the root cause</strong>
            </p>
            <p>We find the part of the system that is both most painful and most changeable.</p>
            <p>
              <strong>Designing experiments</strong>
            </p>
            <p>We create 2–4 specific actions to test in the real world.</p>
            <p>
              <strong>Setting metrics</strong>
            </p>
            <p>We define what progress should look like over the next few weeks.</p>
            <p>
              The day is intense but not exhausting. There are breaks, and the goal is clarity... not emotional burnout.
            </p>
          </div>

          <div className="faq-item">
            <h3>What if I’m not sure what my problem actually is?</h3>
            <p>That’s completely normal.</p>
            <p>
              Most people arrive with a feeling that something isn’t working, but they can’t clearly explain why.
            </p>
            <p>Your job is simply to be honest about two things:</p>
            <ul>
              <li>what your life currently looks like</li>
              <li>what you wish was different</li>
            </ul>
            <p>
              From there I guide the process. I ask the questions, map the patterns in your past and present behavior, and help us find the disconnect between your goals and the system you’re currently running.
            </p>
            <p>You don’t need perfect clarity. You just need honesty.</p>
          </div>

          <div className="faq-item">
            <h3>How does the initial contact work?</h3>
            <p>The first step is simple and free.</p>
            <p>
              You send a message describing what’s going on in your life and what you would like to change.
            </p>
            <p>I review every inquiry personally and respond honestly.</p>
            <p>
              If I’m not the right person for your situation, I’ll tell you that directly so you don’t waste your time or money.
            </p>
            <p>If it looks like a good fit, we’ll discuss scheduling a full-day session.</p>
          </div>

          <div className="faq-item">
            <h3>Can this be done online?</h3>
            <p>Yes, but in-person sessions are usually more effective.</p>
            <p>
              When we’re in the same room it’s easier to notice the subtle signals (body language, nervous-system reactions, tone shifts) that reveal patterns people may not consciously recognize.
            </p>
            <p>I’m based in Bangkok, Thailand.</p>
            <p>You have two in-person options:</p>
            <ul>
              <li>
                travel here for the session (like a vacation!)
              </li>
              <li>
                bring me to your city (travel expenses covered by you)
              </li>
            </ul>
            <p>
              If travel isn’t realistic, we can absolutely run the intensive over video.
            </p>
            <p>
              The key is treating the day the same way: full attention, no multitasking, and a private space.
            </p>
          </div>

          <div className="faq-item">
            <h3>How does pricing work?</h3>
            <p>
              To reserve a full-day session there is a <strong>$500 non-refundable booking fee</strong>.
            </p>
            <p>
              At the end of the day, you decide what the work was worth to you and pay that amount on top of the booking fee.
            </p>
            <p>
              Most clients land somewhere between <strong>$1000 and $5000 total</strong>, depending on their situation and the value they feel the day created.
            </p>
            <p>
              If you genuinely feel the day didn’t move the needle for you, you’re not obligated to pay anything beyond the booking fee.
            </p>
            <p>
              This structure keeps both sides honest.
            </p>
          </div>

          <div className="faq-item">
            <h3>What happens after the day is over?</h3>
            <p>
              You leave with a written summary including:
            </p>
            <ul>
              <li>the core pattern we identified</li>
              <li>the experiments you’ll be running</li>
              <li>what progress should look like over the next few weeks</li>
            </ul>
            <p>
              We will schedule a short follow-up session to see how the steps are working for you, and make adjustments if needed. (those are free)
            </p>
            <p>There’s no subscription and no expectation of ongoing sessions.</p>
            <p>The work only matters if it shows up in your real life.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <div className="contact-content">
            <h2 className="section-heading">Get in Touch</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} RethinkTank. All rights reserved.</p>
            <div className="social-links">
              <a 
                href="https://www.facebook.com/profile.php?id=100092941872592" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/mad.zen.life" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
