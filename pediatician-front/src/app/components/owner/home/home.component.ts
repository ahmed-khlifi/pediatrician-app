import { Component } from '@angular/core';
import { CredentialsComponent } from '../credentials/credentials.component';
import { PetsComponent } from '../pets/pets.component';
import { VisitsComponent } from '../visits/visits.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CredentialsComponent, PetsComponent, VisitsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
