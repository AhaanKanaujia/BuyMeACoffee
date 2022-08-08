# BuyMeACoffee

A DeFi Dapp that allows visitors to send fake ETH as tips and leave messaages. Deploys smart contract to the Goerli test network.

Hardhat development enviroment is used to build, test, and deploy our smart contracts. Next, a MetaMask wallet is connected to the Goerli test network
using a RPC endpoint. Ethers.js is used to interact with the smart contract. The frontend for the dapp is made using replit. 

Install dependencies:

```
npm install
```

Setup .env file:

```
GOERLI_URL="RPC URL"
GOERLI_API_KEY="API key"
PRIVATE_KEY="wallet private key"
```

Deploy contract to test network:

```
npx hardhat run scripts/deploy.js
```

Run script to test buying coffee:

```
npx hardhat run scripts/buy-coffee.js
```

Update contract address, and withdraw tips recieved:

```
npx hardhat run scripts/withdraw.js
```

Run the Development Sever:

```
npm run dev
```

The app is deployed to http://localhost:3000/, where you can connect your wallet and send tips to the user on a test network. 
