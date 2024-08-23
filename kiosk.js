
document.addEventListener("DOMContentLoaded", function () {
let total = 0;
const cartItems = {};

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const totalDisplay = document.getElementById('total');
const cartItemsDisplay = document.getElementById('cart-items');

addToCartButtons.forEach(button => {
button.addEventListener('click', () => {
    const itemName = button.getAttribute('data-name');
    const itemPrice = parseInt(button.getAttribute('data-price'));

    // If item is already in the cart, increase its quantity
    if (cartItems[itemName]) {
        cartItems[itemName].quantity += 1;
    } else {
        // Otherwise, add the item to the cart with quantity 1
        cartItems[itemName] = {
            price: itemPrice,
            quantity: 1
        };
    }

    total += itemPrice;
    totalDisplay.textContent = total;
    updateCartDisplay();
});
});

function updateCartDisplay() {
cartItemsDisplay.innerHTML = '';
for (const [itemName, itemDetails] of Object.entries(cartItems)) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${itemName}  | ₹${itemDetails.price} x ${itemDetails.quantity} = ₹${itemDetails.price * itemDetails.quantity}
        <button class="increase-quantity" data-name="${itemName}">+</button>
        <button class="decrease-quantity" data-name="${itemName}">-</button>
    `;
    cartItemsDisplay.appendChild(li);
}

// Add event listeners for the increase and decrease buttons
const increaseButtons = document.querySelectorAll('.increase-quantity');
const decreaseButtons = document.querySelectorAll('.decrease-quantity');

increaseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        cartItems[itemName].quantity += 1;
        total += cartItems[itemName].price;
        totalDisplay.textContent = total;
        updateCartDisplay();
    });
});

decreaseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        if (cartItems[itemName].quantity > 1) {
            cartItems[itemName].quantity -= 1;
            total -= cartItems[itemName].price;
        } else {
            total -= cartItems[itemName].price;
            delete cartItems[itemName];
        }
        totalDisplay.textContent = total;
        updateCartDisplay();
    });
});
}
});

