import { Component, inject } from '@angular/core';
import { PetsComponent } from '../../veterinaire/pets/pets.component';
import { VisitVeterinaire } from '../../../models/visit-veterinaire';
import { VisitVeterinaireService } from '../../../services/visit-veterinaire.service';

@Component({
  selector: 'app-home-vet',
  standalone: true,
  imports: [PetsComponent],
  templateUrl: './home-vet.component.html',
  styleUrl: './home-vet.component.css',
})
export class HomeVetComponent {
  visits: VisitVeterinaire[] = [];
  visitService: VisitVeterinaireService = inject(VisitVeterinaireService);
  userId: number = 2; //veterinaire
  ngOnInit(): void {
    this.visitService.getVisitsByUser(this.userId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
