import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SmartContractService } from "../../services/smart-contract.service";
import { ethers } from "ethers";
import { ISmartContract } from "../../smart-contracts/smart-contract-data";
import { Potato, Apple, LSR } from "../../smart-contracts/smart-contract-data";
import { ConnectService } from "../../services/connect.service";
import { UserAssetsComponent } from "../user-assets/user-assets.component";
// import { MDCTextField } from "@material/textfield";
@Component({
    selector: "vd-mint-token",
    templateUrl: "./mint-token.component.html",
    styleUrls: ["./mint-token.component.scss"],
})
export class MintTokenComponent {
    @Output() selectedAmountChange: EventEmitter<number> =
        new EventEmitter<number>();
    @Output() selectedTokenChange: EventEmitter<ISmartContract> =
        new EventEmitter<ISmartContract>();
    public tokenContracts: ISmartContract[] = [];
    @Input() selectedToken: ISmartContract = Apple;
    @Input() selectedAmount: number = 1000000;
    public onSelectedAmountChange(): void {
        this.selectedAmountChange.emit(this.selectedAmount);
        //console.log(`Selected amount is ${this.selectedAmount}`);
    }
    public onSelectedTokenChange(contract: ISmartContract): void {
        this.selectedToken = contract;
        this.selectedTokenChange.emit(this.selectedToken);
        //console.log(`Selected token is ${this.selectedToken.name}`);
    }
    constructor(
        public smartContractService: SmartContractService,
        public connectService: ConnectService,
        public userAssetsComponent: UserAssetsComponent
    ) {}

    ngOnInit() {
        this.tokenContracts = [Apple, Potato, LSR];
    }

    public async clickMint() {
        console.log(
            `Minted token is ${this.selectedToken.nameLong}, amount is ${this.selectedAmount}`
        );
        this.smartContractService.mintTokens(
            this.selectedToken.instance,
            BigInt(this.selectedAmount)
        );
        this.userAssetsComponent.onClickShow();
    }
}
