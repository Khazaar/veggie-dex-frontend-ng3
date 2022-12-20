import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SmartContractService } from "../../services/smart-contract.service";
import { ethers } from "ethers";
import {
    ISmartContract,
    Tomato,
} from "../../smart-contracts/smart-contract-data";
import { Potato, Apple, LSR } from "../../smart-contracts/smart-contract-data";
import { ConnectService } from "../../services/connect.service";
import { UserAssetsComponent } from "../user-assets/user-assets.component";
import { BaseCard } from "../base.card";
// import { MDCTextField } from "@material/textfield";
@Component({
    selector: "vd-mint-token",
    templateUrl: "./mint-token.component.html",
    styleUrls: ["./mint-token.component.scss"],
})
export class MintTokenComponent extends BaseCard {
    public tokenContracts: ISmartContract[] = [];
    @Output() selectedAmountChange: EventEmitter<number> =
        new EventEmitter<number>();
    @Output() selectedTokenChange: EventEmitter<ISmartContract> =
        new EventEmitter<ISmartContract>();
    @Input() selectedToken: ISmartContract = Apple;
    @Input() selectedAmount: number = 1000000;

    constructor(
        smartContractService: SmartContractService,
        connectService: ConnectService
    ) {
        super(connectService, smartContractService);
        this.tokenContracts = [Apple, Potato, Tomato, LSR];
    }

    public onSelectedAmountChange(): void {
        this.selectedAmountChange.emit(this.selectedAmount);
        //console.log(`Selected amount is ${this.selectedAmount}`);
    }
    public onSelectedTokenChange(contract: ISmartContract): void {
        this.selectedToken = contract;
        this.selectedTokenChange.emit(this.selectedToken);
        //console.log(`Selected token is ${this.selectedToken.name}`);
    }

    public async clickMint() {
        console.log(
            `Going to mint token ${this.selectedToken.nameLong} in , amount ${this.selectedAmount}`
        );

        await this.smartContractService.mintTokens(
            this.selectedToken.instance,
            BigInt(this.selectedAmount)
        );
    }
    public refresh(): void {}
}
