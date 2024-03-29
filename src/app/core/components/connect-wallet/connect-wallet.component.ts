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

    ngOnInit() {
        if (this.connectService.isConnected) {
            this.buttonText = "Wallet connected";
        }
    }

    async clickConnect() {
        try {
            await this.connectService.initConnectService();
            await this.smartContractService.initSmartContractService();

            this.signerAddress = await this.connectService.signer.getAddress();
            this.message = this.signerAddress;
            await this.userAssetsComponent.onClickShow();
            this.buttonText = "Wallet connected";
        } catch (error) {
            console.log(`Can't connect wallet: ${(error as Error).message}`);
        }
    }
}
