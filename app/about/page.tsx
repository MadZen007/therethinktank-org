export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <main style={{ padding: '2rem 1rem', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            border: '1px solid #272B33',
            color: '#E5E7EB',
            textDecoration: 'none',
            fontSize: '0.9rem',
            backgroundColor: '#020617',
          }}
        >
          <span style={{ fontSize: '0.9rem' }}>←</span>
          <span>Back to Home</span>
        </a>
      </div>

      <header style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '999px',
            overflow: 'hidden',
            border: '2px solid #272B33',
          }}
        >
          <img
            src="/author.png"
            alt="Zen Kyoki"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>About Me</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Zen Kyoki</h2>
          <p style={{ fontSize: '1.1rem', color: '#9EA4AE' }}>Human Systems Mechanic</p>
          <p style={{ marginTop: '0.75rem', color: '#9EA4AE' }}>
            Helping people identify the patterns shaping their lives and redesign them.
          </p>
        </div>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
        <p>
          Most author bios are written in the third person to sound professional.
        </p>
        <p>That’s fine.</p>
        <p>
          But if you ever book a session with me, we’ll be spending an entire day digging into the real mechanics of your
          life. Pretending there’s some polished distance between us would be strange.
        </p>
        <p>So I’d rather speak directly.</p>
        <p>I’m not a guru.</p>
        <p>I’m not a motivational speaker.</p>
        <p>And I’m not interested in selling you a personality cult.</p>
        <p>What I do is much simpler.</p>
        <p>
          I help people identify the patterns running their lives, understand where those patterns came from, and design
          practical experiments to change them.
        </p>
      </section>

      <hr style={{ borderColor: '#272B33', margin: '2rem 0' }} />

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
        <h2 style={{ fontSize: '1.6rem' }}>Where This Perspective Came From</h2>
        <p>I grew up in a house that was a masterclass in contradictions.</p>
        <p>
          My mother was a prison psychologist with two PhDs. Long before I had a driver’s license I was hearing case
          studies about how people justify their actions, sabotage themselves, and build narratives around their behavior.
        </p>
        <p>My father represented the opposite pole.</p>
        <p>His rule was simple:</p>
        <p>
          <em>Watch what people DO, not what they say.</em>
        </p>
        <p>Between those two influences I learned to pay attention to both:</p>
        <p>why people believe what they believe</p>
        <p>and</p>
        <p>what their behavior actually proves.</p>
        <p>
          Over the years I’ve spent thousands of hours listening to how people explain their lives ...and comparing those
          explanations to what their behavior actually shows.
        </p>
        <p>That gap is where most life problems live.</p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', fontSize: '1.1rem' }}>
        <h2 style={{ fontSize: '1.6rem' }}>The Very Non-Linear Career Path</h2>
        <p>My career path has been anything but conventional.</p>
        <p>I’ve worked as:</p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li>a corporate manager</li>
          <li>a tattoo artist</li>
          <li>a furniture designer for the sex industry</li>
          <li>
            and an unofficial sounding board for countless people trying to figure out their relationships, careers, and
            identities.
          </li>
        </ul>
        <p>Those environments might seem unrelated.</p>
        <p>But they all exposed me to the same thing:</p>
        <p>People trying to solve problems without understanding the system creating them.</p>
        <p>In most cases the visible issue wasn’t the real issue.</p>
        <p>It was a symptom.</p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', fontSize: '1.1rem' }}>
        <h2 style={{ fontSize: '1.6rem' }}>The Moment I Had to Test My Own Thinking</h2>
        <p>A few years ago I hit a perfect storm of isolation and financial collapse.</p>
        <p>The kind of moment where the comfortable explanations you’ve been using stop working.</p>
        <p>For me that moment happened on a balcony in Bangkok.</p>
        <p>I had to confront a very simple question:</p>
        <p>
          <em>What if the way I’ve been thinking about my life is wrong?</em>
        </p>
        <p>
          Everything I do now — the books, the ReThink project, and the sessions I offer — came out of rebuilding my own
          mental framework from the ground up.
        </p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', fontSize: '1.1rem' }}>
        <h2 style={{ fontSize: '1.6rem' }}>What I Actually Do</h2>
        <p>
          When someone books a session, we spend a full day examining the system underneath their biggest problem. Not just
          the symptom. The pattern.
        </p>
        <p>Your job isn’t to arrive with a perfectly explained issue. Most people can’t.</p>
        <p>Your job is simply to be honest about two things:</p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li>what your life actually looks like right now</li>
          <li>what you wish was different</li>
        </ul>
        <p>From there, I do most of the driving.</p>
        <p>
          I ask the questions, map the patterns in your behavior and environment, and help us identify the disconnect
          between the life you want and the system you’re currently running.
        </p>
        <p>Once we find the root issue, we design real-world experiments to test new approaches.</p>
        <p>Not vague advice. Concrete changes you can run in your life immediately.</p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', fontSize: '1.1rem' }}>
        <h2 style={{ fontSize: '1.6rem' }}>The Goal</h2>
        <p>Most people spend years trying to fix symptoms.</p>
        <p>The real work is learning to see the pattern underneath them.</p>
        <p>My goal is simple:</p>
        <p>
          Help you recognize the system shaping your life so you can consciously redesign it. Because once you see the
          pattern clearly, you’re no longer stuck reacting to it.
        </p>
        <p>You can start steering.</p>
      </section>
      
      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-start' }}>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            border: '1px solid #272B33',
            color: '#E5E7EB',
            textDecoration: 'none',
            fontSize: '0.9rem',
            backgroundColor: '#020617',
          }}
        >
          <span style={{ fontSize: '0.9rem' }}>←</span>
          <span>Back to Home</span>
        </a>
      </div>
    </main>
  )
}

