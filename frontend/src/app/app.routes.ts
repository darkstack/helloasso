import {DonationComponent} from "./donation/donation.component";
import {TopdonorsComponent} from "./topdonors/topdonors.component";
import { Routes } from '@angular/router';
import {TotalComponent} from "./total/total.component";

export const routes: Routes = [
    { path: 'topdonors' , component: TopdonorsComponent },
    { path: 'donations' , component: DonationComponent },
    { path: 'total' , component: TotalComponent },
];
