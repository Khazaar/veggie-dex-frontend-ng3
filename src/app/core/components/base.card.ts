import { Directive, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ConnectService } from "../services/connect.service";
import { SmartContractService } from "../services/smart-contract.service";
@Directive()
export abstract class BaseCard implements OnInit, OnDestroy {
    protected subscriptions: Subscription[] = [];

    constructor(
        protected connectService: ConnectService,
        protected smartContractService: SmartContractService
    ) {}
    ngOnInit(): void {
        this.subscriptions.push(
            this.smartContractService.TokenMinted$().subscribe(() => {
                this.refresh();
            })
        );
        this.subscriptions.push(
            this.smartContractService.LiquidityAdded$().subscribe(() => {
                this.refresh();
            })
        );

        this.subscriptions.push(
            this.smartContractService.Swapped$().subscribe(() => {
                this.refresh();
            })
        );

        this.subscriptions.push(
            this.connectService.walletConnected$().subscribe(() => {
                this.refresh();
            })
        );

        this.subscriptions.push(
            this.smartContractService.MintRevertedPeriod$().subscribe(() => {
                console.log(``);
            })
        );
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    protected abstract refresh(): any;
}
