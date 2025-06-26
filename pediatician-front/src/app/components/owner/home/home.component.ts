import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Pet } from '../../../models/pet';
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
  groupedVisits: WritableSignal<Map<Pet, any[]>> = signal(new Map<Pet, any[]>);
  arr = Array.from(this.groupedVisits());
  selectedPet: WritableSignal<Pet | null> = signal(null);
  currentVisitIndex: WritableSignal<number> = signal(0);

  visitService: VisitVeterinaireService = inject(VisitVeterinaireService);
  userId: number = 1; //owner
  ngOnInit(): void {
    this.visitService.getVisitsByUser(this.userId).subscribe({
      next: (data) => {
        const grouped = new Map<Pet, any[]>();

        for (const visit of data) {
          const pet = visit.pet;
          if (pet != undefined) {
            if (!grouped.has(pet)) {
              grouped.set(pet, []);
            }
            grouped.get(pet)!.push(visit);
          }
        }
        this.groupedVisits.set(grouped);
        const firstPet = [...grouped.keys()][0];
        this.selectedPet.set(firstPet);
        console.log(this.groupedVisits());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  prevVisit() {
    const index = this.currentVisitIndex();
    if (index > 0) this.currentVisitIndex.set(index - 1);
  }

  nextVisit(max: number) {
    const index = this.currentVisitIndex();
    if (index < max - 1) this.currentVisitIndex.set(index + 1);
  }

  selectPet(pet: Pet) {
    this.selectedPet.set(pet);
    this.currentVisitIndex.set(0); // Reset to first visit
  }


}
