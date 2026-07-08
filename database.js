// Database Management System using LocalStorage
const DB = {
  storeName: 'rs-collection-db',
  
  // Initialize database with default data
  init() {
    if (!localStorage.getItem(this.storeName)) {
      localStorage.setItem(this.storeName, JSON.stringify({
        products: [],
        customers: [],
        suppliers: [],
        sales: [],
        purchases: [],
        inventory: [],
        users: [],
        settings: {}
      }));
    }
  },
  
  // Get all data
  getAll() {
    const data = localStorage.getItem(this.storeName);
    return data ? JSON.parse(data) : {};
  },
  
  // Save all data
  saveAll(data) {
    localStorage.setItem(this.storeName, JSON.stringify(data));
  },
  
  // PRODUCTS
  getProducts() {
    return this.getAll().products || [];
  },
  
  addProduct(product) {
    const data = this.getAll();
    product.id = Date.now();
    product.createdAt = new Date().toISOString();
    data.products.push(product);
    this.saveAll(data);
    return product;
  },
  
  updateProduct(id, updates) {
    const data = this.getAll();
    const index = data.products.findIndex(p => p.id === id);
    if (index !== -1) {
      data.products[index] = { ...data.products[index], ...updates };
      this.saveAll(data);
      return data.products[index];
    }
    return null;
  },
  
  deleteProduct(id) {
    const data = this.getAll();
    data.products = data.products.filter(p => p.id !== id);
    this.saveAll(data);
    return true;
  },
  
  getProduct(id) {
    return this.getProducts().find(p => p.id === id);
  },
  
  // CUSTOMERS
  getCustomers() {
    return this.getAll().customers || [];
  },
  
  addCustomer(customer) {
    const data = this.getAll();
    customer.id = Date.now();
    customer.createdAt = new Date().toISOString();
    data.customers.push(customer);
    this.saveAll(data);
    return customer;
  },
  
  updateCustomer(id, updates) {
    const data = this.getAll();
    const index = data.customers.findIndex(c => c.id === id);
    if (index !== -1) {
      data.customers[index] = { ...data.customers[index], ...updates };
      this.saveAll(data);
      return data.customers[index];
    }
    return null;
  },
  
  deleteCustomer(id) {
    const data = this.getAll();
    data.customers = data.customers.filter(c => c.id !== id);
    this.saveAll(data);
    return true;
  },
  
  getCustomer(id) {
    return this.getCustomers().find(c => c.id === id);
  },
  
  // SALES
  getSales() {
    return this.getAll().sales || [];
  },
  
  addSale(sale) {
    const data = this.getAll();
    sale.id = Date.now();
    sale.date = new Date().toISOString();
    data.sales.push(sale);
    this.saveAll(data);
    return sale;
  },
  
  updateSale(id, updates) {
    const data = this.getAll();
    const index = data.sales.findIndex(s => s.id === id);
    if (index !== -1) {
      data.sales[index] = { ...data.sales[index], ...updates };
      this.saveAll(data);
      return data.sales[index];
    }
    return null;
  },
  
  deleteSale(id) {
    const data = this.getAll();
    data.sales = data.sales.filter(s => s.id !== id);
    this.saveAll(data);
    return true;
  },
  
  getSale(id) {
    return this.getSales().find(s => s.id === id);
  },
  
  // PURCHASES
  getPurchases() {
    return this.getAll().purchases || [];
  },
  
  addPurchase(purchase) {
    const data = this.getAll();
    purchase.id = Date.now();
    purchase.date = new Date().toISOString();
    data.purchases.push(purchase);
    this.saveAll(data);
    return purchase;
  },
  
  updatePurchase(id, updates) {
    const data = this.getAll();
    const index = data.purchases.findIndex(p => p.id === id);
    if (index !== -1) {
      data.purchases[index] = { ...data.purchases[index], ...updates };
      this.saveAll(data);
      return data.purchases[index];
    }
    return null;
  },
  
  deletePurchase(id) {
    const data = this.getAll();
    data.purchases = data.purchases.filter(p => p.id !== id);
    this.saveAll(data);
    return true;
  },
  
  getPurchase(id) {
    return this.getPurchases().find(p => p.id === id);
  },
  
  // INVENTORY
  getInventory() {
    return this.getAll().inventory || [];
  },
  
  updateInventory(productId, quantity) {
    const data = this.getAll();
    let item = data.inventory.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    } else {
      data.inventory.push({ productId, quantity });
    }
    this.saveAll(data);
    return item;
  },
  
  getInventoryItem(productId) {
    return this.getInventory().find(i => i.productId === productId);
  },
  
  // SUPPLIERS
  getSuppliers() {
    return this.getAll().suppliers || [];
  },
  
  addSupplier(supplier) {
    const data = this.getAll();
    supplier.id = Date.now();
    supplier.createdAt = new Date().toISOString();
    data.suppliers.push(supplier);
    this.saveAll(data);
    return supplier;
  },
  
  updateSupplier(id, updates) {
    const data = this.getAll();
    const index = data.suppliers.findIndex(s => s.id === id);
    if (index !== -1) {
      data.suppliers[index] = { ...data.suppliers[index], ...updates };
      this.saveAll(data);
      return data.suppliers[index];
    }
    return null;
  },
  
  deleteSupplier(id) {
    const data = this.getAll();
    data.suppliers = data.suppliers.filter(s => s.id !== id);
    this.saveAll(data);
    return true;
  },
  
  getSupplier(id) {
    return this.getSuppliers().find(s => s.id === id);
  },
  
  // CLEAR ALL DATA
  clearAll() {
    localStorage.removeItem(this.storeName);
    this.init();
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  DB.init();
});
