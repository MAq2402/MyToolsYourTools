import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferViewComponent } from './offer-view/offer-view.component';
import { OffersComponent } from './offers/offers.component';
import { OffersCreatorComponent } from './offers-creator/offers-creator.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', component: OffersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'offer-view/:id', component: OfferViewComponent, canActivate: [AuthGuard] },
    { path: 'offer-creator', component: OffersCreatorComponent, canActivate: [AuthGuard] },
    { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard] },
    { path: 'user-profile/:userId', component: UserProfileComponent, canActivate: [AuthGuard]},
    { path: '**',  component: OffersComponent, redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
