import { Component } from "@angular/core";
import { BigNumber, ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { ConnectService } from "../../services/connect.service";
import { UserAssetsComponent } from "../user-assets/user-assets.component";
import { SmartContractService } from "../../services/smart-contract.service";

@Component({
    selector: "vd-connect-wallet",
    templateUrl: "./connect-wallet.component.html",
    styleUrls: ["./connect-wallet.component.scss"],
})
export class ConnectWalletComponent {
    constructor(
        public connectService: ConnectService,
        public userAssetsComponent: UserAssetsComponent,
        public smartContractService: SmartContractService
    ) {}
    public signerAddress: string;
    public message: string = "Please, connect your wallet";
    public buttonText: string = "Connect wallet";
    async clickConnect() {
        await this.connectService.initConnectService();
        await this.smartContractService.initSmartContractService();

        this.signerAddress = await this.connectService.signer.getAddress();
        this.message = this.signerAddress;
        this.buttonText = "Wallet connected";

        await this.userAssetsComponent.onClickShow();
    }
}
