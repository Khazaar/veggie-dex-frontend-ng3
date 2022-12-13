import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import {
    Potato,
    Apple,
    LSR,
    ISmartContract,
    Factory,
    Router_mod,
    Pair,
} from "../smart-contracts/smart-contract-data";

@Injectable({
    providedIn: "root",
})
export class ConnectService {
    public contractPotato: ethers.Contract;
    public contractApple: ethers.Contract;
    public contractLSR: ethers.Contract;
    public contractFactory: ethers.Contract;
    public contractPair: ethers.Contract;
    public contractRouter_mod: ethers.Contract;
    public tokenContracts: ISmartContract[] = [];
    public getTokenContracts() {
        return this.tokenContracts;
    }
    public fetchSmartContract() {
        this.contractPotato = new ethers.Contract(
            Potato.address,
            Potato.abi as any,
            this.signer
        );
        Potato.instance = this.contractPotato;

        this.contractApple = new ethers.Contract(
            Apple.address,
            Apple.abi as any,
            this.signer
        );
        Apple.instance = this.contractApple;

        this.contractLSR = new ethers.Contract(
            LSR.address,
            LSR.abi as any,
            this.signer
        );

        this.contractFactory = new ethers.Contract(
            Factory.address,
            Factory.abi as any,
            this.signer
        );
        Potato.instance = this.contractPotato;

        this.contractPair = new ethers.Contract(
            Pair.address,
            Pair.abi as any,
            this.signer
        );
        Apple.instance = this.contractApple;

        this.contractRouter_mod = new ethers.Contract(
            Router_mod.address,
            Router_mod.abi as any,
            this.signer
        );
        LSR.instance = this.contractLSR;
        this.tokenContracts = [Apple, Potato, LSR];
        //console.log(this.contractPotato.address);
    }

    ngOnInit() {
        this.isConnected = this.provider !== undefined;
        console.log(`Is connected? ${this.isConnected.toString()}`);
    }
    public provider: ethers.providers.Web3Provider;
    public signer: ethers.providers.JsonRpcSigner;
    public isConnected: boolean = false;

    constructor() {}
    public async connetcEthers() {
        this.isConnected = this.provider !== undefined;
        this.provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );
        this.signer = this.provider.getSigner();
        console.log(`Is connected? ${this.isConnected}`);
        this.fetchSmartContract();
    }
    public async getSignerAddress() {
        const addr = await this.signer.getAddress();
        console.log(addr);
        return addr;
    }

    public async getSignerBalance() {
        return ethers.utils.formatEther(await this.signer.getBalance());
    }
}
