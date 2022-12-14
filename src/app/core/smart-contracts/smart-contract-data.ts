import ERC20Potato from "./ERC20Potato.json";
import ERC20Apple from "./ERC20Apple.json";
import ERC20LSR from "./ERC20LSR.json";
import PancakeFactory from "./PancakeFactory.json";
import PancakePair from "./PancakePair.json";
import PancakeRouter_mod from "./PancakeRouter_mod.json";
import { AbiItem } from "web3-utils";
import ethers from "ethers";

export interface ISmartContract {
    nameLong: string;
    nameShort: string;
    address: string;
    abi: AbiItem[];
    instance?: ethers.Contract;
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

export const Potato: ISmartContract = {
    nameLong: "ERC20 Potato",
    nameShort: "PTT",
    address: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
    abi: ERC20Potato.abi as AbiItem[],
};
export const Apple: ISmartContract = {
    nameLong: "ERC20 Apple",
    nameShort: "APL",
    address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    abi: ERC20Apple.abi as AbiItem[],
};
export const LSR: ISmartContract = {
    nameLong: "ERC20 LSR",
    nameShort: "LSR",
    address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    abi: ERC20LSR.abi as AbiItem[],
};
export const Factory: ISmartContract = {
    nameLong: "Pancake Factory",
    nameShort: "Pancake Factory",
    address: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
    abi: PancakeFactory.abi as AbiItem[],
};
export const Pair: ISmartContract = {
    nameLong: "Pancake Pair",
    nameShort: "Pancake Pair",
    address: "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707",
    abi: PancakePair.abi as AbiItem[],
};
export const Router_mod: ISmartContract = {
    nameLong: "Router_mod",
    nameShort: "Router_mod",
    address: "0x0165878a594ca255338adfa4d48449f69242eb8f",
    abi: PancakeRouter_mod.abi as AbiItem[],
};
