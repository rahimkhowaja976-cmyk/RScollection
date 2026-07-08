// Authentication System
const Authentication = {
  storageKey: 'rs-collection-auth',
  
  // Initialize authentication
  init() {
    this.checkSession();
  },
  
  // Check if user is logged in
  isLoggedIn() {
    return localStorage.getItem(this.storageKey) !== null;
  },
  
  // Get current user
  getCurrentUser() {
    const auth = localStorage.getItem(this.storageKey);
    return auth ? JSON.parse(auth) : null;
  },
  
  // Register new user
  registerUser() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const errorEl = document.getElementById('errorMessage');
    const successEl = document.getElementById('successMessage');
    
    // Clear previous messages
    if (errorEl) errorEl.style.display = 'none';
    if (successEl) successEl.style.display = 'none';
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      this.showError('Please fill in all fields');
      return;
    }
    
    if (!FormHandler.isValidEmail(email)) {
      this.showError('Please enter a valid email');
      return;
    }
    
    if (password.length < 6) {
      this.showError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      this.showError('Passwords do not match');
      return;
    }
    
    // Register the user
    const result = this.register(email, password, name);
    
    if (result.success) {
      if (successEl) {
        successEl.textContent = result.message;
        successEl.style.display = 'block';
      }
      showToast(result.message, 'success');
      form.reset();
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      this.showError(result.message);
    }
  },
  
  // Register helper method
  register(email, password, name) {
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('rs-users') || '[]');
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    
    // Add new user
    const user = {
      id: Date.now(),
      email: email,
      password: password, // In production, hash this!
      name: name || email.split('@')[0],
      createdAt: new Date().toISOString(),
      role: 'user'
    };
    
    users.push(user);
    localStorage.setItem('rs-users', JSON.stringify(users));
    
    return { success: true, message: 'Registration successful! Please login.' };
  },
  
  // Login user
  login() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    const email = form.email.value.trim();
    const password = form.password.value;
    const errorEl = document.getElementById('errorMessage');
    
    // Clear previous errors
    if (errorEl) errorEl.style.display = 'none';
    
    // Validate inputs
    if (!email || !password) {
      this.showError('Please enter both email and password');
      return;
    }
    
    if (!FormHandler.isValidEmail(email)) {
      this.showError('Please enter a valid email');
      return;
    }
    
    // Check credentials
    const users = JSON.parse(localStorage.getItem('rs-users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      this.showError('Invalid email or password');
      return;
    }
    
    // Set user session
    localStorage.setItem(this.storageKey, JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      loginTime: new Date().toISOString()
    }));
    
    // Show success and redirect
    showToast(`Welcome back, ${user.name}!`, 'success');
    setTimeout(() => {
      window.location.href = '../dashboard/dashboard.html';
    }, 1500);
  },
  
  // Logout user
  logout() {
    localStorage.removeItem(this.storageKey);
    showToast('You have been logged out', 'info');
    setTimeout(() => {
      window.location.href = '../auth/login.html';
    }, 1000);
  },
  
  // Check session on page load
  checkSession() {
    const currentPage = window.location.pathname;
    const isAuthPage = currentPage.includes('/auth/');
    const isLoggedIn = this.isLoggedIn();
    
    // If logged in and on auth page, redirect to dashboard
    if (isLoggedIn && isAuthPage) {
      window.location.href = '../dashboard/dashboard.html';
    }
    
    // If not logged in and not on auth page, redirect to login
    if (!isLoggedIn && !isAuthPage) {
      window.location.href = '../auth/login.html';
    }
  },
  
  // Show error message
  showError(message) {
    const errorEl = document.getElementById('errorMessage');
    const successEl = document.getElementById('successMessage');
    
    if (successEl) successEl.style.display = 'none';
    
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  },
  
  // Create sample user for testing
  createSampleUser() {
    const users = JSON.parse(localStorage.getItem('rs-users') || '[]');
    
    // Check if sample user exists
    if (!users.some(u => u.email === 'demo@rscollection.com')) {
      users.push({
        id: Date.now(),
        email: 'demo@rscollection.com',
        password: 'demo123',
        name: 'Demo User',
        createdAt: new Date().toISOString(),
        role: 'admin'
      });
      localStorage.setItem('rs-users', JSON.stringify(users));
    }
  },
  
  // Display user name in topbar
  displayUserName() {
    const user = this.getCurrentUser();
    const userDisplay = document.getElementById('userNameDisplay');
    
    if (user && userDisplay) {
      userDisplay.textContent = `👤 ${user.name}`;
    }
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  Authentication.init();
  Authentication.createSampleUser();
  Authentication.displayUserName();
});
