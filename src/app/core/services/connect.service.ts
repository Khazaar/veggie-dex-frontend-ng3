import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import { Observable } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { Hardhat, INetwork } from "../smart-contracts/networks";
import {
    Potato,
    Apple,
    LSR,
    ISmartContract,
    Factory,
    Router_mod,
    Pair,
    IPair,
    IAddress,
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
    public network: INetwork = Hardhat;

    private tokenMinted = new Subject<ISmartContract>();
    public TokenMinted$(): Observable<ISmartContract> {
        return this.tokenMinted.asObservable();
    }

    private walletConnected = new Subject<void>();
    public walletConnected$(): Observable<void> {
        return this.walletConnected.asObservable();
    }

    public getTokenContracts() {
        return this.tokenContracts;
    }
    public async fetchSmartContract() {
        const network = this.network.nameShort as keyof typeof Potato.address;
        // console.log(`Key is ${network}`);
        // const addressAll: IAddress = Potato.address;
        // const address: string = addressAll[network as ObjectKey];
        // console.log(`Address is ${address}`);
        //this.signerAddress = await this.signer.getAddress();
        // Potato

        this.contractPotato = new ethers.Contract(
            Potato.address[network],
            Potato.abi as any,
            this.signer
        );
        Potato.instance = this.contractPotato;

        // Apple
        this.contractApple = new ethers.Contract(
            Apple.address[network],
            Apple.abi as any,
            this.signer
        );
        Apple.instance = this.contractApple;
        // LSR
        this.contractLSR = new ethers.Contract(
            LSR.address[network],
            LSR.abi as any,
            this.signer
        );
        LSR.instance = this.contractLSR;
        // Factory
        this.contractFactory = new ethers.Contract(
            Factory.address[network],
            Factory.abi as any,
            this.signer
        );
        Factory.instance = this.contractPotato;

        // Pair
        this.contractPair = new ethers.Contract(
            Pair.address[network],
            Pair.abi as any,
            this.signer
        );
        Pair.instance = this.contractPair;

        // Router
        this.contractRouter_mod = new ethers.Contract(
            Router_mod.address[network],
            Router_mod.abi as any,
            this.signer
        );
        Router_mod.instance = this.contractLSR;
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

    constructor() {
        this.subscribeTransferTokensEvents();
    }
    public async connetcEthers() {
        this.isConnected = this.provider !== undefined;
        this.provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );
        this.signer = this.provider.getSigner();
        console.log(`Is connected? ${this.isConnected}`);
        this.fetchSmartContract();

        this.walletConnected.next();
    }

    public async getSignerBalance() {
        return ethers.utils.formatEther(await this.signer.getBalance());
    }

    public async subscribeTransferTokensEvents() {
        this.tokenContracts.forEach((iContract) =>
            iContract.instance.on("Transfer", (from, to, amount) => {
                console.log(`Transfeed ${amount} tokens from ${from} to ${to}`);
                this.tokenMinted.next(iContract);
            })
        );
    }
}
