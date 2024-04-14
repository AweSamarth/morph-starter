# Morph Starter Template
This is a starter [Next.js](https://nextjs.org/) template made for developers building on Morph. This app comes pre-configured with RainbowKit, wagmi, viem and a Foundry project. 

By default, this app is set up to interact with a smart contract deployed on Morph testnet. You can find the address of this contract in `constants/constants.js` and its code in `foundry-app/src/QuoteOfTheDay.sol`. Jump to [this section](#working-with-foundry) to learn how to deploy your own contract on either Morph or a local blockchain.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.



## Working with Foundry
### Pre-Requisites
This starter app assumes you already have the Foundry toolchain installed. If you don't, please follow the instructions [here](https://book.getfoundry.sh/getting-started/installation.html). 

### Deploying Smart Contracts Locally
`cd` into the `foundry-app` directory and run the following command:

```shell
$ anvil
```
This will set up a local blockchain node and its RPC URL will be localhost:8545. Keep it running.

In the same terminal, you will see **10 generated account addresses along with their private keys**. Go to your MetaMask wallet / any other wallet and import one of these accounts using their corresponding private key. Remember these funds only exist on your local blockchain and are **not real**.

Create a new `.env` file in `foundry-app` and paste the contents of env.example in it. Set the value of `FOUNDRY_GENERATED_PRIVATE_KEY` to be **the key you used in the above step**.

Open a new terminal pointing to `foundry-app` and run the following command to set make variables in your .env file accessible via the terminal.
```shell
$ source .env
```

Deploy the smart contract on the local node using the following command:

```shell
$ forge create --rpc-url $FOUNDRY_RPC_URL --private-key $FOUNDRY_GENERATED_PRIVATE_KEY src/QuoteOfTheDay.sol:QuoteOfTheDay --legacy
```
And BOOM! That's it! Your smart contract is now deployed on your local blockchain. Copy the address you see in the terminal (deployed to: 0x....) and paste it in `src/constants/constants.js` as the value of the `LOCAL_QOTD_CONTRACT_ADDRESS` variable for changes to be visible on the frontend. Now you can interact with the locally deployed smart contract using the Next.js app!

### Deploying Smart Contracts on Morph Testnet
If you open `src/constants/constants.js`, you will see that it uses a pre-deployed contract on the Morph testnet. If you want to deploy it yourself, make sure you have testnet Morph ETH in you dev account and follow the steps below.

Create a new .env file in `foundry-app` and paste the contents of `.env.example` in it. Set the value of `DEV_ACCOUNT_PRIVATE_KEY` to be the private key of the account which has testnet Morph ETH.

Open a new terminal pointing to `foundry-app` and run the following command to set make variables in your .env file accessible via the terminal.
```shell
$ source .env
```

Finally, deploy the smart contract on Morph testnet using the following command:

```shell
$ forge create --rpc-url $MORPH_TESTNET_RPC_URL --private-key $DEV_ACCOUNT_PRIVATE_KEY src/QuoteOfTheDay.sol:QuoteOfTheDay --legacy
```

Congratulations! Your smart contract is now deployed on Morph testnet. Copy the address you see in the terminal and paste it in `src/constants/constants.js` as the value of the `MORPH_QOTD_CONTRACT_ADDRESS` variable for changes to reflect on the frontend. Now you can interact with the deployed smart contract on Morph using the Next.js app!
