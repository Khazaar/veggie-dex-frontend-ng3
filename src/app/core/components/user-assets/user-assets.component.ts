import { Component } from "@angular/core";
import { SmartContractService } from "../../services/smart-contract.service";

@Component({
    selector: "vd-user-assets",
    templateUrl: "./user-assets.component.html",
    styleUrls: ["./user-assets.component.less"],
})
export class UserAssetsComponent {
    constructor(public smartContractService: SmartContractService) {}
    public potatoBalance: BigInt;
    public async onClickShow() {
        this.potatoBalance = await this.smartContractService.getTokensBalance(
            this.smartContractService.contractPotato
        );
        console.log(this.potatoBalance);
    }
}
