import { Routes } from '@angular/router';
import { HomeComponent } from './home.component/home.component';
import { DetailsComponent } from './details.component/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home page' },
  { path: 'details/:id', component: DetailsComponent, title: 'House details' }
];
