// Authentication System for Rethink Tank Hub
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.users = JSON.parse(localStorage.getItem('rtt_users')) || [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkAuthStatus();
  }

  setupEventListeners() {
    // Modal controls
    document.getElementById('loginBtn').addEventListener('click', () => this.showModal('loginModal'));
    document.getElementById('signupBtn').addEventListener('click', () => this.showModal('signupModal'));
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeModal(e.target);
      }
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));

    // Switch between modals
    document.getElementById('showSignup').addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal(document.getElementById('loginModal'));
      this.showModal('signupModal');
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal(document.getElementById('signupModal'));
      this.showModal('loginModal');
    });
  }

  showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    // Clear any previous messages
    this.clearMessages(modalId);
  }

  closeModal(modal) {
    modal.style.display = 'none';
    // Clear form data
    const form = modal.querySelector('form');
    if (form) form.reset();
  }

  clearMessages(modalId) {
    const modal = document.getElementById(modalId);
    const messages = modal.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
  }

  showMessage(modalId, message, type = 'error') {
    const modal = document.getElementById(modalId);
    this.clearMessages(modalId);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    const form = modal.querySelector('form');
    form.insertBefore(messageDiv, form.firstChild);
  }

  handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.login(user);
      this.closeModal(document.getElementById('loginModal'));
      this.showMessage('loginModal', 'Login successful!', 'success');
    } else {
      this.showMessage('loginModal', 'Invalid email or password');
    }
  }

  handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Validation
    if (password !== confirmPassword) {
      this.showMessage('signupModal', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      this.showMessage('signupModal', 'Password must be at least 6 characters long');
      return;
    }

    if (this.users.find(u => u.email === email)) {
      this.showMessage('signupModal', 'Email already registered');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      subscription: {
        status: 'free',
        expiresAt: null
      }
    };

    this.users.push(newUser);
    localStorage.setItem('rtt_users', JSON.stringify(this.users));
    
    this.login(newUser);
    this.closeModal(document.getElementById('signupModal'));
    this.showMessage('signupModal', 'Account created successfully!', 'success');
  }

  login(user) {
    this.currentUser = user;
    localStorage.setItem('rtt_currentUser', JSON.stringify(user));
    this.updateUI();
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('rtt_currentUser');
    this.updateUI();
  }

  checkAuthStatus() {
    const savedUser = localStorage.getItem('rtt_currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.updateUI();
    }
  }

  updateUI() {
    const authButtons = document.getElementById('loginBtn').parentElement;
    const userStatus = document.getElementById('userStatus');
    const userName = document.getElementById('userName');

    if (this.currentUser) {
      // User is logged in
      authButtons.style.display = 'none';
      userStatus.style.display = 'flex';
      userName.textContent = `Welcome, ${this.currentUser.name}`;
      
      // Update feature card links to include user info
      this.updateFeatureLinks();
    } else {
      // User is not logged in
      authButtons.style.display = 'flex';
      userStatus.style.display = 'none';
      
      // Reset feature card links
      this.resetFeatureLinks();
    }
  }

  updateFeatureLinks() {
    // Add user authentication to feature links
    const featureLinks = document.querySelectorAll('.features-grid .btn');
    featureLinks.forEach(link => {
      const currentHref = link.getAttribute('href');
      if (currentHref && !currentHref.includes('?')) {
        link.href = `${currentHref}?user=${encodeURIComponent(this.currentUser.id)}`;
      }
    });
  }

  resetFeatureLinks() {
    // Remove user authentication from feature links
    const featureLinks = document.querySelectorAll('.features-grid .btn');
    featureLinks.forEach(link => {
      const currentHref = link.getAttribute('href');
      if (currentHref && currentHref.includes('?')) {
        link.href = currentHref.split('?')[0];
      }
    });
  }

  // Utility methods for other parts of the application
  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  getUserSubscription() {
    return this.currentUser ? this.currentUser.subscription : null;
  }

  updateUserSubscription(subscription) {
    if (this.currentUser) {
      this.currentUser.subscription = subscription;
      localStorage.setItem('rtt_currentUser', JSON.stringify(this.currentUser));
      
      // Update in users array
      const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
      if (userIndex !== -1) {
        this.users[userIndex] = this.currentUser;
        localStorage.setItem('rtt_users', JSON.stringify(this.users));
      }
    }
  }
}

// Initialize authentication system when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.authSystem = new AuthSystem();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthSystem;
} 