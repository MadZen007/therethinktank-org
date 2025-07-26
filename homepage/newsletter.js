class NewsletterForm {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Newsletter button in feature card
    document.getElementById('newsletterCardBtn').addEventListener('click', (e) => {
      e.preventDefault();
      this.openNewsletterModal();
    });

    // Newsletter form submission
    document.getElementById('newsletterForm').addEventListener('submit', (e) => this.handleSubmit(e));

    // Close modal when clicking close button or outside
    const modal = document.getElementById('newsletterModal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', () => this.closeNewsletterModal());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeNewsletterModal();
      }
    });
  }

  openNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Auto-focus on first input
    setTimeout(() => {
      document.getElementById('newsletterName').focus();
    }, 100);
  }

  closeNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('newsletterForm').reset();
  }

  setLoading(loading) {
    const btn = document.getElementById('newsletterSubmitBtn');
    const btnText = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.spinner');
    
    if (loading) {
      btn.disabled = true;
      btnText.style.display = 'none';
      spinner.style.display = 'inline-block';
    } else {
      btn.disabled = false;
      btnText.style.display = 'inline';
      spinner.style.display = 'none';
    }
  }

  showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type} newsletter-message`;
    messageDiv.textContent = message;
    
    const modal = document.getElementById('newsletterModal');
    const form = document.getElementById('newsletterForm');
    modal.querySelector('.modal-content').insertBefore(messageDiv, form);

    // Auto-remove success messages
    if (type === 'success') {
      setTimeout(() => {
        messageDiv.remove();
      }, 3000);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setLoading(true);
    
    const formData = new FormData(e.target);
    const newsletterData = {
      name: formData.get('name'),
      email: formData.get('email'),
      consent: formData.get('consent') === 'on'
    };

    try {
      // For now, we'll just show a success message
      // In the future, you can integrate with an email service like Mailchimp, ConvertKit, or Resend
      this.showMessage('Thank you for subscribing! You\'ll receive our first newsletter soon.', 'success');
      
      setTimeout(() => {
        this.closeNewsletterModal();
      }, 3000);
      
    } catch (error) {
      console.error('Newsletter signup error:', error);
      this.showMessage('Failed to subscribe. Please try again.', 'error');
    } finally {
      this.setLoading(false);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.newsletterForm = new NewsletterForm();
}); 