import { Component, inject } from '@angular/core';
import { VisitVeterinaire } from '../../../models/visit-veterinaire';
import { AuthService } from '../../../services/auth.service';
import { VisitVeterinaireService } from '../../../services/visit-veterinaire.service';
import { PetsComponent } from '../../veterinaire/pets/pets.component';

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
  authService: AuthService = inject(AuthService);
  userId: number = this.authService.getCurrentUser().id; //veterinaire
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
