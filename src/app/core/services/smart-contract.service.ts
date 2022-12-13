import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import { AbiItem } from "web3-utils";
import { Potato, Apple, LSR } from "../smart-contracts/smart-contract-data";
//import ERC20Potato from "../smart-contracts/ERC20Potato.json";
import { ConnectService } from "./connect.service";

@Injectable({
    providedIn: "root",
})
export class SmartContractService {
    public contractPotato: ethers.Contract;
    public contractApple: ethers.Contract;
    public contractLSR: ethers.Contract;
    public tokenContracts: ethers.Contract[] = [];
    constructor(public connectService: ConnectService) {
        this.fetchSmartContract();
    }
    public getTokenContracts() {
        return this.tokenContracts;
    }
    public fetchSmartContract() {
        this.contractPotato = new ethers.Contract(
            Potato.address,
            Potato.abi as any,
            this.connectService.signer
        );
        Potato.instance = this.contractPotato;

        this.contractApple = new ethers.Contract(
            Apple.address,
            Apple.abi as any,
            this.connectService.signer
        );
        Apple.instance = this.contractApple;

        this.contractLSR = new ethers.Contract(
            LSR.address,
            LSR.abi as any,
            this.connectService.signer
        );
        LSR.instance = this.contractLSR;
        this.tokenContracts = [
            this.contractPotato,
            this.contractApple,
            this.contractLSR,
        ];
        //console.log(this.contractPotato.address);
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
}
