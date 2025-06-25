import { Routes } from '@angular/router';
import { HomeComponent } from './components/owner/home/home.component';
import { HomeVetComponent } from './components/veterinaire/home-vet/home-vet.component';

export const routes: Routes = [
  {
    path: 'home/owner/:name',
    component: HomeComponent,
  },
  {
    path: 'home/veterinaire/:name',
    component: HomeVetComponent,
  },
];
