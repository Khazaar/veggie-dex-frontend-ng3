import { Component } from "@angular/core";
import { SmartContractService } from "./core/services/smart-contract.service";
import { ConnectService } from "./core/services/connect.service";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "veggie-dex-frontend-ng3";
    constructor(
        public connectService: ConnectService,
        public smartContractService: SmartContractService
    ) {}
    async ngOnInit(): Promise<void> {
        await this.connectService.initConnectService();
        await this.smartContractService.initSmartContractService();
    }
}
