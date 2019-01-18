import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferViewComponent } from './offer-view/offer-view.component';
import { OffersComponent } from './offers/offers.component';
import { OffersCreatorComponent } from './offers-creator/offers-creator.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
    {path: '', redirectTo: '/offers', pathMatch: 'full'},
    { path: 'offers', component: OffersComponent },
    { path: 'offer-view/:id', component: OfferViewComponent },
    { path: 'offer-creator', component: OffersCreatorComponent },
    { path: 'admin-panel',  component: AdminPanelComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
