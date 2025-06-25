import { Component } from '@angular/core';
import { PetsComponent } from '../../veterinaire/pets/pets.component';

@Component({
  selector: 'app-home-vet',
  standalone: true,
  imports: [PetsComponent],
  templateUrl: './home-vet.component.html',
  styleUrl: './home-vet.component.css',
})
export class HomeVetComponent {}
