import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

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
import { OfferViewComponent } from './offer-view/offer-view.component';
import { AppRoutingModule } from './app-routing.module';
import { OfferService } from './services/offer.service';
import { GroupService } from './services/group.service';
import { UserService } from './services/user.service';
import { RentService } from './services/rent.service';
import { NotificationService } from './services/notification.service';
import { GroupsComponent } from './admin-panel/groups/groups.component';


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
    OfferViewComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [OfferService, UserService, GroupService, RentService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
