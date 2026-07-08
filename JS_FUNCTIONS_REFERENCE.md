## RS Collection - Complete JavaScript API Reference

### 📁 **File Structure**

```
assets/js/
├── database.js    - Data management (CRUD operations)
├── forms.js       - Form validation and handling
├── render.js      - DOM rendering and display
├── actions.js     - User actions and event handlers
├── utils.js       - Utility functions
└── app.js         - Application initialization
```

---

## 🗂️ **DATABASE Functions (database.js)**

### Initialization
```javascript
DB.init()  // Initialize database with default data
```

### Products
```javascript
DB.getProducts()                    // Get all products
DB.getProduct(id)                  // Get single product
DB.addProduct(product)              // Add new product
DB.updateProduct(id, updates)      // Update product
DB.deleteProduct(id)                // Delete product
```

**Product Object:**
```javascript
{
  name: string,
  sku: string,
  price: number,
  quantity: number,
  category: string,
  description: string
}
```

### Customers
```javascript
DB.getCustomers()                   // Get all customers
DB.getCustomer(id)                 // Get single customer
DB.addCustomer(customer)            // Add new customer
DB.updateCustomer(id, updates)     // Update customer
DB.deleteCustomer(id)               // Delete customer
```

**Customer Object:**
```javascript
{
  name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string
}
```

### Sales
```javascript
DB.getSales()                       // Get all sales
DB.getSale(id)                     // Get single sale
DB.addSale(sale)                    // Add new sale
DB.updateSale(id, updates)         // Update sale
DB.deleteSale(id)                   // Delete sale
```

**Sale Object:**
```javascript
{
  customerId: number,
  items: array,
  total: number,
  paymentMethod: string,
  notes: string,
  status: string
}
```

### Purchases
```javascript
DB.getPurchases()                   // Get all purchases
DB.getPurchase(id)                 // Get single purchase
DB.addPurchase(purchase)            // Add new purchase
DB.updatePurchase(id, updates)     // Update purchase
DB.deletePurchase(id)               // Delete purchase
```

### Inventory
```javascript
DB.getInventory()                   // Get all inventory items
DB.getInventoryItem(productId)     // Get inventory for product
DB.updateInventory(productId, qty) // Update stock quantity
```

### Suppliers
```javascript
DB.getSuppliers()                   // Get all suppliers
DB.getSupplier(id)                 // Get single supplier
DB.addSupplier(supplier)            // Add new supplier
DB.updateSupplier(id, updates)     // Update supplier
DB.deleteSupplier(id)               // Delete supplier
```

### Data Management
```javascript
DB.getAll()    // Get entire database
DB.saveAll()   // Save to localStorage
DB.clearAll()  // Clear all data
```

---

## ✅ **FORM Functions (forms.js)**

### Validation
```javascript
FormHandler.isValidEmail(email)           // Validate email format
FormHandler.isValidPhone(phone)           // Validate phone format
FormHandler.isRequired(value)             // Check if field is required
FormHandler.isValidNumber(value)          // Validate number
```

### Form Data
```javascript
FormHandler.getFormData(formId)    // Get form data as object
FormHandler.resetForm(formId)      // Clear form and errors
FormHandler.clearErrors()          // Clear all validation errors
```

### Error Handling
```javascript
FormHandler.showError(fieldName, message)  // Show field error
FormHandler.clearErrors()                  // Clear all errors
```

### Form Validation
```javascript
FormHandler.validateProductForm(data)   // Validate product data
FormHandler.validateCustomerForm(data)  // Validate customer data
FormHandler.validateSaleForm(data)      // Validate sale data
```

---

## 🎨 **RENDER Functions (render.js)**

### Display Data
```javascript
Render.renderProductsTable(containerId)    // Render products table
Render.renderCustomersTable(containerId)   // Render customers table
Render.renderSalesTable(containerId)       // Render sales table
Render.renderDashboardStats(containerId)   // Render dashboard stats
```

### Options
```javascript
Render.renderOptions(selectId, options)    // Populate dropdown menu
```

---

## ⚙️ **ACTION Functions (actions.js)**

### Product Actions
```javascript
Actions.addProduct()        // Add new product (from form)
Actions.deleteProduct(id)   // Delete product
Actions.editProduct()       // Update product (from form)
```

### Customer Actions
```javascript
Actions.addCustomer()       // Add new customer (from form)
Actions.deleteCustomer(id)  // Delete customer
```

### Sale Actions
```javascript
Actions.newSale()           // Create new sale (from form)
Actions.deleteSale(id)      // Delete sale
```

### Purchase Actions
```javascript
Actions.addPurchase()       // Add new purchase (from form)
Actions.deletePurchase(id)  // Delete purchase
```

### Supplier Actions
```javascript
Actions.addSupplier()       // Add new supplier (from form)
Actions.deleteSupplier(id)  // Delete supplier
```

### Load Details
```javascript
Actions.loadProductDetails(id)      // Load product details page
Actions.loadCustomerProfile(id)     // Load customer profile page
```

---

## 🛠️ **UTILITY Functions (utils.js)**

### Formatting
```javascript
Utils.formatCurrency(value)         // Format as USD currency
Utils.formatDate(date)              // Format date as MM/DD/YYYY
Utils.formatTime(date)              // Format time as HH:MM
Utils.formatDateTime(date)          // Format complete datetime
```

### Calculations
```javascript
Utils.calculatePercentage(part, total)          // Calculate percentage
Utils.calculateDiscount(price, percent)         // Calculate discount
Utils.calculateTax(amount, percent)             // Calculate tax
Utils.roundToTwo(number)                        // Round to 2 decimals
```

### URL & Parameters
```javascript
Utils.getUrlParameter(name)         // Get URL query parameter
Utils.generateId()                  // Generate random ID
```

### Helpers
```javascript
Utils.debounce(func, wait)          // Debounce function
Utils.isOffline()                   // Check if offline
Utils.copyToClipboard(text)         // Copy text to clipboard
Utils.exportToCSV(data, filename)   // Export data as CSV
```

### Notifications
```javascript
showToast(message, type)    // Show notification toast
// Types: 'success', 'error', 'info', 'warning'
```

---

## 📝 **USAGE EXAMPLES**

### Example 1: Add a Product
```javascript
DB.addProduct({
  name: 'Laptop',
  sku: 'LAP-001',
  price: 999.99,
  quantity: 10,
  category: 'Electronics',
  description: 'High performance laptop'
});
```

### Example 2: Get All Products and Display
```javascript
const products = DB.getProducts();
products.forEach(product => {
  console.log(`${product.name}: ${Utils.formatCurrency(product.price)}`);
});
```

### Example 3: Create a Sale
```javascript
DB.addSale({
  customerId: 123,
  items: [
    { productId: 1, quantity: 2, price: 50 },
    { productId: 2, quantity: 1, price: 100 }
  ],
  total: 200,
  paymentMethod: 'Credit Card',
  status: 'Completed'
});
```

### Example 4: Filter and Calculate
```javascript
const products = DB.getProducts();
const lowStock = products.filter(p => p.quantity < 10);
const totalValue = lowStock.reduce((sum, p) => sum + (p.price * p.quantity), 0);
console.log(`Low stock value: ${Utils.formatCurrency(totalValue)}`);
```

### Example 5: Form Submission Handler
```javascript
// In your HTML form:
<form onsubmit="Actions.addProduct(); return false;">
  <input type="text" name="name" required />
  <input type="number" name="price" required />
  <button type="submit">Add Product</button>
</form>
```

### Example 6: Display Dashboard Stats
```javascript
// Call this when page loads:
Render.renderDashboardStats('statsContainer');
```

---

## 🎯 **Quick Start Guide**

### Step 1: Add Scripts to HTML
```html
<script src="assets/js/utils.js"></script>
<script src="assets/js/database.js"></script>
<script src="assets/js/forms.js"></script>
<script src="assets/js/render.js"></script>
<script src="assets/js/actions.js"></script>
```

### Step 2: Initialize on Page Load
```javascript
document.addEventListener('DOMContentLoaded', () => {
  DB.init();  // Initialize database
  // Your page-specific code here
});
```

### Step 3: Use Functions in Forms and Buttons
```html
<!-- Add Product Form -->
<form id="productForm" onsubmit="Actions.addProduct(); return false;">
  <input type="text" name="name" placeholder="Product name">
  <input type="text" name="sku" placeholder="SKU">
  <input type="number" name="price" placeholder="Price">
  <input type="number" name="quantity" placeholder="Quantity">
  <button type="submit">Add Product</button>
</form>

<!-- Display Products -->
<div id="productsTable"></div>
<script>
  Render.renderProductsTable('productsTable');
</script>
```

---

## 💾 **Data Persistence**

All data is automatically saved to browser's localStorage under the key: `rs-collection-db`

To view database in browser console:
```javascript
JSON.parse(localStorage.getItem('rs-collection-db'))
```

To export data:
```javascript
const data = DB.getProducts();
Utils.exportToCSV(data, 'products.csv');
```

---

## 🚀 **Tips & Tricks**

1. **Check if data exists before using:**
   ```javascript
   const product = DB.getProduct(id);
   if (product) { /* use it */ }
   ```

2. **Calculate totals:**
   ```javascript
   const total = DB.getSales().reduce((sum, s) => sum + s.total, 0);
   ```

3. **Filter data:**
   ```javascript
   const todaySales = DB.getSales().filter(s => 
     new Date(s.date).toDateString() === new Date().toDateString()
   );
   ```

4. **Search functionality:**
   ```javascript
   const search = (term) => {
     return DB.getProducts().filter(p => 
       p.name.toLowerCase().includes(term.toLowerCase())
     );
   };
   ```

5. **Format and display:**
   ```javascript
   const products = DB.getProducts();
   products.forEach(p => {
     console.log(`${p.name} - ${Utils.formatCurrency(p.price)}`);
   });
   ```

---

**Last Updated:** 2026-07-08
**Version:** 1.0
