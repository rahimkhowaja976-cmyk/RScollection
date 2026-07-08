// Form Handling and Validation
const FormHandler = {
  
  // Validate email
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  // Validate phone
  isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
  },
  
  // Validate required field
  isRequired(value) {
    return value && value.trim() !== '';
  },
  
  // Validate number
  isValidNumber(value) {
    return !isNaN(value) && value > 0;
  },
  
  // Get form data as object
  getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;
    
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  },
  
  // Show validation error
  showError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.add('error');
      const errorEl = document.createElement('small');
      errorEl.className = 'error-message';
      errorEl.textContent = message;
      field.parentElement.appendChild(errorEl);
    }
  },
  
  // Clear validation errors
  clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.remove());
  },
  
  // Validate product form
  validateProductForm(data) {
    this.clearErrors();
    let isValid = true;
    
    if (!this.isRequired(data.name)) {
      this.showError('name', 'Product name is required');
      isValid = false;
    }
    
    if (!this.isRequired(data.sku)) {
      this.showError('sku', 'SKU is required');
      isValid = false;
    }
    
    if (!this.isValidNumber(data.price)) {
      this.showError('price', 'Price must be a valid number');
      isValid = false;
    }
    
    if (!this.isValidNumber(data.quantity)) {
      this.showError('quantity', 'Quantity must be a valid number');
      isValid = false;
    }
    
    return isValid;
  },
  
  // Validate customer form
  validateCustomerForm(data) {
    this.clearErrors();
    let isValid = true;
    
    if (!this.isRequired(data.name)) {
      this.showError('name', 'Customer name is required');
      isValid = false;
    }
    
    if (!this.isRequired(data.email) || !this.isValidEmail(data.email)) {
      this.showError('email', 'Valid email is required');
      isValid = false;
    }
    
    if (!this.isRequired(data.phone)) {
      this.showError('phone', 'Phone number is required');
      isValid = false;
    }
    
    return isValid;
  },
  
  // Validate sale form
  validateSaleForm(data) {
    this.clearErrors();
    let isValid = true;
    
    if (!this.isRequired(data.customerId)) {
      this.showError('customerId', 'Customer is required');
      isValid = false;
    }
    
    if (!this.isRequired(data.items) || data.items === '0') {
      this.showError('items', 'At least one item is required');
      isValid = false;
    }
    
    return isValid;
  },
  
  // Reset form
  resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
      form.reset();
      this.clearErrors();
    }
  }
};
