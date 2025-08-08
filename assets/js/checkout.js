document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const steps = document.querySelectorAll('.checkout-steps .step');
    const sections = document.querySelectorAll('.checkout-section');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    const mobileMoneyDetails = document.getElementById('mobile-money-details');
    const bankTransferDetails = document.getElementById('bank-transfer-details');
    const summaryAddress = document.getElementById('summary-address');
    const summaryPayment = document.getElementById('summary-payment');
    const summaryItems = document.getElementById('summary-items');
    const summaryTotalAmount = document.getElementById('summary-total-amount');
    const placeOrderBtn = document.getElementById('place-order-btn');

    let currentStep = 1;

    // Update active step and section
    const updateCheckoutDisplay = () => {
        steps.forEach(step => {
            const stepNumber = parseInt(step.dataset.step);
            step.classList.toggle('active', stepNumber === currentStep);
        });

        sections.forEach(section => section.classList.remove('active'));
        sections[currentStep - 1].classList.add('active');

        window.scrollTo({
            top: document.querySelector('.checkout-process').offsetTop,
            behavior: 'smooth'
        });
    };

    // Update summary section
    const updateSummary = () => {
        const fullAddress = document.getElementById('full-address').value;
        summaryAddress.textContent = fullAddress || 'Non sélectionnée';

        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
        summaryPayment.textContent = selectedPaymentMethod
            ? selectedPaymentMethod.nextElementSibling.textContent.trim()
            : 'Non sélectionnée';

        // Example cart items
        summaryItems.innerHTML = `
            <li><span>Produit A</span><span>1 x 15,000 XOF</span></li>
            <li><span>Produit B</span><span>2 x 5,000 XOF</span></li>
            <li><span>Frais de livraison</span><span>2,500 XOF</span></li>
        `;
        summaryTotalAmount.textContent = '32,500 XOF';
    };

    // Step navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextStep = parseInt(button.dataset.nextStep);
            if (nextStep <= sections.length) {
                currentStep = nextStep;
                updateCheckoutDisplay();
                updateSummary();
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevStep = parseInt(button.dataset.prevStep);
            if (prevStep >= 1) {
                currentStep = prevStep;
                updateCheckoutDisplay();
                updateSummary();
            }
        });
    });

    steps.forEach(step => {
        step.addEventListener('click', () => {
            currentStep = parseInt(step.dataset.step);
            updateCheckoutDisplay();
            updateSummary();
        });
    });

    // Payment method toggle
    paymentOptions.forEach(option => {
        option.addEventListener('change', (event) => {
            const value = event.target.value;
            mobileMoneyDetails.style.display = value === 'mobile-money' ? 'block' : 'none';
            bankTransferDetails.style.display = value === 'bank-transfer' ? 'block' : 'none';
        });
    });

    // Map initialization placeholder
    const initMap = () => {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = `
                <p style="text-align: center; padding: 20px;">
                    Map API not loaded. Please integrate a map library (e.g., Leaflet, Google Maps) for address selection.
                </p>
            `;
        }
    };

    // Initial setup
    updateCheckoutDisplay();
    initMap();
    updateSummary();

    // Place order simulation
    placeOrderBtn.addEventListener('click', () => {
        alert('Commande confirmée ! (Ceci est une simulation)');
        // Real implementation would send order data to server here
    });
});
