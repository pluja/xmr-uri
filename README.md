# Monero URI Generator & QR Code Tool

> [uri.xmr.fan](https://uri.xmr.fan)

## Overview

A simple, serverless web application for generating Monero URIs and QR codes with flexible configuration options. This tool allows users to:

- Create Monero payment URIs
- Generate QR codes for Monero addresses
- Use URL parameters for dynamic URI generation


## Features

- 🔗 Full Monero URI specification support
- 📱 Responsive design with TailwindCSS
- 🖼️ QR code generation
- 🔧 URL parameter configuration
- 💻 Completely client-side (no backend required)

## Supported URI Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `address` | String | Monero wallet address | `44AFFq5kSiGBoZ...` |
| `tx_amount` | Float | Transaction amount in XMR | `1.5` |
| `tx_payment_id` | String | Optional payment ID | `abc123...` |
| `recipient_name` | String | Optional recipient name | `John Doe` |
| `tx_description` | String | Transaction description | `Donation` |

## Usage Modes

### 1. Web Interface

Open `index.html` in a browser and use the form to generate Monero URIs and QR codes.

You can also serve the repo folder using Python:

```bash
python3 -m http.server 8000
```

### 2. URL Parameter Generation

#### Direct URI Generation

```
https://uri.xmr.fan/?address=44AFFq5kSiGBoZ...&tx_amount=1.5&recipient_name=Donation
```

#### Raw QR Code

```
https://uri.xmr.fan/?address=44AFFq5kSiGBoZ...&tx_amount=1.5&rawqr
```

#### Raw URI Text

```
https://uri.xmr.fan/?address=44AFFq5kSiGBoZ...&tx_amount=1.5&raw
```

## Tech Stack

- HTML5
- Vanilla JavaScript
- TailwindCSS (CDN)
- QRCode.js

## Installation

1. Clone the repository
2. Open `index.html` directly in a web browser
    - You can also serve with Python by running `python3 -m http.server 8000` in the repo folder
3. No additional setup or server required

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Donation

If you find this tool useful, consider donating: [kycnot.me/about#support](https://kycnot.me/about#support)

---

## Technical Details

### URI Specification

Follows the Monero URI scheme as defined in [Monero Fandom Wiki](https://monero.fandom.com/wiki/URI_formatting), supporting:

- Address-only URIs
- Optional amount specification
- Optional payment ID
- Optional recipient name
- Optional transaction description

### Security Notes

- All user inputs are trimmed and encoded
- No server-side processing
- Client-side generation only