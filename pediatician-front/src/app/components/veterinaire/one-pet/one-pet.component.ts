import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VisitVeterinaireFormComponent } from '../modal/visit-veterinaire-form/visit-veterinaire-form.component';
import { ActivatedRoute } from '@angular/router';
import { VisitVeterinaireService } from '../../../services/visit-veterinaire.service';
import { PriseVaccineFormComponent } from '../modal/prise-vaccine-form/prise-vaccine-form.component';

@Component({
  selector: 'app-one-pet',
  standalone: true,
  imports: [],
  templateUrl: './one-pet.component.html',
  styleUrl: './one-pet.component.css',
})
export class OnePetComponent {
  readonly dialog = inject(MatDialog);
  readonly visitService: VisitVeterinaireService = inject(
    VisitVeterinaireService
  );
  visitId!: number;
  visit!: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.visitId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.visitService.getVisitById(this.visitId).subscribe({
      next: (visit) => {
        console.log('Visite complète récupérée:', visit);
        this.visit = visit;
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

  openDialogUpdateVisit() {
    this.dialog.open(VisitVeterinaireFormComponent, {
      width: '500px',
      height: '700px',
      data: {
        message: 'update',
        visit: this.visit,
      },
    });
  }

  openDialogPrise() {
    this.dialog.open(PriseVaccineFormComponent, {
      width: '500px',
      height: '700px',
      data: {
        message: 'done',
        visit: this.visit,
      },
    });
  }


}
