// Rendering and DOM Manipulation
const Render = {
  
  // Render products table
  renderProductsTable(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const products = DB.getProducts();
    
    if (products.length === 0) {
      container.innerHTML = '<p>No products found. <a href="add-product.html">Add one</a></p>';
      return;
    }
    
    let html = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    products.forEach(product => {
      html += `
        <tr>
          <td>${product.name}</td>
          <td>${product.sku}</td>
          <td>${Utils.formatCurrency(product.price)}</td>
          <td>${product.quantity}</td>
          <td>${product.category || '-'}</td>
          <td>
            <a href="product-details.html?id=${product.id}" class="btn btn-sm btn-secondary">View</a>
            <a href="edit-product.html?id=${product.id}" class="btn btn-sm btn-secondary">Edit</a>
            <button class="btn btn-sm btn-danger" onclick="Actions.deleteProduct(${product.id})">Delete</button>
          </td>
        </tr>
      `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
  },
  
  // Render customers table
  renderCustomersTable(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const customers = DB.getCustomers();
    
    if (customers.length === 0) {
      container.innerHTML = '<p>No customers found. <a href="add-customer.html">Add one</a></p>';
      return;
    }
    
    let html = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total Purchases</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    customers.forEach(customer => {
      const sales = DB.getSales().filter(s => s.customerId === customer.id);
      const totalPurchases = sales.reduce((sum, s) => sum + (s.total || 0), 0);
      
      html += `
        <tr>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td>${customer.address || '-'}</td>
          <td>${Utils.formatCurrency(totalPurchases)}</td>
          <td>
            <a href="customer-profile.html?id=${customer.id}" class="btn btn-sm btn-secondary">View</a>
            <button class="btn btn-sm btn-danger" onclick="Actions.deleteCustomer(${customer.id})">Delete</button>
          </td>
        </tr>
      `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
  },
  
  // Render sales table
  renderSalesTable(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const sales = DB.getSales();
    
    if (sales.length === 0) {
      container.innerHTML = '<p>No sales found. <a href="new-sale.html">Create one</a></p>';
      return;
    }
    
    let html = `
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    sales.forEach(sale => {
      const customer = DB.getCustomer(sale.customerId);
      const date = new Date(sale.date).toLocaleDateString();
      
      html += `
        <tr>
          <td>${date}</td>
          <td>${customer ? customer.name : 'Unknown'}</td>
          <td>${Utils.formatCurrency(sale.total || 0)}</td>
          <td>${sale.items ? sale.items.length : 0}</td>
          <td><span class="badge">${sale.status || 'Completed'}</span></td>
          <td>
            <a href="receipt.html?id=${sale.id}" class="btn btn-sm btn-secondary">Receipt</a>
            <button class="btn btn-sm btn-danger" onclick="Actions.deleteSale(${sale.id})">Delete</button>
          </td>
        </tr>
      `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
  },
  
  // Render dashboard stats
  renderDashboardStats(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const today = new Date().toDateString();
    const sales = DB.getSales().filter(s => new Date(s.date).toDateString() === today);
    const todaySales = sales.reduce((sum, s) => sum + (s.total || 0), 0);
    const products = DB.getProducts();
    const customers = DB.getCustomers();
    const lowStock = products.filter(p => p.quantity < 10);
    
    const html = `
      <div class="stats">
        <div class="stat">
          <div class="badge">Today</div>
          <div class="value">${Utils.formatCurrency(todaySales)}</div>
          <small>Sales value</small>
        </div>
        <div class="stat">
          <div class="badge">Stock</div>
          <div class="value">${products.length}</div>
          <small>Total products</small>
        </div>
        <div class="stat">
          <div class="badge">Alerts</div>
          <div class="value">${lowStock.length}</div>
          <small>Low stock items</small>
        </div>
        <div class="stat">
          <div class="badge">Customers</div>
          <div class="value">${customers.length}</div>
          <small>Total customers</small>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  // Render dropdown options
  renderOptions(selectId, options) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = '<option value="">Select an option</option>';
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.id;
      opt.textContent = option.name || option.label;
      select.appendChild(opt);
    });
  }
};
