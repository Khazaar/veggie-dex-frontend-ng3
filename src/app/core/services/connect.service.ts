import { Injectable } from "@angular/core";
import { ethers } from "ethers";

@Injectable({
    providedIn: "root",
})
export class ConnectService {
    public provider: ethers.providers.Web3Provider;
    public signer: ethers.providers.JsonRpcSigner;

    constructor() {}
    public async connetcEthers() {
        // let activeAccount;
        // const accounts = await (window as any).ethereum.request({
        //     method: "eth_requestAccounts",
        // });
        // if (accounts.length === 0) {
        //     // MetaMask is locked or the user has not connected any accounts
        //     console.log("Please connect to MetaMask.");
        // } else if (accounts[0] !== activeAccount) {
        //     activeAccount = accounts[0];
        // }
        //const provider = await detectEthereumProvider();

        this.provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );
        this.signer = this.provider.getSigner();
    }
    public async getSignerAddress() {
        return await this.signer.getAddress();
    }

    public async getSignerBalance() {
        return ethers.utils.formatEther(await this.signer.getBalance());
    }
}
