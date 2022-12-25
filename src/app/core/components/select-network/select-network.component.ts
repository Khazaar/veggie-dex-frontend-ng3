import {
    INetwork,
    Hardhat,
    BSC,
    Testnet,
} from "./../../smart-contracts/networks";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConnectService } from "../../services/connect.service";
import { SmartContractService } from "../../services/smart-contract.service";
import {
    ISmartContract,
    Apple,
    Potato,
    LSR,
} from "../../smart-contracts/smart-contract-data";
import { UserAssetsComponent } from "../user-assets/user-assets.component";

@Component({
    selector: "vd-select-network",
    templateUrl: "./select-network.component.html",
    styleUrls: ["./select-network.component.scss"],
})
export class SelectNetworkComponent {
    @Output() selectedNetworkChange: EventEmitter<INetwork> =
        new EventEmitter<INetwork>();
    public networks: INetwork[] = [Hardhat, BSC, Testnet];
    @Input() selectedNetwork: INetwork = BSC;

    public onSelectedNetworkChange(network: INetwork): void {
        this.selectedNetwork = network;
        this.selectedNetworkChange.emit(this.selectedNetwork);
        this.connectService.setNetwork(network);
        //console.log(`Selected token is ${this.selectedToken.name}`);
    }
    constructor(
        public smartContractService: SmartContractService,
        public connectService: ConnectService,
        public userAssetsComponent: UserAssetsComponent
    ) {}

    ngOnInit() {
        //this.tokenContracts = [Apple, Potato, LSR];
    }
}
