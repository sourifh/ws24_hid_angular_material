import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AddDataComponent } from './dashboard/add-data/add-data.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add_data', component: AddDataComponent },
    { path: 'about', component: AboutPageComponent }
];
