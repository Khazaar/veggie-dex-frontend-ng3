import { Component, Injectable } from "@angular/core";
import { SmartContractService } from "../../services/smart-contract.service";
import { ConnectService } from "../../services/connect.service";
import { Subscription } from "rxjs";
import { BaseCard } from "../base.card";

export interface Asset {
    position: number;
    name: string;
    amount: BigInt;
}

let ASSET_DATA: Asset[] = [
    { position: 2, name: "Apple", amount: BigInt(0) },
    { position: 3, name: "Potato", amount: BigInt(0) },
    { position: 3, name: "Tomato", amount: BigInt(0) },
    { position: 4, name: "LSR", amount: BigInt(0) },
];

@Component({
    selector: "vd-user-assets",
    templateUrl: "./user-assets.component.html",
    styleUrls: ["./user-assets.component.scss"],
})
@Injectable({
    providedIn: "root",
})
export class UserAssetsComponent extends BaseCard {
    public displayedColumns: string[] = ["name", "amount"];
    public dataSource = ASSET_DATA;
    public ETHBalance: string;

    constructor(
        connectService: ConnectService,
        martContractService: SmartContractService
    ) {
        super(connectService, martContractService);
    }

    public async refresh() {
        try {
            const potatoBalance: BigInt =
                await this.smartContractService.getTokensBalance(
                    this.connectService.contractPotato
                );
            const tomatoBalance: BigInt =
                await this.smartContractService.getTokensBalance(
                    this.connectService.contractTomato
                );

            const appleBalance: BigInt =
                await this.smartContractService.getTokensBalance(
                    this.connectService.contractApple
                );

            const lsrBalance: BigInt =
                await this.smartContractService.getTokensBalance(
                    this.connectService.contractLSR
                );
            ASSET_DATA[0].amount = appleBalance;
            ASSET_DATA[1].amount = potatoBalance;
            ASSET_DATA[2].amount = tomatoBalance;
            ASSET_DATA[3].amount = lsrBalance;

            this.ETHBalance =
                await this.smartContractService.getSignerBalance();
            console.log("User assets refreshed!");
        } catch (error) {
            console.log(
                `Error in user-assets.component: ${(error as Error).message}`
            );
        }
    }
}
