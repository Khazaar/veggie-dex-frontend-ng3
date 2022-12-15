import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import { AbiItem } from "web3-utils";
import {
    IPair,
    ISmartContract,
    Pair,
} from "../smart-contracts/smart-contract-data";
//import ERC20Potato from "../smart-contracts/ERC20Potato.json";
import { ConnectService } from "./connect.service";

@Injectable({
    providedIn: "root",
})
export class SmartContractService {
    public tokenPairs: IPair[] = [];
    constructor(public connectService: ConnectService) {
        //this.fetchSmartContract();
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
                contractA.address,
                contractB.address,
                amountA.toString(),
                amountB.toString(),
                amountA.toString(),
                amountB.toString(),
                this.connectService.signer.getAddress(),
                216604939048
            );
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
                [contractA.address, contractB.address],
                this.connectService.signer.getAddress(),
                99999999999999
            );
    }
    public getIContractByAddress(address: string): Promise<ISmartContract> {
        return new Promise((resolve, reject) => {
            this.connectService
                .getTokenContracts()
                .forEach((contract: ISmartContract) => {
                    if (contract.address["hardhat"] == address) {
                        resolve(contract);
                        return;
                    }
                });
            reject();
        });
    }
    public async getPairs() {
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
                console.log(
                    `Token 0 :${pair.token0.nameShort}, token 1 ${pair.token1.nameShort}`
                );

                //const pair: PancakePair = await new PancakePair__factory(owner).attach(pairAddress);
                tokenPairs.push(pair);
            } catch (error) {
                console.log(error);
            }
        }
        this.tokenPairs = tokenPairs;
        return tokenPairs;
    }
}
