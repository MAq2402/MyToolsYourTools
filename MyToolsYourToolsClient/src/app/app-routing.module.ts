import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferViewComponent } from './offer-view/offer-view.component';
import { OffersComponent } from './offers/offers.component';
import { OffersCreatorComponent } from './offers-creator/offers-creator.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', component: OffersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'offer-view/:id', component: OfferViewComponent },
    { path: 'offer-creator', component: OffersCreatorComponent },
    { path: 'user-profile/:id/:userId', component: UserProfileComponent,
        children: [{
        path: 'offer-view/:id', redirectTo: '/offer-view/:id', pathMatch: 'full'
        }] },
    { path: '**',  component: OffersComponent }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
