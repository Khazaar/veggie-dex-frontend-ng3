import ERC20Potato from "./ERC20Potato.json";
import ERC20Apple from "./ERC20Apple.json";
import ERC20LSR from "./ERC20LSR.json";
import PancakeFactory from "./PancakeFactory.json";
import PancakePair from "./PancakePair.json";
import PancakeRouter_mod from "./PancakeRouter_mod.json";
import { AbiItem } from "web3-utils";
import ethers from "ethers";

export interface ISmartContract {
    name: string;
    address: string;
    abi: AbiItem[];
    instance?: ethers.Contract;
}
export const Potato: ISmartContract = {
    name: "ERC20 Potato",
    address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    abi: ERC20Potato.abi as AbiItem[],
};
export const Apple: ISmartContract = {
    name: "ERC20 Apple",
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: ERC20Apple.abi as AbiItem[],
};
export const LSR: ISmartContract = {
    name: "ERC20 LSR",
    address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    abi: ERC20LSR.abi as AbiItem[],
};
export const Factory: ISmartContract = {
    name: "Pancake Factory",
    address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    abi: PancakeFactory.abi as AbiItem[],
};
export const Pair: ISmartContract = {
    name: "Pancake Pair",
    address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    abi: PancakePair.abi as AbiItem[],
};
export const Router_mod: ISmartContract = {
    name: "ERC20 Potato",
    address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    abi: PancakeRouter_mod.abi as AbiItem[],
};
