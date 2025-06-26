import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CredentialsComponent } from '../credentials/credentials.component';
import { PetsComponent } from '../pets/pets.component';
import { VisitsComponent } from '../visits/visits.component';
import { VisitVeterinaireService } from '../../../services/visit-veterinaire.service';
import { MatDialog } from '@angular/material/dialog';
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
  visits: WritableSignal<any[]> = signal([]);
  visitService: VisitVeterinaireService = inject(VisitVeterinaireService);
  userId: number = 1; //owner
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

  public showRecord(id: number) {
    const visit = this.visits().find((visit) => visit.id == id);
    this.dialog.open(ShowRecordComponent, {
      width: '600px',
      height: '750px',
      data: {
        visit,
      },
    });
  }
}
