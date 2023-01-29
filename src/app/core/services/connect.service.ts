import { BSC, Goerli } from "./../smart-contracts/networks";
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
    Tomato,
} from "../smart-contracts/smart-contract-data";

@Injectable({
    providedIn: "root",
})
export class ConnectService {
    public contractPotato: ethers.Contract;
    public contractApple: ethers.Contract;
    public contractTomato: ethers.Contract;
    public contractLSR: ethers.Contract;
    public contractFactory: ethers.Contract;
    public contractPair: ethers.Contract;
    public contractRouter_mod: ethers.Contract;
    public tokenContracts: ISmartContract[] = [];
    public network: INetwork = Goerli; // = Hardhat;

    private tokenMinted = new Subject<ISmartContract>();
    public TokenMinted$(): Observable<ISmartContract> {
        return this.tokenMinted.asObservable();
    }

    private walletConnected = new Subject<void>();
    public walletConnected$(): Observable<void> {
        return this.walletConnected.asObservable();
    }

    private mintRevertedPeriod = new Subject<string>();
    public MintRevertedPeriod$(): Observable<string> {
        return this.mintRevertedPeriod.asObservable();
    }

    public provider: ethers.providers.Web3Provider;
    public signer: ethers.providers.JsonRpcSigner;
    public isConnected: boolean = false;

    constructor() {
        this.network = Goerli;
    }

    public async initConnectService() {
        try {
            await this.connectEthers();
            await this.fetchSmartContracts();
            //this.isConnected = this.provider !== undefined;
            console.log(`Is connected? ${this.isConnected.toString()}`);
            await this.subscribeMintRevertedPeriodEvent();
            await this.subscribeTransferTokensEvents();

            this.isConnected = true;
        } catch (error) {
            console.log(
                `Error in initConnectService: ${(error as Error).message}`
            );
        }
        //this.setNetwork(BSC);
    }

    public setNetwork(network: INetwork) {
        this.network = network;
        this.fetchSmartContracts();
    }

    public async connectEthers() {
        await (window as any).ethereum.request({
            method: "eth_requestAccounts",
        });
        this.provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );
        // Prompt user for account connections
        //await this.provider.send("eth_requestAccounts", []);
        // const signer = this.provider.getSigner();
        // console.log("Account:", await signer.getAddress());

        // this.provider = new ethers.providers.Web3Provider(
        //     (window as any).ethereum
        // );
        this.signer = this.provider.getSigner();
        console.log(`Is connected? ${this.isConnected}`);
        console.log("Account:", await this.signer.getAddress());
        this.walletConnected.next();
    }

    public getTokenContracts() {
        return this.tokenContracts;
    }
    public async fetchSmartContracts() {
        try {
            const network = this.network
                .nameShort as keyof typeof Potato.address;

            // Potato
            this.contractPotato = new ethers.Contract(
                Potato.address[network],
                Potato.abi as any,
                this.signer
            );
            Potato.instance = this.contractPotato;

            // Tomato
            this.contractTomato = new ethers.Contract(
                Tomato.address[network],
                Tomato.abi as any,
                this.signer
            );
            Tomato.instance = this.contractTomato;

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
            this.tokenContracts = [Apple, Potato, Tomato, LSR];
        } catch (error) {
            console.log(
                `Error in fetchSmartContracts: ${(error as Error).message}`
            );
        }
        await this.subscribeTransferTokensEvents();
    }
    public async getSignerBalance() {
        return ethers.utils.formatEther(await this.signer.getBalance());
    }

    public async subscribeTransferTokensEvents() {
        this.tokenContracts.forEach((iContract) =>
            iContract.instance
                .connect(this.signer)
                .on("Transfer", (from, to, amount) => {
                    console.log(
                        `Transfeed ${amount} tokens from ${from} to ${to}`
                    );
                    this.tokenMinted.next(iContract);
                })
        );
    }
    public async subscribeMintRevertedPeriodEvent() {
        this.contractApple.on(
            "MintRevertedPeriod",
            (timePassedSeconds, mintLimitPeriodSeconds) => {
                const err = `Passed only ${timePassedSeconds} seconds, required to wait ${mintLimitPeriodSeconds} seconds`;
                console.log(err);
                this.mintRevertedPeriod.next(err);
            }
        );
    }
}
