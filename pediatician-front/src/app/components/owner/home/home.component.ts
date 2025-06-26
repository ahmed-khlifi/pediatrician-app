import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pet } from '../../../models/pet';
import { AuthService } from '../../../services/auth.service';
import { VisitVeterinaireService } from '../../../services/visit-veterinaire.service';
import { CredentialsComponent } from '../credentials/credentials.component';
import { ShowRecordComponent } from '../modal/show-record/show-record.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CredentialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  groupedVisits: WritableSignal<Map<Pet, any[]>> = signal(
    new Map<Pet, any[]>()
  );

  visitService: VisitVeterinaireService = inject(VisitVeterinaireService);
  authService: AuthService = inject(AuthService);
  userId: number = this.authService.getCurrentUser().id; //owner
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
}/*************  ✨ Windsurf Command ⭐  *************/
/*******  9f5ccb5d-3fbb-4402-a885-e38ee4e35459  *******/  /**

   * Go to the next visit in the list, up to a maximum of max-1.

   * If the current index is already at the maximum, do nothing.

   * @param max the maximum index to go to

   */
