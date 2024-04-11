## Pre-Requisites
This starter app assumes you already have the Foundry toolchain installed. If you don't, please follow the instructions [here](https://book.getfoundry.sh/getting-started/installation.html). 

## Deploying Smart Contracts Locally
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
$ forge create --rpc-url $FOUNDRY_RPC_URL --private-key $FOUNDRY_GENERATED_PRIVATE_KEY src/QuoteOfTheDay.sol:QuoteOfTheDay 
```
And BOOM! That's it! Your smart contract is now deployed on your local blockchain. Copy the address you see in the terminal (deployed to: 0x....) and paste it in `create-morph-app/src/constants` as the value of the `LOCAL_QOTD_CONTRACT_ADDRESS` variable for changes to be visible on the frontend. Now you can interact with the locally deployed smart contract using the Next.js app!

## Deploying Smart Contracts on Morph Testnet
If you open `create-morph-app/src/constants/constants.js`, you will see that it uses a pre-deployed contract on the Morph testnet. If you want to deploy it yourself, make sure you have testnet Morph ETH in you dev account and follow the steps below.

Create a new .env file in `foundry-app` and paste the contents of `.env.example` in it. Set the value of `DEV_ACCOUNT_PRIVATE_KEY` to be the private key of the account which has testnet Morph ETH.

Open a new terminal pointing to `foundry-app` and run the following command to set make variables in your .env file accessible via the terminal.
```shell
$ source .env
```

Finally, deploy the smart contract on Morph testnet using the following command:

```shell
$ forge create --rpc-url $MORPH_TESTNET_RPC_URL --private-key $DEV_ACCOUNT_PRIVATE_KEY src/QuoteOfTheDay.sol:QuoteOfTheDay --legacy
```

Congratulations! Your smart contract is now deployed on Morph testnet. Copy the address you see in the terminal and paste it in `create-morph-app/src/constants` as the value of the `MORPH_QOTD_CONTRACT_ADDRESS` variable for changes to reflect on the frontend. Now you can interact with the deployed smart contract on Morph using the Next.js app!

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
