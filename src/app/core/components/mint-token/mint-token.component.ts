import { Component, OnInit } from "@angular/core";
import { SmartContractService } from "../../services/smart-contract.service";
import { ethers } from "ethers";
import { ISmartContract } from "../../smart-contracts/smart-contract-data";
import { Potato, Apple, LSR } from "../../smart-contracts/smart-contract-data";
// import { MDCTextField } from "@material/textfield";
@Component({
    selector: "vd-mint-token",
    templateUrl: "./mint-token.component.html",
    styleUrls: ["./mint-token.component.scss"],
})
export class MintTokenComponent {
    public tokenContracts: ISmartContract[] = [];
    //public tokenContracts: string[] = [];
    constructor(public smartContractService: SmartContractService) {}
    ngOnInit() {
        //this.tokenContracts = ["Alef", "Bet", "Gimel"];
    }
    public async clickMint() {
        this.smartContractService.mintTokens(
            this.smartContractService.contractPotato,
            BigInt(2000)
        );
    }
    public fetchMint() {
        this.tokenContracts = [Potato, Apple, LSR];
    }
}
