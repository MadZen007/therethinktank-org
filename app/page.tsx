'use client'

import ContactForm from './components/ContactForm'

export default function Home() {
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
                that hits the most parts of your life at once, then go after that first—so one change buys you the 
                biggest possible return. You get practical frameworks, simple experiments to run in the real world, 
                and clear ways to see what's working and what isn't.
              </p>
              <p>
                In a world moving this fast, you don't have time for solutions that crawl. You need tools that move 
                at least as quickly as your problems do—and that's what these books and systems are designed to give you.
              </p>
            </div>
            <div className="hero-cta">
              <a href="#books" className="btn btn-primary">
                Start With the Books
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
              Our books provide actionable advice you can use immediately—without needing 
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
            <p>No. This is not traditional therapy, diagnosis, or medical treatment.</p>
            <p>
              Therapy at its best helps you see what's going on under the surface and then change how you live. 
              The problem is what "therapy culture" often becomes: endless talking, more labels, more self‑analysis…
              and not much different in your day‑to‑day life.
            </p>
            <p>
              What I offer is a one‑day, plain‑English intensive focused on a specific problem: how it actually works 
              in your life and what you can start doing differently this week. It's ReThink and ReBuild, not a standing 
              weekly therapy appointment.
            </p>
          </div>

          <div className="faq-item">
            <h3>Who is this for?</h3>
            <p>This is for people who:</p>
            <ul>
              <li>
                Are stuck in a repeating pattern (relationships, dating, anger, burnout, nervous‑system overwhelm, work/career) 
                and want it to actually change, not just be explained.
              </li>
              <li>Would rather give one serious day to a real reset than drip half‑attention across 30 weeks.</li>
              <li>Prefer direct, honest, practical conversation over jargon and vague advice.</li>
            </ul>
            <p>
              It tends to be a strong fit for men and couples who bounced off traditional "talk about your feelings forever" 
              approaches and want something more like a focused pit stop: assess the damage, triage the root, and leave with 
              a concrete plan.
            </p>
          </div>

          <div className="faq-item">
            <h3>Who is this not for?</h3>
            <p>This is not a good fit if:</p>
            <ul>
              <li>You're in acute crisis that needs medical or emergency care (suicidality, active addiction crisis, untreated severe mental illness).</li>
              <li>You're looking for long‑term therapy, diagnosis, or medication management.</li>
              <li>You mainly want a place to vent without any pressure to experiment with new behavior.</li>
            </ul>
            <p>
              In those situations, local licensed professionals and crisis services are the right move. This intensive is 
              for people who are functional but stuck, and ready to work.
            </p>
          </div>

          <div className="faq-item">
            <h3>Why a full day instead of weekly sessions?</h3>
            <p>
              Some problems don't need 40 weeks of circling. They need one good day of telling the truth, mapping the pattern, 
              and designing specific experiments you can run in real life.
            </p>
            <p>Weekly 50‑minute slots often mean:</p>
            <ul>
              <li>Spending half the time just getting back into the story.</li>
              <li>Running out of clock right when things get real.</li>
              <li>
                Never having enough space to connect your wiring (biology), the stories you've absorbed (society), and the 
                environment you're living in (technology, stress, feeds).
              </li>
            </ul>
            <p>
              A full day lets us dig past symptoms into the pattern underneath, sort what's in your control from what isn't, 
              and build a short, testable plan we can stress‑test before you leave. It's triage and rebuild, not a subscription 
              plan for your pain.
            </p>
          </div>

          <div className="faq-item">
            <h3>What actually happens during the day?</h3>
            <p>The exact flow depends on your situation, but generally we:</p>
            <ul>
              <li>
                <strong>Clarify the problem.</strong> Where does the "rattle" show up—relationships, dating, work, anger, shutdown, anxiety?
              </li>
              <li>
                <strong>Map the pattern.</strong> We look at how your wiring, your history, and your current environment are all feeding this.
              </li>
              <li>
                <strong>Triage the root.</strong> We choose the part that is both most painful and most changeable right now.
              </li>
              <li>
                <strong>Design experiments.</strong> We co‑create 2–4 specific things to try over the next few weeks: conversations, boundaries, new responses, environmental tweaks.
              </li>
              <li>
                <strong>Set metrics.</strong> How will you know it's working? What should feel different in a week, a month?
              </li>
            </ul>
            <p>
              There are breaks. The day is intense, but it's not a grind. You leave tired, clearer, and with a short list of moves 
              to start running immediately.
            </p>
          </div>

          <div className="faq-item">
            <h3>How does the initial contact work?</h3>
            <p>The first step is simple and free.</p>
            <p>
              You fill out the contact form and describe what's going on: what's not working, where you feel stuck, and what you want to be different. 
              That email gives me a chance to review what kind of help you're looking for and whether this style of work is actually a good fit.
            </p>
            <p>I respond to every inquiry with an honest yes or no:</p>
            <ul>
              <li>If I'm not the right person, I'll tell you that, so you don't waste your time or money.</li>
              <li>
                If it <em>is</em> a good fit, we'll talk about logistics and dates for a full day.
              </li>
            </ul>
            <p>
              There's no charge for that initial back‑and‑forth. It's there to protect both of us from forcing a bad fit.
            </p>
          </div>

          <div className="faq-item">
            <h3>Can we do this online, or does it have to be in person?</h3>
            <p>Both are possible—but in‑person is better whenever you can swing it.</p>
            <p>
              Face‑to‑face, people tend to be more honest and less performative. There's no screen or keyboard to hide behind, and a lot of what matters 
              in this work—body language, nervous‑system reactions, micro‑tells—shows up much more clearly when we're in the same room. Being in the same 
              physical space makes it harder to stay in "performance mode" and easier to stay with what's real.
            </p>
            <p>I'm based in Bangkok, Thailand. You have two in‑person options:</p>
            <ul>
              <li>
                <strong>Bring me to you.</strong> You cover travel and lodging; I come to your city for the day.
              </li>
              <li>
                <strong>Come to me.</strong> Treat it as a therapeutic mini‑vacation: fly to Thailand, block off a day for the intensive, and use the rest 
                of the trip to let your system actually downshift.
              </li>
            </ul>
            <p>
              If travel isn't realistic, we can absolutely run the intensive over video. The key is that you treat it like an in‑person day: full day blocked off, 
              private space, phone off, no multitasking.
            </p>
            <p>In‑person is the A‑tier option. Online is a strong B‑tier if you show up the same way.</p>
          </div>

          <div className="faq-item">
            <h3>How does pricing work?</h3>
            <p>
              To reserve a full day, there is a <strong>1,000 USD non‑refundable booking fee</strong>.
            </p>
            <p>
              If you bring me to you, you cover travel and lodging at cost. If you come to me in Bangkok, there are no extra expenses on that front beyond your own travel.
            </p>
            <p>
              After the day, <em>you</em> decide what the work was worth and pay accordingly on top of the booking fee. Most clients land somewhere between 
              <strong>3,000 and 7,500 USD total</strong>, depending on their situation, means, and the value they feel they received.
            </p>
            <p>
              If you feel like the day genuinely didn't move the needle for you, you don't owe more than the booking fee.
            </p>
            <p>
              This structure keeps skin in the game on both sides: you're committing real time and money, and I'm committing to delivering enough value that you want to pay beyond the minimum—not because you're pressured to, but because it helped.
            </p>
          </div>

          <div className="faq-item">
            <h3>What if I can't afford more than the booking fee?</h3>
            <p>
              If you already know you can only afford the booking fee, say that up front in your initial email. If the problem is something we can realistically move in a day and the fit is otherwise good, we can decide together whether it still makes sense to work.
            </p>
            <p>
              What doesn't work is hiding your real limits and then feeling guilty or resentful later. Being honest about money is part of the work: the whole point is to make practical decisions that fit your actual reality, not a fantasy version of your life.
            </p>
          </div>

          <div className="faq-item">
            <h3>What happens after the day is over?</h3>
            <p>You leave with a written summary of:</p>
            <ul>
              <li>The core pattern we found.</li>
              <li>The experiments you're going to run.</li>
              <li>The "warning signs" vs "progress signs" to watch for over the next few weeks.</li>
            </ul>
            <p>
              You implement for a set period (usually 2–4 weeks). If you want a follow‑up to adjust based on what actually happened, we can book a shorter session for that. There is no automatic subscription and no expectation that you'll keep coming forever.
            </p>
            <p>The work only counts if it shows up in your actual life.</p>
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
