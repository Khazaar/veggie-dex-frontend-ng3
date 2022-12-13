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
import { HeaderComponent } from "./core/components/_layouts/header-layout/header.component";
import { UserLayoutComponent } from "./core/components/_layouts/user-layout/user-layout.component";
import { DexLayoutComponent } from "./core/components/_layouts/dex-layout/dex-layout.component";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { AlertModule } from "@coreui/angular";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { AddLiquidityComponent } from "./core/components/add-liquidity/add-liquidity.component";
import { SwapComponent } from "./core/components/swap/swap.component";
import { FooterLayoutComponent } from "./core/components/_layouts/footer-layout/footer-layout.component";

@NgModule({
    declarations: [
        AppComponent,
        ConnectWalletComponent,
        MintTokenComponent,
        UserAssetsComponent,
        HeaderComponent,
        UserLayoutComponent,
        DexLayoutComponent,
        AddLiquidityComponent,
        SwapComponent,
        FooterLayoutComponent,
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
        MatTableModule,
        AlertModule,
        FormsModule,
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
