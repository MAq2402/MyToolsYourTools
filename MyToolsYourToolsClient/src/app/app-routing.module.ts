import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferViewComponent } from './offer-view/offer-view.component';
import { OffersComponent } from './offers/offers.component';
import { OfferCreatorComponent } from './offer-creator/offer-creator.component';

const routes: Routes = [
    { path: '', component: OffersComponent },
    { path: 'offer-view/:id', component: OfferViewComponent },
    { path: 'offer-creator', component: OfferCreatorComponent },
    { path: '**',  component: OffersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
