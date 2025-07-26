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
    // Modal controls
    document.getElementById('loginBtn').addEventListener('click', () => this.openModal('loginModal'));
    document.getElementById('signupBtn').addEventListener('click', () => this.openModal('signupModal'));
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));
    document.getElementById('resetForm').addEventListener('submit', (e) => this.handlePasswordReset(e));
    
    // Modal navigation
    document.getElementById('showSignup').addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal('loginModal');
      this.openModal('signupModal');
    });
    
    document.getElementById('showLogin').addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal('signupModal');
      this.openModal('loginModal');
    });
    
    document.getElementById('forgotPassword').addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal('loginModal');
      this.openModal('resetModal');
    });
    
    document.getElementById('showLoginFromReset').addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal('resetModal');
      this.openModal('loginModal');
    });
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        this.closeAllModals();
      });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeAllModals();
      }
    });
    
    // Password confirmation validation
    document.getElementById('signupConfirmPassword').addEventListener('input', (e) => {
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = e.target.value;
      
      if (password && confirmPassword && password !== confirmPassword) {
        e.target.setCustomValidity('Passwords do not match');
      } else {
        e.target.setCustomValidity('');
      }
    });
  }

  setLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
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

  async handleLogin(e) {
    e.preventDefault();
    this.setLoading('loginSubmitBtn', true);
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        this.showMessage('loginModal', error.message, 'error');
        return;
      }
      
      if (data.user && !data.user.confirmed_at) {
        this.showMessage('loginModal', 'Please confirm your email before logging in.', 'error');
        return;
      }
      
      this.login(data.user);
      this.closeModal(document.getElementById('loginModal'));
      this.showMessage('loginModal', 'Login successful!', 'success');
    } catch (error) {
      this.showMessage('loginModal', 'An unexpected error occurred. Please try again.', 'error');
    } finally {
      this.setLoading('loginSubmitBtn', false);
    }
  }

  async handleSignup(e) {
    e.preventDefault();
    this.setLoading('signupSubmitBtn', true);
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      this.showMessage('signupModal', 'Passwords do not match', 'error');
      this.setLoading('signupSubmitBtn', false);
      return;
    }
    
    if (password.length < 6) {
      this.showMessage('signupModal', 'Password must be at least 6 characters long', 'error');
      this.setLoading('signupSubmitBtn', false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      
      if (error) {
        this.showMessage('signupModal', error.message, 'error');
        return;
      }
      
      this.showMessage('signupModal', 'Account created! Please check your email to confirm your account.', 'success');
      this.closeModal(document.getElementById('signupModal'));
    } catch (error) {
      this.showMessage('signupModal', 'An unexpected error occurred. Please try again.', 'error');
    } finally {
      this.setLoading('signupSubmitBtn', false);
    }
  }

  async handlePasswordReset(e) {
    e.preventDefault();
    this.setLoading('resetSubmitBtn', true);
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
      });
      
      if (error) {
        this.showMessage('resetModal', error.message, 'error');
        return;
      }
      
      this.showMessage('resetModal', 'Password reset link sent! Check your email.', 'success');
      this.closeModal(document.getElementById('resetModal'));
    } catch (error) {
      this.showMessage('resetModal', 'An unexpected error occurred. Please try again.', 'error');
    } finally {
      this.setLoading('resetSubmitBtn', false);
    }
  }

  login(user) {
    this.currentUser = user;
    this.updateUI();
  }

  async logout() {
    try {
      await supabase.auth.signOut();
      this.currentUser = null;
      this.updateUI();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async checkAuthStatus() {
    try {
      const { data } = await supabase.auth.getUser();
      if (data && data.user) {
        this.currentUser = data.user;
        this.updateUI();
      }
    } catch (error) {
      console.error('Auth status check error:', error);
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

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  closeModal(modal) {
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

  closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      this.closeModal(modal);
    });
  }

  showMessage(modalId, message, type = 'error') {
    const modal = document.getElementById(modalId);
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