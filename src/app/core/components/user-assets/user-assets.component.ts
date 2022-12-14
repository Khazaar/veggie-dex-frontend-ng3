import { Component, Injectable } from "@angular/core";
import { SmartContractService } from "../../services/smart-contract.service";
import { ConnectService } from "../../services/connect.service";

export interface Asset {
    position: number;
    name: string;
    amount: BigInt;
}

let ASSET_DATA: Asset[] = [
    { position: 2, name: "Apple", amount: BigInt(0) },
    { position: 3, name: "Potato", amount: BigInt(0) },
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
export class UserAssetsComponent {
    public displayedColumns: string[] = ["name", "amount"];
    public dataSource = ASSET_DATA;
    public ETHBalance: string;

    constructor(
        public smartContractService: SmartContractService,
        public connectService: ConnectService
    ) {}
    //public potatoBalance: BigInt;
    public async onClickShow() {
        const potatoBalance: BigInt =
            await this.smartContractService.getTokensBalance(
                this.connectService.contractPotato
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
        ASSET_DATA[2].amount = lsrBalance;

        this.ETHBalance = await this.smartContractService.getSignerBalance();
    }
}
