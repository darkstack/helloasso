import {DonationComponent} from "./donation/donation.component";
import {TopdonorsComponent} from "./topdonors/topdonors.component";
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'topdonors' , component: TopdonorsComponent },
    { path: 'donation' , component: DonationComponent }

];
