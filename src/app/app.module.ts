import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConnectWalletComponent } from "./core/components/connect-wallet/connect-wallet.component";

import { MintTokenComponent } from "./core/components/mint-token/mint-token.component";
import { UserAssetsComponent } from "./core/components/user-assets/user-assets.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { HeaderComponent } from "./core/components/header/header.component";
import { UserLayoutComponent } from "./core/components/user-layout/user-layout.component";
import { DexLayoutComponent } from "./core/components/dex-layout/dex-layout.component";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    declarations: [
        AppComponent,
        ConnectWalletComponent,
        MintTokenComponent,
        UserAssetsComponent,
        HeaderComponent,
        UserLayoutComponent,
        DexLayoutComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
