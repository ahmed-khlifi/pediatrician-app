import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Apollo, gql } from 'apollo-angular';
import { NgClass, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VisitVeterinaire } from '../../../../models/visit-veterinaire';

const GET_VACCINES = gql`
  query {
    vaccineList {
      id,
      name
    }
  }
`;

const CREATE_PRISE = gql`
  mutation($date: String!, $visitId: ID!, $vaccineId: ID!, $notes: String) {
    createPrise(date: $date, visitId: $visitId, vaccineId: $vaccineId, notes: $notes) {
      id
    }
  }
`;

@Component({
  selector: 'app-prise-vaccine-form',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './prise-vaccine-form.component.html',
})
export class PriseVaccineFormComponent implements OnInit {
  priseForm!: FormGroup;
  vaccines: { id: string, name: string }[] = [];
  visitId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo,
    public dialogRef: MatDialogRef<PriseVaccineFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: 'add', visit?: VisitVeterinaire }
  ) { }

  ngOnInit(): void {
    this.visitId = Number(this.route.snapshot.paramMap.get('id'));

    this.priseForm = this.fb.group({
      notes: ['', Validators.required],
      vaccineId: [null, Validators.required],
    });

    this.loadVaccines();
  }

  loadVaccines(): void {
    this.apollo.watchQuery<{ vaccineList: { id: string, name: string }[] }>({
      query: GET_VACCINES,
    }).valueChanges.subscribe(({ data }) => {
      this.vaccines = data.vaccineList;
    });
  }

  onSubmit(): void {
    if (this.priseForm.invalid) return;

    const formData = this.priseForm.value;
    console.log("-------------------------------------");
    console.log(formData);
    console.log("-------------------------------------");


    this.apollo.mutate({
      mutation: CREATE_PRISE,
      variables: {
        date: new Date(),
        visitId: this.data?.visit?.['id'],
        vaccineId: formData.vaccineId,
        notes: formData.notes,
      },
    }).subscribe({
      next: (result) => this.dialogRef.close(result),
      error: (err) => console.error('Erreur de mutation:', err),
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
