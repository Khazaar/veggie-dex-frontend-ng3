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

@Component({
    selector: "vd-swap",
    templateUrl: "./swap.component.html",
    styleUrls: ["./swap.component.scss"],
})
export class SwapComponent extends BaseCard {
    constructor(
        smartContractService: SmartContractService,
        connectService: ConnectService,
        public userAssetsComponent: UserAssetsComponent
    ) {
        super(connectService, smartContractService);
        this.tokenContracts = [Apple, Potato, Tomato, LSR];
    }
    @Output() selectedAmountChange: EventEmitter<number> =
        new EventEmitter<number>();
    @Output() selectedTokenAChange: EventEmitter<ISmartContract> =
        new EventEmitter<ISmartContract>();
    @Output() selectedTokenBChange: EventEmitter<ISmartContract> =
        new EventEmitter<ISmartContract>();
    public tokenContracts: ISmartContract[] = [];
    @Input() selectedTokenA: ISmartContract = Apple;
    @Input() selectedTokenB: ISmartContract = Potato;
    @Input() selectedAmountA: number = 100000;
    @Input() selectedAmountB: number = 100000;
    public onSelectedAmountAChange(): void {
        this.selectedAmountChange.emit(this.selectedAmountA);
    }
    public onSelectedAmountBChange(): void {
        this.selectedAmountChange.emit(this.selectedAmountB);
    }
    public onSelectedTokenAChange(contract: ISmartContract): void {
        this.selectedTokenA = contract;
        this.selectedTokenAChange.emit(this.selectedTokenA);
        //console.log(`Selected token is ${this.selectedToken.name}`);
    }
    public onSelectedTokenBChange(contract: ISmartContract): void {
        this.selectedTokenB = contract;
        this.selectedTokenBChange.emit(this.selectedTokenB);
        //console.log(`Selected token is ${this.selectedToken.name}`);
    }

    public async clickSwap() {
        await this.smartContractService.swap(
            this.selectedTokenA,
            this.selectedTokenB,
            BigInt(this.selectedAmountA),
            BigInt(this.selectedAmountB)
        );
    }

    public refresh() {}
}
