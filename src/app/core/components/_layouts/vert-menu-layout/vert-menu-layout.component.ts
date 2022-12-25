import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ContactUsComponent } from "../../_windows/contact-us/contact-us.component";
import { WhitepaperComponent } from "../../_windows/whitepaper/whitepaper.component";

@Component({
    selector: "vd-vert-menu-layout",
    templateUrl: "./vert-menu-layout.component.html",
    styleUrls: ["./vert-menu-layout.component.scss"],
})
export class VertMenuLayoutComponent {
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
