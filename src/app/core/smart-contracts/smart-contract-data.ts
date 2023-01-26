import ERC20Potato from "./abi/ERC20Potato.json";
import ERC20Tomato from "./abi/ERC20Tomato.json";
import ERC20Apple from "./abi/ERC20Apple.json";
import ERC20LSR from "./abi/ERC20LSR.json";
import PancakeFactory from "./abi/PancakeFactory.json";
import PancakePair from "./abi/PancakePair.json";
import PancakeRouter_mod from "./abi/PancakeRouter_mod.json";
import { AbiItem } from "web3-utils";
import ethers from "ethers";

export interface ISmartContract {
    nameLong: string;
    nameShort: string;
    address: IAddress;
    abi: AbiItem[];
    instance?: ethers.Contract;
}
export interface IAddress {
    hardhat: string;
    bsc?: string;
    testnet?: string;
    goerli?: string;
}

export interface IPair {
    name: string;
    address: string;
    abi: AbiItem[];
    instance: ethers.Contract;
    token0: ISmartContract;
    token1: ISmartContract;
    reserve0: BigInt;
    reserve1: BigInt;
}
export const Apple: ISmartContract = {
    nameLong: "ERC20 Apple",
    nameShort: "APL",
    address: {
        hardhat: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        bsc: "0x82D50741AE40C7eEfE9E96ff78A0F628E7d11363",
        testnet: "",
        goerli: "0xF3B0Bf3cdC24ae7d9FC7Df08B98E2a3d30071b8f",
    },

    abi: ERC20Apple.abi as AbiItem[],
};

export const Potato: ISmartContract = {
    nameLong: "ERC20 Potato",
    nameShort: "PTT",
    address: {
        hardhat: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        bsc: "0x1470ac4D4C8Dc6Dd90c8d7BA2dA95f3deE7DE518",
        testnet: "",
        goerli: "0xac3849A6d4b0a97eC86998F6e0cC531D66F5Fa82",
    },
    abi: ERC20Potato.abi as AbiItem[],
};
export const Tomato: ISmartContract = {
    nameLong: "ERC20 Tomato",
    nameShort: "TMT",
    address: {
        hardhat: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        bsc: "0x6B4b850a63028d7511FE9E81512F0349AcAfe540",
        testnet: "",
        goerli: "0xfA85901DBeB559EBA2d15bdc1c9EdfC14D880cAC",
    },
    abi: ERC20Tomato.abi as AbiItem[],
};

export const LSR: ISmartContract = {
    nameLong: "ERC20 LSR",
    nameShort: "LSR",
    address: {
        hardhat: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
        bsc: "0xd8F6955D63050a4E392D9cf490F117c5da35e9bB",
        testnet: "",
        goerli: "0xF8E133c6B4bC73d89723B138E0654AeaAD11Bd21",
    },
    abi: ERC20LSR.abi as AbiItem[],
};
export const Factory: ISmartContract = {
    nameLong: "Pancake Factory",
    nameShort: "Pancake Factory",
    address: {
        hardhat: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        bsc: "0x3e843d00c79aa35390cbB1adB368C80F8AbFC3cC",
        testnet: "",
        goerli: "0xf1f8c1B19e56f34220B2eef5B19a15c2DF504f5F",
    },
    abi: PancakeFactory.abi as AbiItem[],
};
export const Pair: ISmartContract = {
    nameLong: "Pancake Pair",
    nameShort: "Pancake Pair",
    address: {
        hardhat: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
        bsc: "0xac3849A6d4b0a97eC86998F6e0cC531D66F5Fa82",
        testnet: "",
        goerli: "0xEaa96e643d817D7DE691D8992d7535aaD458c6DD",
    },
    abi: PancakePair.abi as AbiItem[],
};
export const Router_mod: ISmartContract = {
    nameLong: "Router_mod",
    nameShort: "Router_mod",
    address: {
        hardhat: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
        bsc: "0xaF036D2F1Af3D4F37bF1f25ef04F4535dED50709",
        testnet: "",
        goerli: "0xB767f6d00424BDC3d148ad8ec7A882ef4BcEC1d3",
    },
    abi: PancakeRouter_mod.abi as AbiItem[],
};
