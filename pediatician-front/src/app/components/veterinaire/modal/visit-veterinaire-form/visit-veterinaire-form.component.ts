import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VisitVeterinaire } from '../../../../models/visit-veterinaire';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-visit-veterinaire-form',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, ReactiveFormsModule, NgClass],
  templateUrl: './visit-veterinaire-form.component.html',
  styleUrl: './visit-veterinaire-form.component.css',
})
export class VisitVeterinaireFormComponent {
  visitForm!: FormGroup;
  veterinaireId: number = 2; //TODO :change it with connected user
  constructor(
    public dialogRef: MatDialogRef<VisitVeterinaireFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: 'add' | 'edit'; visit?: VisitVeterinaire },
    private formBuilder: FormBuilder
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
    if (this.visitForm.valid) {
      this.dialogRef.close(this.visitForm.value); // retourne les données au composant parent
    }
  }

  close(): void {
    this.dialogRef.close(); // ferme sans rien envoyer
  }
}
