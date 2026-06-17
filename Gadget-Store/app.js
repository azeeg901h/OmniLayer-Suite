/**
 * CLASS 1: Product Item Blueprint
 * Represents an individual physical item added to the calculator engine.
 */
class CartItem {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = Number(price);
    }
}

/**
 * CLASS 2: Shopping Cart Calculator Engine
 * Manages the array of objects, data mutations, and real-time financial math computations.
 */
class ShoppingCart {
    constructor() {
        this.items = []; // Array containing our instantiated CartItem instances
        this.taxRate = 0.075; // 7.5% Nigerian VAT Standard
    }

    // Method to insert an item object into the operational state
    addItem(item) {
        this.items.push(item);
        this.renderUI();
    }

    // Method to wipe operational state data cleanly
    clearCart() {
        this.items = [];
        this.renderUI();
    }

    // Mathematical Engine: Computes raw values and fractional arithmetic adjustments
    calculateTotals() {
        const subtotal = this.items.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);
        const taxTotal = subtotal * this.taxRate;
        const finalTotal = subtotal + taxTotal;

        return {
            subtotal: subtotal,
            tax: taxTotal,
            total: finalTotal
        };
    }

    // Document Object Model Render Engine: Automatically mirrors code metrics onto screen views
    renderUI() {
        const cartContainer = document.getElementById('cart-items');
        
        // Reset container view structures
        cartContainer.innerHTML = '';

        if (this.items.length === 0) {
            cartContainer.innerHTML = `<p class="empty-msg">Your cart is empty. Add gadgets above!</p>`;
        } else {
            // Programmatically inject modern rows for active item arrays
            this.items.forEach((item) => {
                const row = document.createElement('div');
                row.className = 'cart-item-row';
                row.innerHTML = `
                    <span>📦 ${item.name}</span>
                    <strong>₦${item.price.toLocaleString()}</strong>
                `;
                cartContainer.appendChild(row);
            });
        }

        // Run internal calculations Engine to get fresh figures
        const financialMetrics = this.calculateTotals();

        // Update interface numbers instantly
        document.getElementById('subtotal').innerText = `₦${financialMetrics.subtotal.toLocaleString()}`;
        document.getElementById('tax').innerText = `₦${financialMetrics.tax.toLocaleString()}`;
        document.getElementById('total-price').innerText = `₦${financialMetrics.total.toLocaleString()}`;
    }
}

// INSTANTIATION: Spin up the object engine when the browser initializes
const myCalculatorCart = new ShoppingCart();

// CAPTURE EVENT LISTENERS: Map standard interface click gestures straight to internal object methods
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const targetElement = event.target;
        const id = targetElement.getAttribute('data-id');
        const name = targetElement.getAttribute('data-name');
        const price = targetElement.getAttribute('data-price');

        // Fire Class object generation pattern
        const newProductInstance = new CartItem(id, name, price);
        
        // Pass instance object directly into the Controller manager
        myCalculatorCart.addItem(newProductInstance);
    });
});

// Clear Button Event Listener
document.getElementById('clear-btn').addEventListener('click', () => {
    myCalculatorCart.clearCart();
});
