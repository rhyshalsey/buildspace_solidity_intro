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

#### Prerequisites

In order to deploy the smart contract you will need to populate the secrets in the `hardhat.config.js` file.

There are two ways to populate the secrets needed to deploy the smart contract.

##### With access to the Vercel deployment

The secrets are stored in the Vercel project where the client is hosted. If you have access to the Vercel project, you can use the [Vercel CLI](https://vercel.com/docs/cli) to automatically fetch the secrets.

Once you have linked your Vercel CLI with the project using `vercel link` you can go ahead and run `npm run get-secrets`. A .env file will be downloaded to the `/smart-contracts` folder.

##### Without access to the Vercel deployment

If you do not have access to my super secret Vercel project where the client is hosted, you will need to generate your own keys.

There are two keys, the Rinkeby private key (`PRIVATE_RINKEBY_KEY`) and the Alchemy deployment url (`ALCHEMY_KEY`).

To get the `PRIVATE_RINKEBY_KEY` you must complete the following steps:

1. Download Metamask and create an account.
2. Switch Metamask to the Rinkeby test network.
3. Click the three dots in the top right and select "account details".
4. Under account details, click the "Export Private Key" button.
5. Enter your password and your private key will be available to copy.

To get the `ALCHEMY_KEY` you must create an account at [Alchemy](https://alchemy.com/?r=b93d1f12b8828a57) and create a new project. Then under "view key" you will have the HTTP key.

Enter both of these keys in the `hardhat.config.js` file and you will be able to deploy the smart contract.

#### Deploying the smart contract

To deploy the smart contract to the Rinkeby test network, you can use the following command:

```
npm run contract-deploy
```

## Testing

### Client

Considering this is simply a test app on the basis of learning Solidity and smart contracts, no testing has been added on the client side.

### Smart contract

To run the smart contract tests call `npm run contract-run`
