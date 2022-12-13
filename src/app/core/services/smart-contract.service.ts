import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import { AbiItem } from "web3-utils";
import { ISmartContract } from "../smart-contracts/smart-contract-data";
//import ERC20Potato from "../smart-contracts/ERC20Potato.json";
import { ConnectService } from "./connect.service";

@Injectable({
    providedIn: "root",
})
export class SmartContractService {
    constructor(public connectService: ConnectService) {
        //this.fetchSmartContract();
    }

    public async mintTokens(contract: ethers.Contract, amount: BigInt) {
        //this.fetchSmartContract();

        await contract
            .connect(this.connectService.signer)
            .getTokens(amount.toString());
    }

    public async getTokensBalance(contract: ethers.Contract): Promise<BigInt> {
        //this.fetchSmartContract();

        return await contract
            .connect(this.connectService.signer)
            .balanceOf(await this.connectService.getSignerAddress());
    }
    public async getSignerBalance() {
        return ethers.utils.formatEther(
            await this.connectService.signer.getBalance()
        );
    }
    public async addLiquidity(
        contractA: ISmartContract,
        contractB: ISmartContract,
        amountA: BigInt,
        amountB: BigInt
    ) {
        await contractA.instance
            .connect(this.connectService.signer)
            .approve(
                this.connectService.contractRouter_mod.address,
                999999999999
            );
        await contractB.instance
            .connect(this.connectService.signer)
            .approve(
                this.connectService.contractRouter_mod.address,
                999999999999
            );
        await this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .addLiquidity(
                contractA.address,
                contractB.address,
                amountA.toString(),
                amountB.toString(),
                amountA.toString(),
                amountB.toString(),
                this.connectService.signer.getAddress(),
                216604939048
            );
    }
}
