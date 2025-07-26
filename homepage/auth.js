// Initialize Supabase client
const SUPABASE_URL = '%%SUPABASE_URL%%';
const SUPABASE_ANON_KEY = '%%SUPABASE_ANON_KEY%%';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkAuthStatus();
  }

  setupEventListeners() {
    document.getElementById('loginBtn').addEventListener('click', () => this.showModal('loginModal'));
    document.getElementById('signupBtn').addEventListener('click', () => this.showModal('signupModal'));
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
    document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
    });
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeModal(e.target);
      }
    });
    document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));
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
    this.clearMessages(modalId);
  }

  closeModal(modal) {
    modal.style.display = 'none';
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

  async handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      this.showMessage('loginModal', error.message);
      return;
    }
    if (data.user && !data.user.confirmed_at) {
      this.showMessage('loginModal', 'Please confirm your email before logging in.');
      return;
    }
    this.login(data.user);
    this.closeModal(document.getElementById('loginModal'));
    this.showMessage('loginModal', 'Login successful!', 'success');
  }

  async handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    if (password !== confirmPassword) {
      this.showMessage('signupModal', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      this.showMessage('signupModal', 'Password must be at least 6 characters long');
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
    if (error) {
      this.showMessage('signupModal', error.message);
      return;
    }
    this.showMessage('signupModal', 'Account created! Please check your email to confirm your account.', 'success');
    this.closeModal(document.getElementById('signupModal'));
  }

  login(user) {
    this.currentUser = user;
    this.updateUI();
  }

  async logout() {
    await supabase.auth.signOut();
    this.currentUser = null;
    this.updateUI();
  }

  async checkAuthStatus() {
    const { data } = await supabase.auth.getUser();
    if (data && data.user) {
      this.currentUser = data.user;
      this.updateUI();
    }
  }

  updateUI() {
    const authButtons = document.getElementById('loginBtn').parentElement;
    const userStatus = document.getElementById('userStatus');
    const userName = document.getElementById('userName');
    if (this.currentUser) {
      authButtons.style.display = 'none';
      userStatus.style.display = 'flex';
      userName.textContent = `Welcome, ${this.currentUser.user_metadata?.name || this.currentUser.email}`;
      this.updateFeatureLinks();
    } else {
      authButtons.style.display = 'flex';
      userStatus.style.display = 'none';
      this.resetFeatureLinks();
    }
  }

  updateFeatureLinks() {
    const featureLinks = document.querySelectorAll('.features-grid .btn');
    featureLinks.forEach(link => {
      const currentHref = link.getAttribute('href');
      if (currentHref && !currentHref.includes('?')) {
        link.href = `${currentHref}?user=${encodeURIComponent(this.currentUser.id || this.currentUser.email)}`;
      }
    });
  }

  resetFeatureLinks() {
    const featureLinks = document.querySelectorAll('.features-grid .btn');
    featureLinks.forEach(link => {
      const currentHref = link.getAttribute('href');
      if (currentHref && currentHref.includes('?')) {
        link.href = currentHref.split('?')[0];
      }
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  getUserSubscription() {
    return null; // Not implemented with Supabase yet
  }

  updateUserSubscription(subscription) {
    // Not implemented with Supabase yet
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.authSystem = new AuthSystem();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthSystem;
} 