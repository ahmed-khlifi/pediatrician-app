import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VisitVeterinaireFormComponent } from '../modal/visit-veterinaire-form/visit-veterinaire-form.component';

@Component({
  selector: 'app-one-pet',
  standalone: true,
  imports: [],
  templateUrl: './one-pet.component.html',
  styleUrl: './one-pet.component.css',
})
export class OnePetComponent {
  readonly dialog = inject(MatDialog);

  openDialogAddVisit() {
    this.dialog.open(VisitVeterinaireFormComponent, {
      width: '500px',
      height: '700px',
    });
  }
}
