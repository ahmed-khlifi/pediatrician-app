import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { VisitVeterinaireService } from '../../../services/visit-veterinaire.service';
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
export class HomeComponent {
  visits: WritableSignal<any> = signal([]);
  visitService: VisitVeterinaireService = inject(VisitVeterinaireService);
  authService: AuthService = inject(AuthService);
  userId: number = this.authService.getCurrentUser().id; //owner
  ngOnInit(): void {
    this.visitService.getVisitsByUser(this.userId).subscribe({
      next: (data) => {
        this.visits.set(data);
        console.log(this.visits());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
