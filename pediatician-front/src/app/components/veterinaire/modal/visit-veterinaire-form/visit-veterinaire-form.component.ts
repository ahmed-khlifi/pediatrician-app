import { NgClass } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { VisitVeterinaire } from '../../../../models/visit-veterinaire';
import { AuthService } from '../../../../services/auth.service';
import { VisitVeterinaireService } from '../../../../services/visit-veterinaire.service';

@Component({
  selector: 'app-visit-veterinaire-form',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, ReactiveFormsModule, NgClass],
  templateUrl: './visit-veterinaire-form.component.html',
  styleUrl: './visit-veterinaire-form.component.css',
})
export class VisitVeterinaireFormComponent {
  visitForm!: FormGroup;
  private authService = inject(AuthService);
  veterinaireId: number = this.authService.getCurrentUser().id; //TODO :change it with connected user
  constructor(
    public dialogRef: MatDialogRef<VisitVeterinaireFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: 'add' | 'edit'; visit?: VisitVeterinaire },
    private formBuilder: FormBuilder,
    private visitService: VisitVeterinaireService
  ) {}

  ngOnInit(): void {
    this.visitForm = this.formBuilder.group({
      date: [this.data.visit?.date ?? '', Validators.required],
      description: [this.data.visit?.description ?? ''],
      petId: [this.data.visit?.pet?.id ?? null, Validators.required],
      ownerId: [this.data.visit?.owner?.id ?? null, Validators.required],
      veterinaireId: [this.veterinaireId, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.visitForm.invalid) return;

    const formData = this.visitForm.value;

    if (this.data.message === 'add') {
      this.visitService.createVisit(formData).subscribe({
        next: (createdVisit) => this.dialogRef.close(createdVisit),
        error: (err) => console.error('Erreur lors de la création:', err),
      });
    } else if (this.data.message === 'edit' && this.data.visit) {
      console.log(this.data.visit);
      const updatedData = {
        id: this.data.visit.id,
        ...formData,
      };
      this.visitService.updateVisit(updatedData).subscribe({
        next: (updatedVisit) => this.dialogRef.close(updatedVisit),
        error: (err) => console.error('Erreur lors de la mise à jour:', err),
      });
    }
  }

  close(): void {
    this.dialogRef.close(); // ferme sans rien envoyer
  }
}
