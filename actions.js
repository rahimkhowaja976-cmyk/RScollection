// User Actions and Event Handlers
const Actions = {
  
  // ADD PRODUCT
  addProduct() {
    const data = FormHandler.getFormData('productForm');
    if (!data) return;
    
    if (!FormHandler.validateProductForm(data)) {
      showToast('Please fix errors and try again', 'error');
      return;
    }
    
    DB.addProduct({
      name: data.name,
      sku: data.sku,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      category: data.category,
      description: data.description
    });
    
    showToast('Product added successfully!', 'success');
    FormHandler.resetForm('productForm');
    setTimeout(() => {
      window.location.href = 'products.html';
    }, 1500);
  },
  
  // DELETE PRODUCT
  deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      DB.deleteProduct(id);
      showToast('Product deleted successfully!', 'success');
      location.reload();
    }
  },
  
  // EDIT PRODUCT
  editProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    
    const data = FormHandler.getFormData('productForm');
    if (!data) return;
    
    if (!FormHandler.validateProductForm(data)) {
      showToast('Please fix errors and try again', 'error');
      return;
    }
    
    DB.updateProduct(id, {
      name: data.name,
      sku: data.sku,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      category: data.category,
      description: data.description
    });
    
    showToast('Product updated successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'products.html';
    }, 1500);
  },
  
  // ADD CUSTOMER
  addCustomer() {
    const data = FormHandler.getFormData('customerForm');
    if (!data) return;
    
    if (!FormHandler.validateCustomerForm(data)) {
      showToast('Please fix errors and try again', 'error');
      return;
    }
    
    DB.addCustomer({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      country: data.country
    });
    
    showToast('Customer added successfully!', 'success');
    FormHandler.resetForm('customerForm');
    setTimeout(() => {
      window.location.href = 'customers.html';
    }, 1500);
  },
  
  // DELETE CUSTOMER
  deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
      DB.deleteCustomer(id);
      showToast('Customer deleted successfully!', 'success');
      location.reload();
    }
  },
  
  // NEW SALE
  newSale() {
    const data = FormHandler.getFormData('saleForm');
    if (!data) return;
    
    if (!FormHandler.validateSaleForm(data)) {
      showToast('Please fix errors and try again', 'error');
      return;
    }
    
    const customerId = parseInt(data.customerId);
    const items = JSON.parse(data.items || '[]');
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const sale = DB.addSale({
      customerId: customerId,
      items: items,
      total: total,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      status: 'Completed'
    });
    
    // Update inventory
    items.forEach(item => {
      const product = DB.getProduct(item.productId);
      if (product) {
        DB.updateProduct(item.productId, {
          quantity: product.quantity - item.quantity
        });
      }
    });
    
    showToast('Sale recorded successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'sales-history.html';
    }, 1500);
  },
  
  // DELETE SALE
  deleteSale(id) {
    if (confirm('Are you sure you want to delete this sale?')) {
      DB.deleteSale(id);
      showToast('Sale deleted successfully!', 'success');
      location.reload();
    }
  },
  
  // ADD PURCHASE
  addPurchase() {
    const data = FormHandler.getFormData('purchaseForm');
    if (!data) return;
    
    const supplierId = parseInt(data.supplierId);
    const items = JSON.parse(data.items || '[]');
    const total = items.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
    
    const purchase = DB.addPurchase({
      supplierId: supplierId,
      items: items,
      total: total,
      reference: data.reference,
      notes: data.notes,
      status: data.status
    });
    
    // Update inventory
    items.forEach(item => {
      const product = DB.getProduct(item.productId);
      if (product) {
        DB.updateProduct(item.productId, {
          quantity: product.quantity + item.quantity
        });
      }
    });
    
    showToast('Purchase recorded successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'purchase-history.html';
    }, 1500);
  },
  
  // DELETE PURCHASE
  deletePurchase(id) {
    if (confirm('Are you sure you want to delete this purchase?')) {
      DB.deletePurchase(id);
      showToast('Purchase deleted successfully!', 'success');
      location.reload();
    }
  },
  
  // ADD SUPPLIER
  addSupplier() {
    const data = FormHandler.getFormData('supplierForm');
    if (!data) return;
    
    DB.addSupplier({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      country: data.country,
      bankDetails: data.bankDetails
    });
    
    showToast('Supplier added successfully!', 'success');
    FormHandler.resetForm('supplierForm');
    setTimeout(() => {
      window.location.href = 'suppliers.html';
    }, 1500);
  },
  
  // DELETE SUPPLIER
  deleteSupplier(id) {
    if (confirm('Are you sure you want to delete this supplier?')) {
      DB.deleteSupplier(id);
      showToast('Supplier deleted successfully!', 'success');
      location.reload();
    }
  },
  
  // LOAD PRODUCT DETAILS
  loadProductDetails(id) {
    const product = DB.getProduct(parseInt(id));
    if (!product) {
      showToast('Product not found!', 'error');
      return;
    }
    
    const container = document.getElementById('productDetails');
    if (container) {
      container.innerHTML = `
        <div class="card">
          <h2>${product.name}</h2>
          <div class="grid grid-2">
            <div>
              <p><strong>SKU:</strong> ${product.sku}</p>
              <p><strong>Price:</strong> ${Utils.formatCurrency(product.price)}</p>
              <p><strong>Quantity:</strong> ${product.quantity}</p>
              <p><strong>Category:</strong> ${product.category || '-'}</p>
            </div>
            <div>
              <p><strong>Description:</strong> ${product.description || '-'}</p>
              <p><strong>Added:</strong> ${new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div class="tag-list">
            <a href="edit-product.html?id=${product.id}" class="btn btn-primary">Edit</a>
            <a href="products.html" class="btn btn-secondary">Back</a>
          </div>
        </div>
      `;
    }
  },
  
  // LOAD CUSTOMER PROFILE
  loadCustomerProfile(id) {
    const customer = DB.getCustomer(parseInt(id));
    if (!customer) {
      showToast('Customer not found!', 'error');
      return;
    }
    
    const sales = DB.getSales().filter(s => s.customerId === customer.id);
    const totalSpent = sales.reduce((sum, s) => sum + (s.total || 0), 0);
    
    const container = document.getElementById('customerProfile');
    if (container) {
      container.innerHTML = `
        <div class="card">
          <h2>${customer.name}</h2>
          <div class="grid grid-2">
            <div>
              <p><strong>Email:</strong> ${customer.email}</p>
              <p><strong>Phone:</strong> ${customer.phone}</p>
              <p><strong>Address:</strong> ${customer.address || '-'}</p>
              <p><strong>City:</strong> ${customer.city || '-'}</p>
              <p><strong>Country:</strong> ${customer.country || '-'}</p>
            </div>
            <div>
              <p><strong>Total Purchases:</strong> ${sales.length}</p>
              <p><strong>Total Spent:</strong> ${Utils.formatCurrency(totalSpent)}</p>
              <p><strong>Member Since:</strong> ${new Date(customer.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div class="tag-list">
            <a href="customer-history.html?id=${customer.id}" class="btn btn-primary">Purchase History</a>
            <a href="customers.html" class="btn btn-secondary">Back</a>
          </div>
        </div>
      `;
    }
  }
};
