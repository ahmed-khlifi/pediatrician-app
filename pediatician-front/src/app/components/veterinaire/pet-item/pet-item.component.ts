import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { PetService } from '../../../services/pet.service';
import { VisitVeterinaireService } from '../../../services/visit-veterinaire.service';
import { VisitVeterinaireFormComponent } from '../modal/visit-veterinaire-form/visit-veterinaire-form.component';

@Component({
  selector: 'app-pet-item',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, ReactiveFormsModule],
  templateUrl: './pet-item.component.html',
  styleUrl: './pet-item.component.css',
})
export class PetItemComponent {
  petForm: FormGroup;
  private petService = inject(PetService);
  private authService = inject(AuthService);
  private visiteService = inject(VisitVeterinaireService);

  user = this.authService.getCurrentUser();
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VisitVeterinaireFormComponent>
  ) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      race: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      petImage: [''],
    });
  }

  onSubmit() {
    if (this.petForm.valid) {
      const newPet: any = {
        ...this.petForm.value,
        visits: [],
      };

      console.log('Creating pet:', newPet);
      // TODO: backend
      this.petService.createPet(newPet).subscribe({
        next: (createdPet) => {
          console.log('Pet created successfully:', createdPet);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error creating pet:', error);
        },
      });
    }
  }

  private createEmptyVisit(): any {
    return {
      date: new Date().toISOString(),
      description: '',
      ownerId: undefined,
      veterinaireId: this.user.id,
      petId: undefined,
    };
  }
}
