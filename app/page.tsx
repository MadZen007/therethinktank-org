'use client'

import { useState } from 'react'
import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>RethinkTank</h1>
            <p>Real self-help for people who hate therapy culture</p>
            <img 
              src="https://via.placeholder.com/600x500/e0e0e0/666666?text=RethinkTank+Hero" 
              alt="RethinkTank Hero" 
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
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
      <section className="books">
        <div className="container">
          <h2 className="section-heading">Books</h2>
          <div className="books-grid">
            <div className="book-card">
              <img 
                src="https://via.placeholder.com/300x400/e0e0e0/666666?text=Book+1" 
                alt="Book 1" 
                className="book-image"
              />
              <div className="book-content">
                <h3 className="book-title">Book Title One</h3>
                <p className="book-description">
                  A practical guide to getting what you want without the self-help nonsense. 
                  Real strategies for real results.
                </p>
                <a 
                  href="https://www.amazon.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Buy on Amazon
                </a>
              </div>
            </div>

            <div className="book-card">
              <img 
                src="https://via.placeholder.com/300x400/e0e0e0/666666?text=Book+2" 
                alt="Book 2" 
                className="book-image"
              />
              <div className="book-content">
                <h3 className="book-title">Book Title Two</h3>
                <p className="book-description">
                  Stop overthinking and start doing. This book shows you how to cut through 
                  analysis paralysis and take action.
                </p>
                <a 
                  href="https://www.amazon.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Buy on Amazon
                </a>
              </div>
            </div>

            <div className="book-card">
              <img 
                src="https://via.placeholder.com/300x400/e0e0e0/666666?text=Book+3" 
                alt="Book 3" 
                className="book-image"
              />
              <div className="book-content">
                <h3 className="book-title">Book Title Three</h3>
                <p className="book-description">
                  Direct advice for building the life you actually want, not the one 
                  everyone says you should want.
                </p>
                <a 
                  href="https://www.amazon.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Buy on Amazon
                </a>
              </div>
            </div>
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
          <p>&copy; {new Date().getFullYear()} RethinkTank. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
