import { Router_mod } from "./../../smart-contracts/smart-contract-data";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConnectService } from "../../services/connect.service";
import { SmartContractService } from "../../services/smart-contract.service";
import { BaseCard } from "../base.card";

@Component({
    selector: "vd-owner-panel",
    templateUrl: "./owner-panel.component.html",
    styleUrls: ["./owner-panel.component.scss"],
})
export class OwnerPanelComponent extends BaseCard {
    // override async ngOnInit() {
    //     try {
    //         this.refresh();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    protected async refresh() {
        this.admins = await this.connectService.getRouterAdmins();
        if (this.admins.length > 0) {
            this.adminToRevoke = this.admins[this.admins.length - 1];
        }
        console.log("Admins are: ", this.admins);
    }
    constructor(
        smartContractService: SmartContractService,
        connectService: ConnectService
    ) {
        super(connectService, smartContractService);
    }
    public admins: string[] = [];
    @Input() adminToRevoke: string = "";
    @Input() adminRoleAddress: string = "";
    @Output() adminRoleGrantChange: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() adminToRevokeChange: EventEmitter<string> =
        new EventEmitter<string>();
    public onAdminRoleGrantChange(): void {
        this.adminRoleGrantChange.emit(this.adminRoleAddress);
    }
    public onAdminToRevokeChange(adminToRevoke: string): void {
        this.adminToRevoke = adminToRevoke;
        this.adminToRevokeChange.emit(this.adminToRevoke);
    }
    public async clickAddAdminAddress() {
        console.log(`Going to set admin address`);
        try {
            await this.smartContractService.addAdminAddress(
                this.adminRoleAddress
            );
        } catch (error) {
            console.log(error);
        }
    }
    public async clickRevokeAdminAddress() {
        console.log(`Going to revore admin address`);
        try {
            await this.smartContractService.revokeAdminAddress(
                this.adminToRevoke
            );
            this.refresh();
        } catch (error) {
            console.log(error);
        }
    }
}
