import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pet } from '../../../models/pet';
import { AuthService } from '../../../services/auth.service';
import { VisitVeterinaireService } from '../../../services/visit-veterinaire.service';
import { ShowRecordComponent } from '../../owner/modal/show-record/show-record.component';
import { VisitVeterinaireFormComponent } from '../modal/visit-veterinaire-form/visit-veterinaire-form.component';
import { PetItemComponent } from '../pet-item/pet-item.component';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css',
})
export class PetsComponent {
  readonly dialog = inject(MatDialog);
  groupedVisits: WritableSignal<Map<Pet, any[]>> = signal(
    new Map<Pet, any[]>()
  );

  visitService: VisitVeterinaireService = inject(VisitVeterinaireService);
  authService: AuthService = inject(AuthService);
  userId: number = this.authService.getCurrentUser().id;
  ngOnInit(): void {
    console.log(this.userId);
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public showRecord(id: number) {
    this.dialog.open(ShowRecordComponent, {
      width: '600px',
      height: '750px',
      data: {
        id,
      },
    });
  }
  openDialogAddPet() {
    this.dialog.open(PetItemComponent, {
      width: '500px',
      height: '700px',
      data: {
        message: 'add',
      },
    });
  }
  openDialogAddVisit() {
    this.dialog.open(VisitVeterinaireFormComponent, {
      width: '500px',
      height: '700px',
      data: {
        message: 'add',
      },
    });
  }
}
