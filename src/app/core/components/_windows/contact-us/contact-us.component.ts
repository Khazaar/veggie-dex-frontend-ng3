import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "vd-contact-us",
    templateUrl: "./contact-us.component.html",
    styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
    ngOnInit() {
        this.dialogRef.updatePosition({ top: `6%`, right: `9%` });
        this.dialogRef.updateSize("fit-content", "fit-content");
    }

    constructor(public dialogRef: MatDialogRef<ContactUsComponent>) {}
}
