import { Component } from "@angular/core";
import { BigNumber, ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { ConnectService } from "../../services/connect.service";
import { UserAssetsComponent } from "../user-assets/user-assets.component";

@Component({
    selector: "vd-connect-wallet",
    templateUrl: "./connect-wallet.component.html",
    styleUrls: ["./connect-wallet.component.scss"],
})
export class ConnectWalletComponent {
    constructor(
        public connectService: ConnectService,
        public userAssetsComponent: UserAssetsComponent
    ) {}
    public signerAddress: string;
    public signerBalance: string;
    async clickConnect() {
        this.connectService.connetcEthers();
        this.signerAddress = await this.connectService.signer.getAddress();
        this.signerBalance = await this.connectService.getSignerBalance();
        await this.userAssetsComponent.onClickShow();
    }
}
