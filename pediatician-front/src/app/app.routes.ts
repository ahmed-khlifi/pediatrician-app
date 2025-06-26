import { Routes } from '@angular/router';
import { InscriptionComponent } from './components/auth/inscription/inscription.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/owner/home/home.component';
import { HomeVetComponent } from './components/veterinaire/home-vet/home-vet.component';
import { OnePetComponent } from './components/veterinaire/one-pet/one-pet.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    component: InscriptionComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home/owner/:name',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home/veterinaire/:name',
    component: HomeVetComponent,
    canActivate: [authGuard],
  },
  {
    path: 'visit/:id',
    component: OnePetComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
