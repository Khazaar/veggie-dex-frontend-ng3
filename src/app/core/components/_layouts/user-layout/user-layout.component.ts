import { Component } from "@angular/core";
import { SmartContractService } from "src/app/core/services/smart-contract.service";
import { Subscription } from "rxjs";
import { ConnectService } from "src/app/core/services/connect.service";

@Component({
    selector: "vd-user-layout",
    templateUrl: "./user-layout.component.html",
    styleUrls: ["./user-layout.component.scss"],
})
export class UserLayoutComponent {
    constructor(public connectService: ConnectService) {}

    public tokenMinted() {
        console.log("Event recieved");
    }
}
