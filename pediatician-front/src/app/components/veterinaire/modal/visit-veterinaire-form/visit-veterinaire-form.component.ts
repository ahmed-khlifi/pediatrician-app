import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-visit-veterinaire-form',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './visit-veterinaire-form.component.html',
  styleUrl: './visit-veterinaire-form.component.css',
})
export class VisitVeterinaireFormComponent {
  constructor(
    public dialogRef: MatDialogRef<VisitVeterinaireFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
