import { EventEmitter, Injectable } from "@angular/core";
import { ethers } from "ethers";
import { min, Observable, Subject } from "rxjs";
import {
    IPair,
    ISmartContract,
    Pair,
    Potato,
} from "../smart-contracts/smart-contract-data";
//import ERC20Potato from "../smart-contracts/ERC20Potato.json";
import { ConnectService } from "./connect.service";

@Injectable({
    providedIn: "root",
})
export class SmartContractService {
    public tokenPairs: IPair[] = [];
    public network: keyof typeof Potato.address;

    private liquidityAdded = new Subject<void>();
    public LiquidityAdded$(): Observable<void> {
        return this.liquidityAdded.asObservable();
    }

    private swapped = new Subject<void>();
    public Swapped$(): Observable<void> {
        return this.liquidityAdded.asObservable();
    }

    constructor(public connectService: ConnectService) {
        this.subscribeRouterContractsEvents();
        this.network = this.connectService.network
            .nameShort as keyof typeof Potato.address;
    }

    public async mintTokens(contract: ethers.Contract, amount: BigInt) {
        //this.fetchSmartContract();

        await contract
            .connect(this.connectService.signer)
            .getTokens(amount.toString());
    }

    public async getTokensBalance(contract: ethers.Contract): Promise<BigInt> {
        //this.fetchSmartContract();

        return await contract
            .connect(this.connectService.signer)
            .balanceOf(await this.connectService.signer.getAddress());
    }
    public async getSignerBalance() {
        return ethers.utils.formatEther(
            await this.connectService.signer.getBalance()
        );
    }
    public async addLiquidity(
        contractA: ISmartContract,
        contractB: ISmartContract,
        amountA: BigInt,
        amountB: BigInt
    ) {
        await contractA.instance
            .connect(this.connectService.signer)
            .approve(
                this.connectService.contractRouter_mod.address,
                amountA.toString()
            );
        await contractB.instance
            .connect(this.connectService.signer)
            .approve(
                this.connectService.contractRouter_mod.address,
                amountB.toString()
            );
        await this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .addLiquidity(
                contractA.address[this.network],
                contractB.address[this.network],
                amountA.toString(),
                amountB.toString(),
                amountA.toString(),
                amountB.toString(),
                this.connectService.signer.getAddress(),
                216604939048
            );
        this.subscribePairEvents();
    }
    public async swap(
        contractA: ISmartContract,
        contractB: ISmartContract,
        amountA: BigInt,
        amountB: BigInt
    ) {
        await contractA.instance
            .connect(this.connectService.signer)
            .approve(
                this.connectService.contractRouter_mod.address,
                amountA.toString()
            );
        // await contractB.instance
        //     .connect(this.connectService.signer)
        //     .approve(
        //         this.connectService.contractRouter_mod.address,
        //         amountB.toString()
        //     );

        await this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .swapExactTokensForTokens(
                amountA.toString(),
                1,
                [
                    contractA.address[this.network],
                    contractB.address[this.network],
                ],
                this.connectService.signer.getAddress(),
                99999999999999
            );
    }
    public getIContractByAddress(address: string): Promise<ISmartContract> {
        return new Promise((resolve, reject) => {
            this.connectService
                .getTokenContracts()
                .forEach((contract: ISmartContract) => {
                    if (contract.address[this.network] == address) {
                        resolve(contract);
                        return;
                    }
                });
            reject();
        });
    }
    public async getPairs(): Promise<IPair[]> {
        const nPairs =
            await this.connectService.contractFactory.allPairsLength();
        const tokenPairs: IPair[] = [];
        for (let i = 0; i < nPairs; i++) {
            try {
                const pairAddress =
                    await this.connectService.contractFactory.allPairs(i);

                const contractPair = new ethers.Contract(
                    pairAddress,
                    Pair.abi as any,
                    this.connectService.signer
                );
                const token0Address = (
                    await contractPair.token0()
                ).toLowerCase();
                const token1Address = (
                    await contractPair.token1()
                ).toLowerCase();
                const token0: ISmartContract = await this.getIContractByAddress(
                    token0Address
                );
                const token1: ISmartContract = await this.getIContractByAddress(
                    token1Address
                );
                const [reserve0, reserve1, time] =
                    await contractPair.getReserves();
                const pair: IPair = {
                    name: `${token0.nameShort}/${token1.nameShort}`,
                    address: pairAddress,
                    abi: Pair.abi,
                    instance: contractPair,
                    token0: token0,
                    token1: token1,
                    reserve0: reserve0,
                    reserve1: reserve1,
                };
                // console.log(
                //     `Token 0 :${pair.token0.nameShort}, token 1 ${pair.token1.nameShort}`
                // );

                //const pair: PancakePair = await new PancakePair__factory(owner).attach(pairAddress);
                tokenPairs.push(pair);
            } catch (error) {
                console.log(error);
            }
        }
        this.tokenPairs = tokenPairs;
        return tokenPairs;
    }

    public async subscribePairEvents() {
        const pairs = await this.getPairs();
        pairs.forEach((iPair) =>
            iPair.instance.on("Swap", (amountA, amountB) => {
                console.log(
                    `Added liquidity to ${iPair.name}: amoint A ${amountA}, amountB ${amountB}`
                );
                this.swapped.next();
            })
        );
    }

    public async subscribeRouterContractsEvents() {
        this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .on(
                "AddLiquidity",
                (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
                    console.log(
                        `Added liquidity: sender ${sender}, amount0In ${amount0In}, amount1In ${amount1In}, amount0Out ${amount0Out}, amount1Out ${amount1Out}, to ${to}`
                    );
                    this.liquidityAdded.next();
                }
            );
    }
}
