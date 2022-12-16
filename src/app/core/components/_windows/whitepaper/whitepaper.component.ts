import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "vd-whitepaper",
    templateUrl: "./whitepaper.component.html",
    styleUrls: ["./whitepaper.component.scss"],
})
export class WhitepaperComponent implements OnInit {
    ngOnInit() {
        this.dialogRef.updatePosition({ top: `6%`, right: `9%` });
        this.dialogRef.updateSize("fit-content", "fit-content");
    }

    constructor(public dialogRef: MatDialogRef<WhitepaperComponent>) {}
}
