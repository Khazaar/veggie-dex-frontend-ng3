import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConnectService } from "../../services/connect.service";
import { SmartContractService } from "../../services/smart-contract.service";
import { BaseCard } from "../base.card";
import { UserAssetsComponent } from "../user-assets/user-assets.component";

@Component({
    selector: "vd-admin-panel",
    templateUrl: "./admin-panel.component.html",
    styleUrls: ["./admin-panel.component.scss"],
})
export class AdminPanelComponent extends BaseCard {
    [x: string]: any;
    @Input() swapFee: number;
    @Output() swapFeeChange: EventEmitter<number> = new EventEmitter<number>();

    public onSwapFeeChange(): void {
        this.swapFeeChange.emit(this.swapFee);
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
        } catch (error) {
            console.log(error);
        }
    }

    public async clickSet() {
        console.log(`Going to set fee to ${this.swapFee}`);
        try {
            await this.connectService.contractRouter_mod.setSwapFee(
                this.swapFee.toString()
            );
        } catch (error) {
            console.log(error);
        }
    }
}
