document.addEventListener('DOMContentLoaded', () => {
    const tabItems = document.querySelectorAll('[data-tab-item]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    const quantityDisplay = document.querySelector('[data-quantity]');
    const minusBtn = document.querySelector('[data-quantity-btn="minus"]');
    const plusBtn = document.querySelector('[data-quantity-btn="plus"]');

    // Tab functionality
    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            tabItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const targetTab = item.dataset.tabItem;
            tabContents.forEach(content => {
                if (content.dataset.tabContent === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Quantity adjustment functionality
    let quantity = parseInt(quantityDisplay.textContent);

    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    plusBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });
});