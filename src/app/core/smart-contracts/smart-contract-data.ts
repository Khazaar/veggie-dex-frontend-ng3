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
        bsc: "",
        testnet: "",
    },

    abi: ERC20Apple.abi as AbiItem[],
};

export const Potato: ISmartContract = {
    nameLong: "ERC20 Potato",
    nameShort: "PTT",
    address: {
        hardhat: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        bsc: "",
        testnet: "",
    },
    abi: ERC20Potato.abi as AbiItem[],
};
export const Tomato: ISmartContract = {
    nameLong: "ERC20 Tomato",
    nameShort: "TMT",
    address: {
        hardhat: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        bsc: "",
        testnet: "",
    },
    abi: ERC20Tomato.abi as AbiItem[],
};

export const LSR: ISmartContract = {
    nameLong: "ERC20 LSR",
    nameShort: "LSR",
    address: {
        hardhat: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
        bsc: "",
        testnet: "",
    },
    abi: ERC20LSR.abi as AbiItem[],
};
export const Factory: ISmartContract = {
    nameLong: "Pancake Factory",
    nameShort: "Pancake Factory",
    address: {
        hardhat: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        bsc: "",
        testnet: "",
    },
    abi: PancakeFactory.abi as AbiItem[],
};
export const Pair: ISmartContract = {
    nameLong: "Pancake Pair",
    nameShort: "Pancake Pair",
    address: {
        hardhat: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
        bsc: "",
        testnet: "",
    },
    abi: PancakePair.abi as AbiItem[],
};
export const Router_mod: ISmartContract = {
    nameLong: "Router_mod",
    nameShort: "Router_mod",
    address: {
        hardhat: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
        bsc: "",
        testnet: "",
    },
    abi: PancakeRouter_mod.abi as AbiItem[],
};
