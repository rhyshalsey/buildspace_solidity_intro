# Buildspace solidity intro

This is my project created from the introductory course to Web3 and Solidity on [buildspace.so](https://buildspace.so/).

The course aims to introduce you to the Web3 ecosystem through the Ethereum network using Solidity.

**Disclaimer** This uses the Ethereum test net and is not written on the real Ethereum blockchain. Otherwise it would cost you real money 😉

## Project info

### Client info

The client app is built using Next.js. The project is deployed to Vercel and uses an automatic deployment process when code is pushed to the Github repository.

### Smart contract

The Smart Contract is built using Solidity and deployed using Hardhat.

## Viewing the project

You can view the deployed project on Vercel here: https://buildspace-solidity-intro.vercel.app/

### How to use the app

Download and create a Metamask wallet [here](https://metamask.io/download.html). You can then connect it to the app and tell it what your favorite animal is! This will then be recorded on the Ethereum (testnet) blockchain.

## Running the project locally

### Client

To run the client locally (first time only) you must first install the dependencies by running the following command.

```
npm run client-install
```

Once the dependencies are installed, you can run the project in development mode using the following command.

```
npm run client-dev
```

### Smart contract

To run the smart contract you must first install the dependencies. You can do so by running

```
npm run contract-install
```

Once the dependencies are installed, you must start up a local hardhat server. You can do so by using

```
npm run hardhat-run
```

In a second terminal window, you can deploy the contract to the the local hardhat server with

```
npm run contract-deploy-local
```

## Deployment

### Client

The project is deployed to Vercel and uses an automatic deployment process when code is pushed to the Github repository.

### Smart contract

To deploy the smart contract to the Rinkeby test network, you can use the following command:

```
npm run contract-deploy
```

## Testing

### Client

Considering this is simply a test app on the basis of learning Solidity and smart contracts, no testing has been added on the client side.

### Smart contract

To run the smart contract tests call `npm run contract-run`
