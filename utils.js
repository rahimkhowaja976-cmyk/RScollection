// Utility Functions
const Utils = {
  
  // Format currency
  formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  },
  
  // Format date
  formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },
  
  // Format time
  formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  // Format date and time
  formatDateTime(date) {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  // Get URL parameter
  getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },
  
  // Calculate percentage
  calculatePercentage(part, total) {
    return total === 0 ? 0 : ((part / total) * 100).toFixed(2);
  },
  
  // Calculate discount
  calculateDiscount(originalPrice, discountPercent) {
    return originalPrice - (originalPrice * (discountPercent / 100));
  },
  
  // Calculate tax
  calculateTax(amount, taxPercent) {
    return amount * (taxPercent / 100);
  },
  
  // Round to 2 decimals
  roundToTwo(num) {
    return Math.round(num * 100) / 100;
  },
  
  // Generate random ID
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  },
  
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Check if offline
  isOffline() {
    return !navigator.onLine;
  },
  
  // Copy to clipboard
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!', 'success');
    });
  },
  
  // Export to CSV
  exportToCSV(data, filename) {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(obj => Object.values(obj).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'export.csv';
    a.click();
  }
};

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Update year in footer
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});\n