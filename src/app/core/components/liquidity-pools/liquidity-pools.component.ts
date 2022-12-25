import { Component } from "@angular/core";
import { ConnectService } from "../../services/connect.service";
import { SmartContractService } from "../../services/smart-contract.service";
import {
    IPair,
    ISmartContract,
} from "../../smart-contracts/smart-contract-data";
import { BaseCard } from "../base.card";

export interface Asset {
    position: number;
    pairName: string;
    reserve0: BigInt;
    reserve1: BigInt;
}
let ASSET_DATA: Asset[] = [
    // {
    //     position: 1,
    //     pairName: "",
    //     reserve0: BigInt(0),
    //     reserve1: BigInt(0),
    // },
    // {
    //     position: 2,
    //     pairName: "",
    //     reserve0: BigInt(0),
    //     reserve1: BigInt(0),
    // },
    // { position: 3, pairName: "", reserve0: BigInt(0), reserve1: BigInt(0) },
];
@Component({
    selector: "vd-liquidity-pools",
    templateUrl: "./liquidity-pools.component.html",
    styleUrls: ["./liquidity-pools.component.scss"],
})
export class LiquidityPoolsComponent extends BaseCard {
    public displayedColumns: string[] = ["pairName", "reserve0", "reserve1"];
    public dataSource: Asset[] = [];
    public ETHBalance: string;
    public pairs: IPair[] = [];

    constructor(
        smartContractService: SmartContractService,
        connectService: ConnectService
    ) {
        super(connectService, smartContractService);
    }
    //public potatoBalance: BigInt;
    public async refresh() {
        try {
            ASSET_DATA = [];
            this.pairs = await this.smartContractService.getPairs();

            this.pairs.forEach((pair: IPair, index: number) => {
                ASSET_DATA.push({
                    position: index,
                    reserve0: pair.reserve0,
                    reserve1: pair.reserve1,
                    pairName: pair.name,
                });
                // ASSET_DATA[index].pairName = pair.name;
                // ASSET_DATA[index].reserve0 = pair.reserve0;
                // ASSET_DATA[index].reserve1 = pair.reserve1;
            });
            this.dataSource = ASSET_DATA;
        } catch {}
    }
}
