import { Component } from "@angular/core";
import { SmartContractService } from "src/app/core/services/smart-contract.service";
import { Subscription } from "rxjs";
import { ConnectService } from "src/app/core/services/connect.service";
import { BaseCard } from "../../base.card";

@Component({
    selector: "vd-user-layout",
    templateUrl: "./user-layout.component.html",
    styleUrls: ["./user-layout.component.scss"],
})
export class UserLayoutComponent extends BaseCard {
    public hasAdminRole: Boolean;
    public hasOwnerRole: Boolean;
    constructor(
        smartContractService: SmartContractService,
        connectService: ConnectService
    ) {
        super(connectService, smartContractService);
    }

    public tokenMinted() {
        console.log("Event recieved");
    }

    protected async refresh() {
        try {
            this.connectService.fetchSmartContracts();
            this.hasAdminRole = this.connectService.hasAdminRole;
            this.hasOwnerRole = this.connectService.hasOwnerRole;
        } catch (error) {
            console.log(error);
        }
    }
}
