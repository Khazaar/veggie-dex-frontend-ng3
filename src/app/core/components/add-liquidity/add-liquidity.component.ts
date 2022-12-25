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

@Component({
    selector: "vd-add-liquidity",
    templateUrl: "./add-liquidity.component.html",
    styleUrls: ["./add-liquidity.component.scss"],
})
export class AddLiquidityComponent {
    @Output() selectedAmountChange: EventEmitter<number> =
        new EventEmitter<number>();
    @Output() selectedTokenAChange: EventEmitter<ISmartContract> =
        new EventEmitter<ISmartContract>();
    @Output() selectedTokenBChange: EventEmitter<ISmartContract> =
        new EventEmitter<ISmartContract>();
    public tokenContracts: ISmartContract[] = [];
    @Input() selectedTokenA: ISmartContract = Apple;
    @Input() selectedTokenB: ISmartContract = Potato;
    @Input() selectedAmountA: number = 5000;
    @Input() selectedAmountB: number = 5000;
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
    constructor(
        public smartContractService: SmartContractService,
        public connectService: ConnectService,
        public userAssetsComponent: UserAssetsComponent
    ) {}

    ngOnInit() {
        this.tokenContracts = [Apple, Potato, Tomato, LSR];
    }

    public async clickAddLiquidity() {
        this.smartContractService.addLiquidity(
            this.selectedTokenA,
            this.selectedTokenB,
            BigInt(this.selectedAmountA),
            BigInt(this.selectedAmountB)
        );
    }
}
