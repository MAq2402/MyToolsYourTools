import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

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
import { OfferCreatorComponent } from './offer-creator/offer-creator.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateGroupComponent } from './admin-panel/create-group/create-group.component';
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MyOffersComponent } from './admin-panel/my-offers/my-offers.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LeaveFeedbackComponent } from './offer-view/leave-feedback/leave-feedback.component';



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
    OfferCreatorComponent,
    ToolDetailsComponent,
    RegisterComponent,
    GroupsComponent,
    OfferViewComponent,
    OfferCreatorComponent,
    LoginComponent,
    CreateGroupComponent,
    AlertComponent,
    MyOffersComponent,
    PaginationComponent,
    LeaveFeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbAlertModule
  ],
  providers: [OfferService, UserService, GroupService, RentService, NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
