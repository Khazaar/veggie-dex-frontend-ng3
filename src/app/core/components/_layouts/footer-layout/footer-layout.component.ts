import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ContactUsComponent } from "../../_windows/contact-us/contact-us.component";
import { WhitepaperComponent } from "../../_windows/whitepaper/whitepaper.component";

@Component({
    selector: "vd-footer-layout",
    templateUrl: "./footer-layout.component.html",
    styleUrls: ["./footer-layout.component.scss"],
})
export class FooterLayoutComponent implements OnInit {
    ngOnInit() {}
    constructor(public dialog: MatDialog) {}
    public onClickWhitepaper() {
        const dialogRef = this.dialog.open(WhitepaperComponent, {});
        setTimeout(() => {
            dialogRef.close();
        }, 1000000);
    }
    public onClickContact() {
        const dialogRef = this.dialog.open(ContactUsComponent, {});
        setTimeout(() => {
            dialogRef.close();
        }, 1000000);
    }
}
