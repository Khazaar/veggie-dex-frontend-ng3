import { Component } from "@angular/core";
import { BigNumber, ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { ConnectService } from "../../services/connect.service";

@Component({
    selector: "vd-connect-wallet",
    templateUrl: "./connect-wallet.component.html",
    styleUrls: ["./connect-wallet.component.scss"],
})
export class ConnectWalletComponent {
    constructor(public connectService: ConnectService) {}
    public signerAddress: string;
    public signerBalance: string;
    async clickConnect() {
        this.connectService.connetcEthers();
        this.signerAddress = await this.connectService.getSignerAddress();
        this.signerBalance = await this.connectService.getSignerBalance();
    }
}
