import { Component, inject, Inject } from '@angular/core';
import { VisitVeterinaireService } from '../../../../services/visit-veterinaire.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-record',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, DatePipe],
  templateUrl: './show-record.component.html',
  styleUrl: './show-record.component.css',
})
export class ShowRecordComponent {
  private visitService: VisitVeterinaireService = inject(
    VisitVeterinaireService
  );
  visits: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<ShowRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.visitService.getVisitsByPet(this.data.visit.pet.id).subscribe({
      next: (vs) => {
        this.visits = vs;
      },
    });
  }
  public close() {
    this.dialogRef.close();
  }
}
