'use client'

import { useState } from 'react'

type FaqItem = {
  slug: string
  question: string
  content: JSX.Element
}

const FAQ_ITEMS: FaqItem[] = [
  {
    slug: 'is-this-therapy',
    question: 'Is this therapy?',
    content: (
      <>
        <p>No.</p>
        <p>This is not therapy, diagnosis, or medical treatment.</p>
        <p>
          Therapy can be incredibly valuable. But many people eventually reach a point where they don’t need more explanation
          of their feelings... they need help identifying the pattern that keeps repeating in their life and designing practical
          ways to change it.
        </p>
        <p>
          What I offer is a one-day intensive focused on a specific problem: how it actually works in your life and what you
          can start doing differently immediately.
        </p>
        <p>Think of it less like weekly therapy and more like a deep diagnostic session for your life system.</p>
      </>
    ),
  },
  {
    slug: 'who-is-this-for',
    question: 'Who is this for?',
    content: (
      <>
        <p>This work tends to help people who:</p>
        <ul>
          <li>feel stuck in repeating patterns (relationships, career, anger, burnout, anxiety)</li>
          <li>want direct, practical conversations instead of vague advice</li>
          <li>would rather invest one serious day in solving a problem than stretch it across months</li>
          <li>are willing to question the assumptions shaping their decisions</li>
        </ul>
        <p>
          It’s especially useful for people who feel like they understand their problems intellectually but still find
          themselves repeating the same behaviors.
        </p>
      </>
    ),
  },
  {
    slug: 'who-is-this-not-for',
    question: 'Who is this not for?',
    content: (
      <>
        <p>This is not a good fit if:</p>
        <ul>
          <li>you are in an acute mental health crisis requiring medical care</li>
          <li>you need long-term therapy or psychiatric treatment</li>
          <li>you mainly want a place to vent without experimenting with change</li>
        </ul>
        <p>In those situations, licensed professionals and local support services are the right option.</p>
      </>
    ),
  },
  {
    slug: 'why-full-day',
    question: 'Why a full day instead of weekly sessions?',
    content: (
      <>
        <p>Some problems don’t need forty weeks of circling.</p>
        <p>
          They need one serious day of truth-telling, pattern mapping, and designing experiments you can run in the real
          world.
        </p>
        <p>Weekly sessions often mean:</p>
        <ul>
          <li>spending half the time catching up on the story</li>
          <li>running out of time right when the conversation gets meaningful</li>
          <li>never having enough space to connect the deeper pattern</li>
        </ul>
        <p>A full day allows us to dig past the symptoms, identify the root issue, and leave with a concrete plan.</p>
      </>
    ),
  },
  {
    slug: 'what-happens-during-day',
    question: 'What actually happens during the day?',
    content: (
      <>
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
        <p>The day is intense but not exhausting. There are breaks, and the goal is clarity... not emotional burnout.</p>
      </>
    ),
  },
  {
    slug: 'not-sure-problem',
    question: 'What if I’m not sure what my problem actually is?',
    content: (
      <>
        <p>That’s completely normal.</p>
        <p>Most people arrive with a feeling that something isn’t working, but they can’t clearly explain why.</p>
        <p>Your job is simply to be honest about two things:</p>
        <ul>
          <li>what your life currently looks like</li>
          <li>what you wish was different</li>
        </ul>
        <p>
          From there I guide the process. I ask the questions, map the patterns in your past and present behavior, and help us
          find the disconnect between your goals and the system you’re currently running.
        </p>
        <p>You don’t need perfect clarity. You just need honesty.</p>
      </>
    ),
  },
  {
    slug: 'initial-contact',
    question: 'How does the initial contact work?',
    content: (
      <>
        <p>The first step is simple and free.</p>
        <p>You send a message describing what’s going on in your life and what you would like to change.</p>
        <p>I review every inquiry personally and respond honestly.</p>
        <p>
          If I’m not the right person for your situation, I’ll tell you that directly so you don’t waste your time or money.
        </p>
        <p>If it looks like a good fit, we’ll discuss scheduling a full-day session.</p>
      </>
    ),
  },
  {
    slug: 'online-or-in-person',
    question: 'Can this be done online?',
    content: (
      <>
        <p>Yes, but in-person sessions are usually more effective.</p>
        <p>
          When we’re in the same room it’s easier to notice the subtle signals (body language, nervous-system reactions, tone
          shifts) that reveal patterns people may not consciously recognize.
        </p>
        <p>I’m based in Bangkok, Thailand.</p>
        <p>You have two in-person options:</p>
        <ul>
          <li>travel here for the session (like a vacation!)</li>
          <li>bring me to your city (travel expenses covered by you)</li>
        </ul>
        <p>If travel isn’t realistic, we can absolutely run the intensive over video.</p>
        <p>The key is treating the day the same way: full attention, no multitasking, and a private space.</p>
      </>
    ),
  },
  {
    slug: 'pricing',
    question: 'How does pricing work?',
    content: (
      <>
        <p>
          To reserve a full-day session there is a <strong>$500 non-refundable booking fee</strong>.
        </p>
        <p>
          At the end of the day, you decide what the work was worth to you and pay that amount on top of the booking fee.
        </p>
        <p>
          Most clients land somewhere between <strong>$1000 and $5000 total</strong>, depending on their situation and the
          value they feel the day created.
        </p>
        <p>
          If you genuinely feel the day didn’t move the needle for you, you’re not obligated to pay anything beyond the
          booking fee.
        </p>
        <p>This structure keeps both sides honest.</p>
      </>
    ),
  },
  {
    slug: 'after-the-day',
    question: 'What happens after the day is over?',
    content: (
      <>
        <p>You leave with a written summary including:</p>
        <ul>
          <li>the core pattern we identified</li>
          <li>the experiments you’ll be running</li>
          <li>what progress should look like over the next few weeks</li>
        </ul>
        <p>
          We will schedule a short follow-up session to see how the steps are working for you, and make adjustments if
          needed. (those are free)
        </p>
        <p>There’s no subscription and no expectation of ongoing sessions.</p>
        <p>The work only matters if it shows up in your real life.</p>
      </>
    ),
  },
]

export default function FaqAccordion() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [alreadyTracked, setAlreadyTracked] = useState<Set<string>>(new Set())

  const handleToggle = async (item: FaqItem) => {
    const nextOpen = openSlug === item.slug ? null : item.slug
    setOpenSlug(nextOpen)

    if (!alreadyTracked.has(item.slug)) {
      setAlreadyTracked(prev => {
        const next = new Set(prev)
        next.add(item.slug)
        return next
      })

      try {
        await fetch('/api/faq-click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug: item.slug, title: item.question }),
        })
      } catch {
        // Fail silently; tracking is best-effort.
      }
    }
  }

  return (
    <>
      {FAQ_ITEMS.map(item => {
        const isOpen = openSlug === item.slug
        return (
          <div key={item.slug} className="faq-item">
            <button
              type="button"
              onClick={() => handleToggle(item)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '0.9rem 0',
                color: 'inherit',
                fontSize: '22px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{item.question}</span>
              <span style={{ fontSize: '1.25rem', marginLeft: '1rem' }}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div style={{ paddingBottom: '0.75rem' }}>
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

