// Contact form handling with Resend integration
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Contact button in footer
    document.getElementById('contactUsBtn').addEventListener('click', (e) => {
      e.preventDefault();
      this.openContactModal();
    });

    // Contact button in feature card
    const contactCardBtn = document.querySelector('.features-grid .card:nth-child(2) .btn');
    if (contactCardBtn) {
      contactCardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openContactModal();
      });
    }

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', (e) => this.handleSubmit(e));
  }

  openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear form
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
    }
    
    // Clear messages
    const messages = modal.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
  }

  setLoading(isLoading) {
    const button = document.getElementById('contactSubmitBtn');
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.spinner');
    
    if (isLoading) {
      button.disabled = true;
      button.classList.add('loading');
      btnText.style.display = 'none';
      spinner.style.display = 'inline-block';
    } else {
      button.disabled = false;
      button.classList.remove('loading');
      btnText.style.display = 'inline';
      spinner.style.display = 'none';
    }
  }

  showMessage(message, type = 'error') {
    const modal = document.getElementById('contactModal');
    const existingMessage = modal.querySelector('.message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    const form = modal.querySelector('form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.remove();
        }
      }, 5000);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setLoading(true);
    
    const formData = new FormData(e.target);
    const contactData = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      // Send to your backend/API endpoint
      const response = await fetch('./api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      this.showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
      
      // Keep modal open for a moment so user sees success message
      setTimeout(() => {
        this.closeContactModal();
      }, 3000);
      
    } catch (error) {
      console.error('Contact form error:', error);
      this.showMessage('Failed to send message. Please try again or email us directly.', 'error');
    } finally {
      this.setLoading(false);
    }
  }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.contactForm = new ContactForm();
}); 