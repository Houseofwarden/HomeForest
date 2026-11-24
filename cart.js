// The catalog stores the product ID, name and price.
const products = [
    {id: "spider-plant", name: "Spider plant", price: 299},
    {id: "snake-plant", name: "Snake plant", price: 399},
    {id: "pothos", name: "Golden pothos", price: 249},
    {id: "ceramic-pot", name: "Ceramic planter", price: 349},
    {id: "drainage-tray", name: "Drainage tray", price: 149},
    {id: "macrame", name: "Hanging macrame", price: 299}
];

// Use the same storage key as the previous HomeForest version.
const cartKey = "homeforest-cart-v2";
let cart = {};

function loadCart() {
    try {
        cart = JSON.parse(localStorage.getItem(cartKey)) || {};
        if (typeof cart !== "object" || Array.isArray(cart)) {
            cart = {};
        }
    } catch (error) {
        cart = {};
    }
}

function getQuantity(id) {
    const quantity = cart[id];
    if (Number.isInteger(quantity) && quantity > 0 && quantity <= 99) {
        return quantity;
    }
    return 0;
}

function saveCart() {
    try {
        localStorage.setItem(cartKey, JSON.stringify(cart));
        return true;
    } catch (error) {
        return false;
    }
}

function showCartMessage(text) {
    document.getElementById("cart-message").textContent = text;
}

function addToCart(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            loadCart();
            if (getQuantity(id) === 99) {
                showCartMessage("The maximum quantity is 99.");
                return;
            }
            cart[id] = getQuantity(id) + 1;
            if (saveCart()) {
                showCartMessage(products[i].name + " added to your cart.");
            } else {
                showCartMessage("Cart could not be saved. Open the site through Live Server and enable browser storage.");
            }
            return;
        }
    }
}

function changeQuantity(id, change) {
    loadCart();
    const quantity = getQuantity(id) + change;
    if (quantity > 99) {
        showCartMessage("The maximum quantity is 99.");
        return;
    }
    if (quantity <= 0) {
        delete cart[id];
    } else {
        cart[id] = quantity;
    }
    if (saveCart()) {
        showCartMessage("Cart updated.");
        renderCart();
    } else {
        showCartMessage("Cart could not be saved.");
    }
}

function removeItem(id) {
    loadCart();
    delete cart[id];
    if (saveCart()) {
        showCartMessage("Item removed.");
        renderCart();
    } else {
        showCartMessage("Cart could not be saved.");
    }
}

// Clear every item only after the visitor confirms.
function clearCart() {
    if (confirm("Remove all items from your cart?")) {
        cart = {};
        if (saveCart()) {
            showCartMessage("Cart cleared.");
            renderCart();
        } else {
            showCartMessage("Cart could not be saved.");
            loadCart();
        }
    }
}

// All product rows are already written in cart.html.
// JavaScript only shows the selected rows and changes their values.
function renderCart() {
    let total = 0;
    let count = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const quantity = getQuantity(product.id);
        const subtotal = product.price * quantity;
        const row = document.getElementById("cart-row-" + product.id);

        if (quantity > 0) {
            row.hidden = false;
            document.getElementById("quantity-" + product.id).textContent = quantity;
            document.getElementById("subtotal-" + product.id).textContent = "\u20b9" + subtotal;
            count = count + quantity;
            total = total + subtotal;
        } else {
            row.hidden = true;
        }
    }

    document.getElementById("empty-cart").hidden = count > 0;
    document.getElementById("clear-cart").disabled = count === 0;
    document.getElementById("item-count").textContent = count;
    document.getElementById("cart-subtotal").textContent = "\u20b9" + total;
    document.getElementById("cart-total").textContent = "\u20b9" + total;
}

// Refresh when the browser returns to the cart page.
function refreshCart() {
    loadCart();
    renderCart();
}

// Load the cart when visiting the cart page.
if (document.getElementById("cart-rows")) {
    refreshCart();
    window.addEventListener("pageshow", refreshCart);
}
