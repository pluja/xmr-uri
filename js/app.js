// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Function to generate Monero URI
function generateMoneroURI(params) {
    const {
        address,
        tx_amount,
        tx_payment_id,
        recipient_name,
        tx_description
    } = params;

    if (!address) return '';

    let uri = `monero:${address}`;
    const queryParams = [];

    if (tx_amount) {
        queryParams.push(`tx_amount=${tx_amount}`);
    }
    if (tx_payment_id) {
        queryParams.push(`tx_payment_id=${encodeURIComponent(tx_payment_id)}`);
    }
    if (recipient_name) {
        queryParams.push(`recipient_name=${encodeURIComponent(recipient_name)}`);
    }
    if (tx_description) {
        queryParams.push(`tx_description=${encodeURIComponent(tx_description)}`);
    }

    if (queryParams.length > 0) {
        uri += '?' + queryParams.join('&');
    }

    return uri;
}

// Function to update URL with current form parameters
function updateURL(params) {
    const newURL = new URL(window.location.href);

    // Remove existing params
    newURL.searchParams.delete('address');
    newURL.searchParams.delete('tx_amount');
    newURL.searchParams.delete('tx_payment_id');
    newURL.searchParams.delete('recipient_name');
    newURL.searchParams.delete('tx_description');

    // Add non-empty parameters
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            newURL.searchParams.set(key, value);
        }
    });

    // Update browser history without reloading
    window.history.replaceState({}, '', newURL);
}

// Function to generate QR code
async function generateQRCode(text, options = {}) {
    if (options.toDataURL) {
        return await QRCode.toDataURL(text, { width: 256 });
    } else {
        const canvas = document.createElement('canvas');
        await new Promise((resolve, reject) => {
            QRCode.toCanvas(canvas, text, { width: 256 }, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
        return canvas;
    }
}

// Add event listeners to form inputs for dynamic URL updating
function setupDynamicURLUpdates() {
    const formInputs = [
        'address',
        'amount',
        'paymentId',
        'recipientName',
        'description'
    ];

    formInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('input', function () {
            const params = {
                address: document.getElementById('address').value.trim(),
                tx_amount: document.getElementById('amount').value,
                tx_payment_id: document.getElementById('paymentId').value.trim(),
                recipient_name: document.getElementById('recipientName').value.trim(),
                tx_description: document.getElementById('description').value.trim()
            };
            updateURL(params);
        });
    });
}

// Handle URL parameters for API-like functionality
async function handleURLParameters() {
    const params = {
        address: urlParams.get('address'),
        tx_amount: urlParams.get('tx_amount'),
        tx_payment_id: urlParams.get('tx_payment_id'),
        recipient_name: urlParams.get('recipient_name'),
        tx_description: urlParams.get('tx_description')
    };

    if (params.address) {
        // Fill form fields if present
        document.getElementById('address').value = params.address;
        document.getElementById('amount').value = params.tx_amount || '';
        document.getElementById('paymentId').value = params.tx_payment_id || '';
        document.getElementById('recipientName').value = params.recipient_name || '';
        document.getElementById('description').value = params.tx_description || '';

        const uri = generateMoneroURI(params);

        if (urlParams.has('rawaddr')) {
            // Return raw URI
            document.body.innerHTML = uri;
            document.body.className = 'p-4 font-mono';
        } else if (urlParams.has('rawqr')) {
            // Return QR code as image
            const qrDataURL = await generateQRCode(uri, { toDataURL: true });
            document.body.innerHTML = `<img src="${qrDataURL}" alt="Monero QR Code">`;
            document.body.className = 'flex justify-center items-center min-h-screen';
        }
    }
}

// Handle form submission
document.getElementById('moneroForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const params = {
        address: document.getElementById('address').value.trim(),
        tx_amount: document.getElementById('amount').value,
        tx_payment_id: document.getElementById('paymentId').value.trim(),
        recipient_name: document.getElementById('recipientName').value.trim(),
        tx_description: document.getElementById('description').value.trim()
    };

    const uri = generateMoneroURI(params);

    // Display URI
    const uriOutput = document.getElementById('uriOutput');
    uriOutput.textContent = uri;
    uriOutput.classList.remove('hidden');

    // Generate QR Code
    const qrCodeDiv = document.getElementById('qrCode');
    qrCodeDiv.innerHTML = '';

    try {
        const canvas = await generateQRCode(uri);
        qrCodeDiv.appendChild(canvas);
    } catch (error) {
        console.error('Error generating QR code:', error);
    }

    // Update URL with current parameters
    updateURL(params);
});

// Initialize
handleURLParameters();
setupDynamicURLUpdates();