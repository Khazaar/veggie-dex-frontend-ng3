import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConnectService } from "../../services/connect.service";
import { SmartContractService } from "../../services/smart-contract.service";
import { BaseCard } from "../base.card";
import {
    Asset,
    UserAssetsComponent,
} from "../user-assets/user-assets.component";

let ASSET_DATA: Asset[] = [
    { position: 2, name: "Apple", amount: BigInt(0) },
    { position: 3, name: "Potato", amount: BigInt(0) },
    { position: 3, name: "Tomato", amount: BigInt(0) },
    { position: 4, name: "LSR", amount: BigInt(0) },
];
@Component({
    selector: "vd-admin-panel",
    templateUrl: "./admin-panel.component.html",
    styleUrls: ["./admin-panel.component.scss"],
})
export class AdminPanelComponent extends BaseCard {
    [x: string]: any;
    public displayedColumns: string[] = ["name", "amount"];
    public dataSource = ASSET_DATA;
    @Input() swapFee: number = 10;
    @Input() minLSRBalance: number = 100;
    @Output() swapFeeChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() minLSRBalanceFeeChange: EventEmitter<number> =
        new EventEmitter<number>();

    public onSwapFeeChange(): void {
        this.swapFeeChange.emit(this.swapFee);
    }
    public onMinLSRBalanceChange(): void {
        this.minLSRBalanceFeeChange.emit(this.swapFee);
    }

    constructor(
        smartContractService: SmartContractService,
        connectService: ConnectService
    ) {
        super(connectService, smartContractService);
    }

    protected async refresh() {
        try {
            this.swapFee =
                await this.connectService.contractRouter_mod.getSwapFee();

            this.minLSRBalance =
                await this.connectService.contractRouter_mod.getLsrMinBalance();
            this.connectService.tokenContracts.forEach((iContract) => {});

            const potatoBalance: BigInt =
                await this.connectService.contractPotato.balanceOf(
                    this.connectService.contractRouter_mod.address
                );
            const tomatoBalance: BigInt =
                await this.connectService.contractTomato.balanceOf(
                    this.connectService.contractRouter_mod.address
                );

            const appleBalance: BigInt =
                await this.connectService.contractApple.balanceOf(
                    this.connectService.contractRouter_mod.address
                );

            const lsrBalance: BigInt =
                await this.connectService.contractLSR.balanceOf(
                    this.connectService.contractRouter_mod.address
                );
            ASSET_DATA[0].amount = appleBalance;
            ASSET_DATA[1].amount = potatoBalance;
            ASSET_DATA[2].amount = tomatoBalance;
            ASSET_DATA[3].amount = lsrBalance;
        } catch (error) {
            console.log(error);
        }
    }

    public async clickSet() {
        console.log(
            `Going to set fee to ${this.swapFee}, LSR Min balance to avoid fee to ${this.minLSRBalance}`
        );
        try {
            await this.connectService.contractRouter_mod.setSwapFee(
                this.swapFee.toString()
            );
            await this.connectService.contractRouter_mod.setLsrMinBalance(
                this.minLSRBalance.toString()
            );
        } catch (error) {
            console.log(error);
        }
    }

    public async clickWithdrawFees() {
        console.log(`Going to withdraw fees`);
        try {
            this.connectService.tokenContracts.forEach(async (iContract) => {
                if (
                    (await iContract.instance.balanceOf(
                        this.connectService.contractRouter_mod.address
                    )) > 0
                ) {
                    await this.connectService.contractRouter_mod.withdrawFees(
                        iContract.instance.address
                    );
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
