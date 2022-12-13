import ERC20Potato from "../smart-contracts/ERC20Potato.json";
import ERC20Apple from "../smart-contracts/ERC20Apple.json";
import ERC20LSR from "../smart-contracts/ERC20LSR.json";
import { AbiItem } from "web3-utils";
import ethers from "ethers";

export interface ISmartContract {
    name: string;
    address: string;
    abi: AbiItem[];
    instance?: ethers.Contract;
}

export const Apple: ISmartContract = {
    name: "ERC20 Apple",
    address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    abi: ERC20Apple.abi as AbiItem[],
};
export const LSR: ISmartContract = {
    name: "ERC20 LSR",
    address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    abi: ERC20LSR.abi as AbiItem[],
};

export const Potato: ISmartContract = {
    name: "ERC20 Potato",
    address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    abi: ERC20Potato.abi as AbiItem[],
};
