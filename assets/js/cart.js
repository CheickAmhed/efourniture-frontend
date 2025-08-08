document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalSpan = document.querySelector('.subtotal');
    const shippingSpan = document.querySelector('.shipping');
    const totalAmountSpan = document.querySelector('.total-amount');

    let cart = [];

    function loadCartFromDOM() {
        cart = [];
        document.querySelectorAll('.cart-item').forEach(itemElement => {
            const id = parseInt(itemElement.dataset.id);
            const name = itemElement.querySelector('.cart-item-title').textContent;
            const price = parseFloat(itemElement.querySelector('.cart-item-price').textContent.replace(' FCFA', ''));
            const image = itemElement.querySelector('.cart-item-img').src;
            const quantity = parseInt(itemElement.querySelector('.quantity-input').value);
            cart.push({ id, name, price, image, quantity });
        });
    }

    function updateCartSummary() {
        let subtotal = 0;
        document.querySelectorAll('.cart-item').forEach(itemElement => {
            const price = parseFloat(itemElement.querySelector('.cart-item-price').textContent.replace(' FCFA', ''));
            const quantity = parseInt(itemElement.querySelector('.quantity-input').value);
            subtotal += price * quantity;
        });

        const shipping = subtotal > 0 ? 1000 : 0; // Example shipping cost
        const total = subtotal + shipping;

        subtotalSpan.textContent = `${subtotal.toFixed(2)} FCFA`;
        shippingSpan.textContent = `${shipping.toFixed(2)} FCFA`;
        totalAmountSpan.textContent = `${total.toFixed(2)} FCFA`;
    }

    function updateQuantity(itemElement, change) {
        const quantityInput = itemElement.querySelector('.quantity-input');
        let currentQuantity = parseInt(quantityInput.value);
        currentQuantity += change;
        if (currentQuantity < 1) {
            currentQuantity = 1;
        }
        quantityInput.value = currentQuantity;
        updateCartSummary();
    }

    function removeItem(itemElement) {
        itemElement.remove();
        updateCartSummary();
    }

    // Event delegation for quantity and remove buttons
    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const cartItem = target.closest('.cart-item');
        if (!cartItem) return;

        if (target.classList.contains('quantity-btn')) {
            if (target.classList.contains('increase')) {
                updateQuantity(cartItem, 1);
            } else if (target.classList.contains('decrease')) {
                updateQuantity(cartItem, -1);
            }
        } else if (target.classList.contains('remove-item-btn')) {
            removeItem(cartItem);
        }
    });

    loadCartFromDOM();
    updateCartSummary();
});
