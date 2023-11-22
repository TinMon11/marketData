# MARKET DATA

## Description

The Market Status Application provides real-time market data for cryptocurrency pairs using both WebSocket and HTTP interfaces.

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TinMon11/market-status.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd market-status
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

### Start the Server

````bash
    npm run start
    ```
````
### Access Market Data

1. Open your browser or use tools like [Postman](https://www.postman.com/) to access market data.

#### Get Market Data

- Make API call 
1. GET http://localhost:3000/tips/ETH-USD (or BTC-USD)

Example Response
{
  "message": "Last Data for Pair",
  "data": {
    "Bid": 36420,
    "BidSize": 11.28802711,
    "Ask": 36421,
    "AskSize": 10.13860827,
    "LastPrice": 36415
  },
  "error": null
}

2. POST http://localhost:3000/effective-price

Example Body Request

{
  "pair": "ETH-USD",
  "operation": "sell",
  "amount": "1.5",
  "priceLimit": 36600 // This Param is Optional
}

Example Response

{
  "pair": "ETH-USD",
  "operation": "sell",
  "amount": 1.5,
  "effectivePrice": 36420,
  "totalCost": 54630,
  "maxOrderSize": 1.5
}
