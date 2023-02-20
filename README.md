### Web3 app desctiption

Veggie dex is a Web3 app - **Uniswap v2** fork DEX with 4 listed ERC-20 tokens: Apple (APL), Potato (PTT), Tomato(TMT) and LSR. Supported networks are: **Goerli, BSC Testnet and Hardhat Local**.

To start interraction with DEX at first time user can mint some listed tokens in **"Mint tokens"** section. Balance of listed tokens is shown in **"User assets"** section. According to the listed token smart contracts, maximum limit amount of tokens is 100000, and minimum period between mints is 10 hours.

You can become a liquidity provider by adding liquidity to a corresponding pair in **"Add liquidity"** cection. Swap tokens is available in **"Swap"** section.

All available liquidity pools with corresponding reserves are shown in **"Liquidity pools"** section.

If connected wallet has an OWNER role in the contractRouter_mod smart contract, it is possible to **grant** and **revoke** admin roles of contractRouter_mod smart contract.
If connected wallet has an ADMIN role in the contractRouter_mod smart contract, it is possible to **set swap fee**, **set minimum LSR balance** (to avoid swap fee for users) and withdraw fees.
You can test OWNER and ADMIN features after deploying this DEX by yourself (link on corresponding Hardhat project is below) or ask developers to grant you ADMIN role.

Each blockchain event has a listener, implemented with rxjs technology using Subject and Observable

Smart contracts of this DEX could be found at corresponding [GitHub repository](https://github.com/Khazaar/pancake-router) with Hardhat project. You can use this project to connect this Web3 app to **Hardhat Local** network.

Compiled app could is deployed at AWS [here](https://master.dbnd0fh0jij.amplifyapp.com/)

This project was developed by Yoav Khazar - **Full-stack Web3 developer, Ph.D.**
Contacts:
E-mail: eeguar@gmail.com
Linked-in: [Yoav Khazar](https://www.linkedin.com/in/egor-kozharinov-6361169b/)
