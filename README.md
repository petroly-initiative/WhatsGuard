# WhatsGuard

WhatsGuard is a sophisticated WhatsApp bot designed to protect groups from spam and advertisements while providing advanced management tools for administrators. It leverages the power of the Petroly.co API for intelligent message filtering and spam detection.

## ⚠️ Disclaimer

**IMPORTANT:** Using automated or unofficial software with WhatsApp may violate their Terms of Service and could potentially lead to your account being banned. WhatsGuard is an unofficial tool not endorsed by WhatsApp. Use this bot at your own risk. The developers of WhatsGuard are not responsible for any consequences resulting from the use of this software, including but not limited to account bans or restrictions.

I strongly recommend:
- Using this bot with a dedicated WhatsApp account, not your primary personal account.
- Being aware of WhatsApp's policies regarding automated tools and bots.
- Monitoring WhatsApp's Terms of Service for any changes that might affect the use of this bot.

By using WhatsGuard, you acknowledge and accept these risks.

## Features

- Automatic spam and advertisement detection
- Group management assistance for admins
- Integration with Petroly.co API for enhanced spam filtering
- Automatic message deletion for detected spam

## Tech Stack

- Node.js
- whatsapp-web.js
- GraphQL (for API communication)
- Docker for containerization
- Fly.io for deployment

## Prerequisites

- Node.js (v21.5.0 or later recommended)
- npm
- Docker (for containerized deployment)
- The Petroly.co API (for spam detection service)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/whatsguard.git
   cd whatsguard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Petroly.co API endpoint:
   ```
   GRAPHQL_ENDPOINT=https://api.petroly.co/
   ```

## Usage

To run WhatsGuard locally:

```
npm start
```

On first run, you'll need to authenticate by scanning a QR code with your WhatsApp account.

## Deployment

This project is configured for deployment on Fly.io. Make sure you have the Fly CLI installed and are logged in.

1. Create a Fly app:
   ```
   fly launch
   ```

2. Deploy the app:
   ```
   fly deploy
   ```

The `fly.toml` file is pre-configured for deployment, including volume mounts for persistent storage.

## Docker

To build and run the Docker container locally:

1. Build the image:
   ```
   docker build -t whatsguard .
   ```

2. Run the container:
   ```
   docker run -d --name whatsguard whatsguard
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) for providing the WhatsApp Web API
