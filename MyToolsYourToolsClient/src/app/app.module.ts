import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';

import { OffersBarComponent } from './offers-bar/offers-bar.component';
import { OffersComponent } from './offers/offers.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DataComponent } from './user-profile/data/data.component';
import { OpinionsComponent } from './user-profile/opinions/opinions.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NotificationsComponent } from './admin-panel/notifications/notifications.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OffersCreatorComponent } from './offers-creator/offers-creator.component';
import { ToolDetailsComponent } from './tool-details/tool-details.component';
import { RegisterComponent } from './register/register.component';
import { OfferFormComponent } from './offers/offer-form/offer-form.component';
import { OffersModalComponent } from './offers/offers-modal/offers-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OffersBarComponent,
    OffersComponent,
    UserProfileComponent,
    DataComponent,
    OpinionsComponent,
    AdminPanelComponent,
    NotificationsComponent,
    OffersListComponent,
    OffersCreatorComponent,
    ToolDetailsComponent,
    RegisterComponent,
    OfferFormComponent,
    OffersModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
